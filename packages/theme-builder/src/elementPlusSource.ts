import { execFile } from 'node:child_process'
import { createRequire } from 'node:module'
import { existsSync, readFileSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { SASS_VARIABLES, type SassVariableCategory, type SassVariableDefinition } from './tokenCatalog.js'

export interface ElementPlusThemeSource {
  requestedVersion: string
  version: string
  packageRoot: string
  nodeModulesRoot: string
  varScssFile: string
  indexScssFile: string
  darkCssVarsFile?: string
  varScssImport: string
  indexScssImport: string
  availableVariables: SassVariableDefinition[]
}

export interface ResolveElementPlusOptions {
  version?: string
  workspaceRoot: string
  cacheRoot?: string
}

const require = createRequire(import.meta.url)
const execFileAsync = promisify(execFile)
const knownCategoryByName = new Map<string, SassVariableCategory>(
  SASS_VARIABLES.map((variable) => [variable.name, variable.category]),
)

export async function resolveElementPlusThemeSource(
  options: ResolveElementPlusOptions,
): Promise<ElementPlusThemeSource> {
  const requestedVersion = normalizeVersionSpec(options.version)
  const installed = resolveInstalledElementPlusThemeSource(requestedVersion)

  if (!requestedVersion || requestedVersion === 'installed' || requestedVersion === installed.version) {
    return installed
  }

  if (requestedVersion === 'latest') {
    return installed
  }

  const cacheRoot = options.cacheRoot ?? path.join(options.workspaceRoot, 'generated', '.element-plus-versions')
  const packageRoot = await ensureCachedElementPlusPackage(cacheRoot, requestedVersion)
  return resolvePackageRootThemeSource(packageRoot, requestedVersion)
}

export function resolveInstalledElementPlusThemeSource(requestedVersion = 'installed'): ElementPlusThemeSource {
  const packageJsonPath = require.resolve('element-plus/package.json')
  return resolvePackageRootThemeSource(path.dirname(packageJsonPath), requestedVersion)
}

async function ensureCachedElementPlusPackage(cacheRoot: string, versionSpec: string): Promise<string> {
  validateVersionSpec(versionSpec)

  const cacheDir = path.join(cacheRoot, safeCacheName(versionSpec))
  const packageJsonPath = path.join(cacheDir, 'package.json')
  const elementPlusPackageJson = path.join(cacheDir, 'node_modules', 'element-plus', 'package.json')

  await mkdir(cacheDir, { recursive: true })
  if (!existsSync(packageJsonPath)) {
    await writeFile(
      packageJsonPath,
      `${JSON.stringify(
        {
          name: `element-plus-theme-studio-cache-${safeCacheName(versionSpec)}`,
          private: true,
          type: 'module',
        },
        null,
        2,
      )}\n`,
      'utf8',
    )
  }

  if (!existsSync(elementPlusPackageJson)) {
    const command = process.env.npm_execpath && existsSync(process.env.npm_execpath) ? process.execPath : process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
    const commandArgs =
      process.env.npm_execpath && existsSync(process.env.npm_execpath)
        ? [process.env.npm_execpath]
        : []
    await execFileAsync(
      command,
      [
        ...commandArgs,
        'add',
        `element-plus@${versionSpec}`,
        'vue@latest',
        'typescript@latest',
        '--dir',
        cacheDir,
        '--config.shared-workspace-lockfile=false',
      ],
      {
        cwd: cacheDir,
        windowsHide: true,
        timeout: 120000,
      },
    )
  }

  return path.dirname(elementPlusPackageJson)
}

function resolvePackageRootThemeSource(packageRoot: string, requestedVersion: string): ElementPlusThemeSource {
  const packageJsonPath = path.join(packageRoot, 'package.json')
  const packageJson = require(packageJsonPath) as { version: string }
  const candidates = [
    {
      varScss: 'theme-chalk/src/common/var.scss',
      indexScss: 'theme-chalk/src/index.scss',
      darkCssVars: 'theme-chalk/dark/css-vars.css',
    },
    {
      varScss: 'packages/theme-chalk/src/common/var.scss',
      indexScss: 'packages/theme-chalk/src/index.scss',
      darkCssVars: 'packages/theme-chalk/dark/css-vars.css',
    },
  ]

  const matched = candidates.find((candidate) =>
    [candidate.varScss, candidate.indexScss].every((relativePath) =>
      existsSync(path.join(packageRoot, relativePath)),
    ),
  )

  if (!matched) {
    throw new Error(
      `Cannot find Element Plus theme-chalk SCSS files under ${packageRoot}. Try a newer Element Plus 2.x version.`,
    )
  }

  const darkCssVarsFile = path.join(packageRoot, matched.darkCssVars)

  return {
    requestedVersion,
    version: packageJson.version,
    packageRoot,
    nodeModulesRoot: path.dirname(packageRoot),
    varScssFile: path.join(packageRoot, matched.varScss),
    indexScssFile: path.join(packageRoot, matched.indexScss),
    darkCssVarsFile: existsSync(darkCssVarsFile) ? darkCssVarsFile : undefined,
    varScssImport: `element-plus/${toPosix(matched.varScss)}`,
    indexScssImport: `element-plus/${toPosix(matched.indexScss)}`,
    availableVariables: parseThemeVariableDefinitions(path.join(packageRoot, matched.varScss)),
  }
}

function parseThemeVariableDefinitions(varScssFile: string): SassVariableDefinition[] {
  const content = readFileSyncUtf8(varScssFile)
  const lines = content.split(/\r?\n/)
  const names: string[] = []

  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^\$([a-z0-9-]+):/)
    if (!match) continue

    let block = lines[index]
    let cursor = index
    while (!block.includes(';') && cursor < lines.length - 1) {
      cursor += 1
      block += `\n${lines[cursor]}`
    }

    if (block.includes('!default')) {
      names.push(match[1])
    }
  }

  return [...new Set(names)].map((name) => ({
    name,
    category: knownCategoryByName.get(name) ?? guessCategory(name),
  }))
}

function readFileSyncUtf8(filePath: string): string {
  return readFileSync(filePath, 'utf8')
}

function normalizeVersionSpec(version?: string): string {
  const normalized = version?.trim()
  return normalized || 'installed'
}

function validateVersionSpec(versionSpec: string): void {
  if (!/^[a-zA-Z0-9._~^<>=+\-]+$/.test(versionSpec)) {
    throw new Error(`Unsupported Element Plus version spec: ${versionSpec}`)
  }
}

function safeCacheName(versionSpec: string): string {
  return versionSpec.replace(/[^a-zA-Z0-9._-]/g, '_')
}

function guessCategory(name: string): SassVariableCategory {
  if (/^(color|text|border|fill|bg|font|z-index|disabled|overlay|mask|breakpoint|sm|md|lg|xl)/.test(name)) {
    return 'core'
  }
  if (/^(button)/.test(name)) return 'actions'
  if (/^(input|select|radio|checkbox|switch|form|cascader|mention|segmented)/.test(name)) return 'form'
  if (/^(message|notification|dialog|drawer|popup|popover|popper|alert|loading|result|tour|backtop)/.test(name)) {
    return 'feedback'
  }
  if (/^(menu|tabs|dropdown|link|anchor)/.test(name)) return 'navigation'
  if (/^(header|main|footer|transition|scrollbar|slider|date)/.test(name)) return 'layout'
  return 'data'
}

function toPosix(value: string): string {
  return value.replaceAll(path.sep, '/')
}
