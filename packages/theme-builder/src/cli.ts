import path from 'node:path'
import { buildTheme, findWorkspaceRoot, readTokensFile } from './buildTheme.js'
import { ThemeValidationError } from './tokens.js'

interface CliArgs {
  command: 'build' | 'zip'
  tokens: string
  elementPlusVersion?: string
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  const workspaceRoot = findWorkspaceRoot(process.cwd())
  const tokens = await readTokensFile(args.tokens, workspaceRoot)
  const result = await buildTheme(tokens, {
    workspaceRoot,
    outputRoot: path.join(workspaceRoot, 'generated'),
    zip: true,
    elementPlusVersion: args.elementPlusVersion,
  })

  console.log(`Element Plus: ${result.elementPlus.version}`)
  console.log(`Theme package: ${result.packageDir}`)
  if (result.zipPath) {
    console.log(`ZIP: ${result.zipPath}`)
  }
}

function parseArgs(argv: string[]): CliArgs {
  const command = argv[0] === 'zip' ? 'zip' : 'build'
  let tokens = 'examples/aura-blue.json'
  let elementPlusVersion: string | undefined

  for (let index = 1; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--tokens' || arg === '-t') {
      tokens = argv[index + 1] ?? tokens
      index += 1
    } else if (arg === '--element-plus-version' || arg === '--ep-version') {
      elementPlusVersion = argv[index + 1]
      index += 1
    }
  }

  return { command, tokens, elementPlusVersion }
}

main().catch((error: unknown) => {
  if (error instanceof ThemeValidationError) {
    console.error('Invalid theme tokens:')
    for (const issue of error.issues) {
      console.error(`- ${issue.path}: ${issue.message}`)
    }
    process.exit(1)
  }

  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
