import { createReadStream } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, type Plugin } from 'vite'
import { buildTheme } from '../../packages/theme-builder/src/buildTheme.ts'
import { resolveElementPlusThemeSource } from '../../packages/theme-builder/src/elementPlusSource.ts'
import { ThemeValidationError } from '../../packages/theme-builder/src/tokens.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const workspaceRoot = path.resolve(__dirname, '../..')

function themeBuilderApi(): Plugin {
  return {
    name: 'theme-builder-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const requestUrl = req.url?.split('?')[0]
        if (requestUrl === '/api/element-plus/metadata') {
          try {
            const url = new URL(req.url ?? '', 'http://localhost')
            const source = await resolveElementPlusThemeSource({
              workspaceRoot,
              version: url.searchParams.get('version') ?? undefined,
            })
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(
              JSON.stringify({
                requestedVersion: source.requestedVersion,
                version: source.version,
                supportsDarkCssVars: Boolean(source.darkCssVarsFile),
                variableCount: source.availableVariables.length,
                variables: source.availableVariables,
              }),
            )
          } catch (error) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(
              JSON.stringify({
                message: error instanceof Error ? error.message : 'Failed to resolve Element Plus metadata.',
              }),
            )
          }
          return
        }

        if (requestUrl !== '/api/theme/build') {
          next()
          return
        }

        if (req.method !== 'POST') {
          next()
          return
        }

        try {
          const body = await readRequestBody(req)
          const tokens = JSON.parse(body)
          const result = await buildTheme(tokens, {
            workspaceRoot,
            outputRoot: path.join(workspaceRoot, 'generated'),
            zip: true,
          })

          if (!result.zipPath) {
            throw new Error('ZIP was not generated.')
          }

          const fileName = path.basename(result.zipPath)
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/zip')
          res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
          createReadStream(result.zipPath).pipe(res)
        } catch (error) {
          const status = error instanceof ThemeValidationError ? 400 : 500
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              message: error instanceof Error ? error.message : 'Theme generation failed.',
              issues: error instanceof ThemeValidationError ? error.issues : undefined,
            }),
          )
        }
      })
    },
  }
}

async function readRequestBody(req: NodeJS.ReadableStream): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString('utf8')
}

export default defineConfig({
  plugins: [vue(), themeBuilderApi()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    fs: {
      allow: [workspaceRoot],
    },
  },
})
