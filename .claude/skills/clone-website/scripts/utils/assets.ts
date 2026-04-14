import { mkdir, writeFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import type { Page } from 'playwright'

interface DownloadedAsset {
  originalUrl: string
  localPath: string
  filename: string
}

/**
 * Download all images and fonts from the page.
 */
export async function downloadAssets(
  page: Page,
  outputDir: string,
  baseUrl: string
): Promise<{ images: DownloadedAsset[]; fonts: DownloadedAsset[] }> {
  const imagesDir = join(outputDir, 'assets', 'images')
  const fontsDir = join(outputDir, 'assets', 'fonts')
  await mkdir(imagesDir, { recursive: true })
  await mkdir(fontsDir, { recursive: true })

  // Collect image URLs
  const imageUrls = await page.evaluate(() => {
    const urls = new Set<string>()

    // <img> tags
    document.querySelectorAll('img[src]').forEach(img => {
      urls.add((img as HTMLImageElement).src)
    })

    // CSS background images
    document.querySelectorAll('*').forEach(el => {
      const bg = getComputedStyle(el).backgroundImage
      const match = bg.match(/url\(["']?(.*?)["']?\)/)
      if (match && match[1] && !match[1].startsWith('data:')) {
        urls.add(match[1])
      }
    })

    return Array.from(urls)
  })

  // Collect font URLs from @font-face rules
  const fontUrls = await page.evaluate(() => {
    const urls = new Set<string>()
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSFontFaceRule) {
            const src = rule.style.getPropertyValue('src')
            const matches = src.matchAll(/url\(["']?(.*?)["']?\)/g)
            for (const m of matches) {
              if (m[1] && !m[1].startsWith('data:')) urls.add(m[1])
            }
          }
        }
      } catch { /* CORS-blocked */ }
    }
    return Array.from(urls)
  })

  const images = await downloadFiles(imageUrls, imagesDir, baseUrl)
  const fonts = await downloadFiles(fontUrls, fontsDir, baseUrl)

  return { images, fonts }
}

async function downloadFiles(
  urls: string[],
  dir: string,
  baseUrl: string
): Promise<DownloadedAsset[]> {
  const results: DownloadedAsset[] = []
  const seen = new Set<string>()

  for (const rawUrl of urls) {
    try {
      const resolved = new URL(rawUrl, baseUrl).href
      if (seen.has(resolved)) continue
      seen.add(resolved)

      const response = await fetch(resolved)
      if (!response.ok) continue

      const buffer = Buffer.from(await response.arrayBuffer())
      let filename = basename(new URL(resolved).pathname) || 'unnamed'

      // Ensure unique filename
      if (seen.has(filename)) {
        const ext = extname(filename)
        const base = filename.slice(0, -ext.length || undefined)
        filename = `${base}-${Date.now()}${ext}`
      }

      const localPath = join(dir, filename)
      await writeFile(localPath, buffer)
      results.push({ originalUrl: resolved, localPath, filename })
    } catch { /* skip failed downloads */ }
  }

  return results
}
