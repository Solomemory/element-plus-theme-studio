import { ZipArchive, type ArchiverError } from 'archiver'
import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

export async function zipTheme(packageDir: string, zipPath: string): Promise<void> {
  await mkdir(path.dirname(zipPath), { recursive: true })

  await new Promise<void>((resolve, reject) => {
    const output = createWriteStream(zipPath)
    const archive = new ZipArchive({ zlib: { level: 9 } })

    output.on('close', () => resolve())
    output.on('error', reject)
    archive.on('warning', (error: ArchiverError) => {
      if (error.code === 'ENOENT') return
      reject(error)
    })
    archive.on('error', reject)

    archive.pipe(output)
    archive.directory(packageDir, false)
    void archive.finalize()
  })
}
