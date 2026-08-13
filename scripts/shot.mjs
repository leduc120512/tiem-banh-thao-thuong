import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const OUT = process.env.SHOT_DIR || 'shots'
const URL = process.env.SHOT_URL || 'http://localhost:4173/'

const VIEWS = [
  { name: 'mobile', width: 390, height: 844, dsf: 2, mobile: true },
  { name: 'tablet', width: 834, height: 1112, dsf: 2, mobile: true },
  { name: 'desktop', width: 1440, height: 900, dsf: 1, mobile: false },
]

const STOPS = [
  ['01-hero', 0],
  ['02-signature', 1],
  ['03-cat', 2],
  ['04-studio', 3],
  ['05-story', 4.4],
  ['06-process', 5.4],
  ['07-reviews', 6.3],
  ['08-gallery', 7.2],
  ['09-cta', 8.6],
]

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()

for (const v of VIEWS) {
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: v.dsf,
    isMobile: v.mobile,
    hasTouch: v.mobile,
    locale: 'vi-VN',
  })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))

  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(4200)

  for (const [name, mult] of STOPS) {
    await page.evaluate((m) => window.scrollTo({ top: m * window.innerHeight, behavior: 'instant' }), mult)
    await page.waitForTimeout(1200)
    await page.screenshot({ path: `${OUT}/${v.name}-${name}.png` })
  }

  if (errors.length) console.log(`[${v.name}] LỖI:`, errors.slice(0, 8))
  else console.log(`[${v.name}] không có lỗi console`)
  await ctx.close()
}

await browser.close()
console.log('xong ->', OUT)
