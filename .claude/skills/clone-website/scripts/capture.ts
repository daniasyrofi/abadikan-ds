#!/usr/bin/env npx tsx

/**
 * Website Capture Script
 * Orchestrates all 5 capture layers and saves structured JSON output.
 *
 * Usage: npx tsx capture.ts <url>
 * Output: cloned-sites/<domain>/_capture/
 */

import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { runRecon } from './layers/recon.js'
import { createCDPCapture } from './layers/cdp-animations.js'
import { sweepWebAnimations } from './layers/web-animations.js'
import { extractGSAP } from './layers/gsap-extract.js'
import { discoverScrollAnimations } from './layers/scroll-discover.js'
import { extractCSS } from './layers/css-extract.js'
import { downloadAssets } from './utils/assets.js'

const url = process.argv[2]

if (!url) {
  console.error('Usage: npx tsx capture.ts <url>')
  process.exit(1)
}

// Derive output directory from domain
const domain = new URL(url).hostname.replace(/\./g, '-')
const outputDir = join(process.cwd(), 'cloned-sites', domain)
const captureDir = join(outputDir, '_capture')

async function main() {
  console.log(`\n[clone-website] Capturing: ${url}`)
  console.log(`Output: ${outputDir}\n`)

  await mkdir(captureDir, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })
  const page = await context.newPage()

  try {
    // ── Start CDP capture before navigation ──
    console.log('Starting CDP animation listener...')
    const cdpCapture = await createCDPCapture(page)
    await cdpCapture.start()

    // ── Navigate ──
    console.log('Loading page...')
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(2000) // Let initial animations play

    // ── Phase 1: Recon ──
    console.log('Phase 1: Recon — screenshots, metadata, framework detection...')
    const recon = await runRecon(page, outputDir)
    await writeFile(join(captureDir, 'recon.json'), JSON.stringify(recon, null, 2))
    console.log(`  Title: "${recon.title}"`)
    console.log(`  Fonts: ${recon.fonts.slice(0, 5).join(', ')}`)
    console.log(`  Colors: ${recon.colors.length} unique`)
    console.log(`  Frameworks: ${Object.entries(recon.frameworks).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none detected'}`)
    console.log(`  Sections: ${recon.sections.length} found`)

    // ── Phase 2: Multi-layer capture ──
    console.log('\nPhase 2: Animation capture...')

    // Layer 2: Web Animations API (initial sweep)
    console.log('  Layer 2: Web Animations API sweep...')
    const initialWebAnimations = await sweepWebAnimations(page)
    console.log(`  -> ${initialWebAnimations.length} web animations found`)

    // Layer 3: GSAP extraction
    console.log('  Layer 3: GSAP extraction...')
    const gsapData = await extractGSAP(page)
    if (gsapData.detected) {
      console.log(`  -> GSAP detected: ${gsapData.tweens.length} tweens, ${gsapData.scrollTriggers.length} scroll triggers`)
    } else {
      console.log('  -> GSAP not detected on this page')
    }

    // Layer 4: Scroll discovery
    console.log('  Layer 4: Scroll discovery (this may take a moment)...')
    const scrollFrames = await discoverScrollAnimations(page)
    console.log(`  -> ${scrollFrames.length} scroll positions captured`)

    // Layer 5: CSS stylesheet extraction
    console.log('  Layer 5: CSS stylesheet extraction...')
    const cssData = await extractCSS(page)
    console.log(`  -> ${cssData.keyframeRules.length} @keyframes, ${cssData.transitionRules.length} transitions, ${cssData.animationUsages.length} animation usages`)

    // Stop CDP capture
    const cdpAnimations = cdpCapture.stop()
    console.log(`  Layer 1: CDP captured ${cdpAnimations.length} animations total`)

    // ── Save animation data ──
    const animations = {
      cdpAnimations,
      initialWebAnimations,
      gsapData,
      scrollFrames,
      cssData,
    }
    await writeFile(join(captureDir, 'animations.json'), JSON.stringify(animations, null, 2))

    // ── Save DOM ──
    console.log('\nSaving DOM snapshot...')
    const bodyHtml = await page.evaluate(() => document.body.innerHTML)
    await writeFile(join(captureDir, 'dom.html'), bodyHtml)

    // ── Save computed styles for sections ──
    console.log('Extracting section styles...')
    const sectionStyles = await page.evaluate(() => {
      const sections = document.querySelectorAll('body > *, main > *, [role="main"] > *')
      return Array.from(sections)
        .filter(el => el.getBoundingClientRect().height > 50)
        .map(el => {
          const style = getComputedStyle(el)
          return {
            selector: el.id ? `#${el.id}` : (el as HTMLElement).className ? `.${Array.from((el as HTMLElement).classList).join('.')}` : el.tagName.toLowerCase(),
            styles: {
              display: style.display,
              position: style.position,
              padding: style.padding,
              margin: style.margin,
              background: style.background,
              color: style.color,
              fontSize: style.fontSize,
              fontFamily: style.fontFamily,
              fontWeight: style.fontWeight,
              lineHeight: style.lineHeight,
              textAlign: style.textAlign,
              gap: style.gap,
              flexDirection: style.flexDirection,
              justifyContent: style.justifyContent,
              alignItems: style.alignItems,
              gridTemplateColumns: style.gridTemplateColumns,
              maxWidth: style.maxWidth,
              overflow: style.overflow,
            },
          }
        })
    })
    await writeFile(join(captureDir, 'styles.json'), JSON.stringify(sectionStyles, null, 2))

    // ── Download assets ──
    console.log('Downloading assets...')
    const assets = await downloadAssets(page, outputDir, url)
    console.log(`  -> ${assets.images.length} images, ${assets.fonts.length} fonts downloaded`)

    // Save asset map for reference
    await writeFile(join(captureDir, 'assets.json'), JSON.stringify(assets, null, 2))

    // ── Summary ──
    console.log('\nCapture complete!')
    console.log(`Output saved to: ${captureDir}`)
    console.log('\nFiles:')
    console.log('  - recon.json      — metadata, fonts, colors, frameworks, sections')
    console.log('  - animations.json — all 5 layers of animation data')
    console.log('  - dom.html        — page body HTML')
    console.log('  - styles.json     — computed styles for sections')
    console.log('  - assets.json     — downloaded asset map')
    console.log('  - screenshots/    — full-page screenshots at 3 viewports')

  } catch (err) {
    console.error('\nCapture failed:', err)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

main()
