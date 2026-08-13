/**
 * Nén ảnh gốc từ /assets-raw sang webp nhiều kích thước trong /public/img.
 * Chạy 1 lần: node scripts/optimize-images.mjs
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const RAW = 'assets-raw'
const OUT = 'public/img'
const WIDTHS = [640, 1200]

async function run() {
  const groups = await readdir(RAW, { withFileTypes: true })
  const manifest = {}

  for (const g of groups) {
    if (!g.isDirectory()) continue
    const srcDir = join(RAW, g.name)
    const dstDir = join(OUT, g.name)
    await mkdir(dstDir, { recursive: true })

    for (const file of await readdir(srcDir)) {
      if (!/\.(jpe?g|png)$/i.test(file)) continue
      const { name } = parse(file)
      const input = sharp(join(srcDir, file)).rotate()
      const meta = await input.metadata()

      for (const w of WIDTHS) {
        if (meta.width && meta.width < w * 0.75 && w !== WIDTHS[0]) continue
        await input
          .clone()
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: 76, effort: 5 })
          .toFile(join(dstDir, `${name}-${w}.webp`))
      }

      manifest[`${g.name}/${name}`] = { w: meta.width, h: meta.height }
      console.log('✓', g.name, name, `${meta.width}×${meta.height}`)
    }
  }

  await writeFile(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
