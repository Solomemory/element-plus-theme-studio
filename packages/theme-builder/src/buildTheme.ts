import { existsSync } from 'node:fs'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'
import {
  resolveElementPlusThemeSource,
  type ElementPlusThemeSource,
} from './elementPlusSource.js'
import { generateCssOverrides, generateDarkCss, generateThemeScss } from './generateScss.js'
import { generateReadme } from './generateReadme.js'
import {
  assertValidThemeTokens,
  mergeThemeTokens,
  slugifyPackageName,
  type ThemeTokens,
} from './tokens.js'
import { zipTheme } from './zipTheme.js'

export interface BuildThemeOptions {
  outputRoot?: string
  workspaceRoot?: string
  zip?: boolean
  elementPlusVersion?: string
}

export interface BuildThemeResult {
  tokens: ThemeTokens
  packageDir: string
  distDir: string
  zipPath?: string
  elementPlus: ElementPlusThemeSource
}

export async function buildTheme(input: ThemeTokens | unknown, options: BuildThemeOptions = {}): Promise<BuildThemeResult> {
  const tokens = mergeThemeTokens(input)
  if (options.elementPlusVersion) {
    tokens.elementPlusVersion = options.elementPlusVersion
  }
  assertValidThemeTokens(tokens)

  const workspaceRoot = options.workspaceRoot ?? findWorkspaceRoot(process.cwd())
  const outputRoot = path.resolve(options.outputRoot ?? path.join(workspaceRoot, 'generated'))
  const packageSlug = slugifyPackageName(tokens.packageName)
  const packageDir = path.join(outputRoot, packageSlug)
  const distDir = path.join(packageDir, 'dist')
  const srcDir = path.join(packageDir, 'src')
  const zipPath = path.join(outputRoot, `${packageSlug}.zip`)

  ensureInside(outputRoot, packageDir)
  ensureInside(outputRoot, zipPath)

  const elementPlus = await resolveElementPlusThemeSource({
    workspaceRoot,
    version: tokens.elementPlusVersion,
  })
  const scss = generateThemeScss(tokens, {
    varScss: elementPlus.varScssImport,
    indexScss: elementPlus.indexScssImport,
  }, elementPlus.availableVariables.map((variable) => variable.name))

  await rm(packageDir, { recursive: true, force: true })
  await mkdir(distDir, { recursive: true })
  await mkdir(srcDir, { recursive: true })

  const srcIndexPath = path.join(srcDir, 'index.scss')
  await writeFile(srcIndexPath, scss, 'utf8')
  await writeFile(path.join(distDir, 'variables.scss'), scss, 'utf8')

  const compiled = sass.compile(srcIndexPath, {
    loadPaths: [elementPlus.nodeModulesRoot],
    quietDeps: true,
    style: 'expanded',
  })

  await writeFile(path.join(distDir, 'index.css'), `${compiled.css}${generateCssOverrides(tokens, 'light')}`, 'utf8')
  await writeFile(path.join(distDir, 'dark.css'), `${generateDarkCss(tokens)}${generateCssOverrides(tokens, 'dark')}`, 'utf8')
  await writeFile(path.join(distDir, 'tokens.json'), `${JSON.stringify(tokens, null, 2)}\n`, 'utf8')
  await writeFile(
    path.join(packageDir, 'README.md'),
    generateReadme(tokens, {
      elementPlusVersion: elementPlus.version,
      supportsDarkCssVars: Boolean(elementPlus.darkCssVarsFile),
    }),
    'utf8',
  )
  await writeFile(path.join(packageDir, 'package.json'), `${JSON.stringify(generatePackageJson(tokens, elementPlus.version), null, 2)}\n`, 'utf8')

  let createdZipPath: string | undefined
  if (options.zip ?? true) {
    await zipTheme(packageDir, zipPath)
    createdZipPath = zipPath
  }

  return {
    tokens,
    packageDir,
    distDir,
    zipPath: createdZipPath,
    elementPlus,
  }
}

export async function readTokensFile(tokensPath: string, workspaceRoot = findWorkspaceRoot(process.cwd())): Promise<ThemeTokens> {
  const resolved = resolveExistingPath(tokensPath, workspaceRoot)
  const raw = await readFile(resolved, 'utf8')
  return mergeThemeTokens(JSON.parse(raw))
}

export function findWorkspaceRoot(start: string): string {
  let current = path.resolve(start)
  while (true) {
    if (existsSync(path.join(current, 'pnpm-workspace.yaml'))) {
      return current
    }
    const parent = path.dirname(current)
    if (parent === current) {
      return path.resolve(start)
    }
    current = parent
  }
}

function generatePackageJson(tokens: ThemeTokens, elementPlusVersion: string): Record<string, unknown> {
  return {
    name: tokens.packageName,
    version: '0.1.0',
    description: `${tokens.name} theme for Element Plus`,
    type: 'module',
    main: './dist/index.css',
    style: './dist/index.css',
    files: ['dist', 'src', 'README.md'],
    exports: {
      '.': './dist/index.css',
      './dist/index.css': './dist/index.css',
      './dist/dark.css': './dist/dark.css',
      './dist/tokens.json': './dist/tokens.json',
      './dist/variables.scss': './dist/variables.scss',
      './src/index.scss': './src/index.scss',
      './package.json': './package.json',
    },
    peerDependencies: {
      'element-plus': `^${elementPlusVersion}`,
      vue: '^3.0.0',
    },
  }
}

function resolveExistingPath(inputPath: string, workspaceRoot: string): string {
  const fromCwd = path.resolve(process.cwd(), inputPath)
  if (existsSync(fromCwd)) return fromCwd
  const fromWorkspace = path.resolve(workspaceRoot, inputPath)
  if (existsSync(fromWorkspace)) return fromWorkspace
  throw new Error(`Token file not found: ${inputPath}`)
}

function ensureInside(root: string, target: string): void {
  const relative = path.relative(path.resolve(root), path.resolve(target))
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Refusing to write outside output root: ${target}`)
  }
}

export const themeBuilderDir = path.dirname(fileURLToPath(import.meta.url))
