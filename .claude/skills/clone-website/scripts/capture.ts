#!/usr/bin/env npx tsx

/**
 * Website Capture Script — Exact Copy Approach
 *
 * Extracts exact computed CSS values via getComputedStyle() for pixel-perfect cloning.
 * Follows the JCodesMore/ai-website-cloner-template methodology:
 *   1. Reconnaissance — screenshots at 3 viewports, metadata
 *   2. DOM + Computed Styles — deep walk with exact CSS values per element
 *   3. Assets — download all images/fonts with unique filenames
 *   4. Component Specs — generate spec files for each section
 *
 * Usage: npx tsx capture.ts <url>
 * Output: cloned-sites/<domain>/_capture/
 */

import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'

const url = process.argv[2]

if (!url) {
  console.error('Usage: npx tsx capture.ts <url>')
  process.exit(1)
}

const domain = new URL(url).hostname.replace(/\./g, '-')
const outputDir = join(process.cwd(), 'cloned-sites', domain)
const captureDir = join(outputDir, '_capture')
const specsDir = join(captureDir, 'specs')
const screenshotsDir = join(captureDir, 'screenshots')

// ── getComputedStyle extraction script (injected into browser) ──
const EXTRACT_TREE_SCRIPT = `
(function(rootSelector, maxDepth) {
  const PROPS = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','textAlign','whiteSpace','textOverflow',
    'backgroundColor','background','backgroundImage','backgroundSize','backgroundPosition',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','alignSelf','flexWrap','gap',
    'gridTemplateColumns','gridTemplateRows','gridColumn','gridRow',
    'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
    'borderColor','borderWidth','borderStyle',
    'boxShadow','overflow','overflowX','overflowY',
    'position','top','right','bottom','left','zIndex',
    'opacity','transform','transition','cursor',
    'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
    'WebkitLineClamp','aspectRatio'
  ];

  const SKIP_DEFAULTS = new Set([
    'none','normal','auto','0px','rgba(0, 0, 0, 0)','0px 0px 0px 0px',
    'start','stretch','visible','static','',
    '0px none rgb(0, 0, 0)','medium none currentcolor'
  ]);

  function extractStyles(el) {
    const cs = getComputedStyle(el);
    const styles = {};
    PROPS.forEach(p => {
      try {
        const v = cs[p];
        if (v && !SKIP_DEFAULTS.has(v)) styles[p] = v;
      } catch(e) {}
    });
    return styles;
  }

  function getSelector(el) {
    if (el.id) return '#' + el.id;
    const tag = el.tagName.toLowerCase();
    const classes = Array.from(el.classList)
      .filter(c => !c.match(/^[a-z]{1,3}-\\[/) && c.length < 50) // skip Tailwind arbitrary
      .slice(0, 4);
    let sel = classes.length > 0 ? tag + '.' + classes.join('.') : tag;
    // Add nth-child for uniqueness
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(s => s.tagName === el.tagName);
      if (siblings.length > 1) {
        const idx = siblings.indexOf(el) + 1;
        sel += ':nth-child(' + idx + ')';
      }
    }
    return sel;
  }

  function walk(el, depth) {
    if (depth > maxDepth) return null;
    var tag = el.tagName.toLowerCase();
    // Skip non-visual elements
    if (['script','style','noscript','link','meta','template'].indexOf(tag) >= 0) return null;
    var rect = el.getBoundingClientRect();
    // Skip hidden elements with no visible children
    var cs = getComputedStyle(el);
    if (cs.display === 'none') return null;

    var children = Array.from(el.children);
    var textNodes = Array.from(el.childNodes)
      .filter(function(n) { return n.nodeType === 3 && n.textContent.trim(); })
      .map(function(n) { return n.textContent.trim(); })
      .join(' ');

    var node = {
      tag: tag,
      selector: getSelector(el),
      rect: {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      styles: extractStyles(el),
      text: textNodes.length > 0 ? textNodes.slice(0, 500) : null,
      childCount: children.length,
      children: children.map(function(c) { return walk(c, depth + 1); }).filter(Boolean)
    };

    // Image info
    if (el.tagName === 'IMG') {
      node.image = {
        src: el.src,
        alt: el.alt,
        naturalWidth: el.naturalWidth,
        naturalHeight: el.naturalHeight
      };
    }

    // Background image
    var bgImg = getComputedStyle(el).backgroundImage;
    if (bgImg && bgImg !== 'none') {
      node.backgroundImage = bgImg;
    }

    // Link info
    if (el.tagName === 'A') {
      node.href = el.href;
    }

    return node;
  }

  const root = rootSelector === 'body'
    ? document.body
    : document.querySelector(rootSelector);

  if (!root) return JSON.stringify({ error: 'Root not found: ' + rootSelector });
  return JSON.stringify(walk(root, 0));
})
`

// ── Identify sections ──
const IDENTIFY_SECTIONS_SCRIPT = `
(function() {
  // Find top-level sections
  const candidates = [
    ...document.querySelectorAll('body > *'),
    ...document.querySelectorAll('main > *'),
    ...document.querySelectorAll('[role="main"] > *'),
    ...document.querySelectorAll('body > div > *'),
  ];

  const seen = new Set();
  const sections = [];

  candidates.forEach(el => {
    if (seen.has(el)) return;
    const rect = el.getBoundingClientRect();
    if (rect.height < 30) return; // skip tiny elements
    seen.add(el);

    const tag = el.tagName.toLowerCase();
    let name = el.id || '';
    if (!name) {
      const classes = Array.from(el.classList).filter(c => c.length < 40 && !c.match(/^[a-z]{1,3}-\\[/));
      name = classes[0] || tag;
    }

    let selector = el.id ? '#' + el.id : '';
    if (!selector) {
      const classes = Array.from(el.classList).slice(0, 3);
      selector = classes.length > 0 ? tag + '.' + classes.join('.') : tag;
    }

    sections.push({
      name,
      selector,
      tag,
      rect: {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      text: el.textContent.trim().slice(0, 100)
    });
  });

  return JSON.stringify(sections);
})()
`

async function main() {
  console.log(`\n[clone-website] Capturing: ${url}`)
  console.log(`Output: ${outputDir}\n`)

  await mkdir(captureDir, { recursive: true })
  await mkdir(specsDir, { recursive: true })
  await mkdir(screenshotsDir, { recursive: true })

  const browser = await chromium.launch({ headless: true })

  try {
    // ═══════════════════════════════════════════
    // Phase 1: Screenshots at multiple viewports
    // ═══════════════════════════════════════════
    console.log('Phase 1: Screenshots...')
    const viewports = [
      { name: 'mobile', width: 390, height: 844 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 },
    ]

    for (const vp of viewports) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      })
      const page = await ctx.newPage()
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await page.waitForTimeout(5000)
      await page.waitForTimeout(2000)

      await page.screenshot({
        path: join(screenshotsDir, `${vp.name}-${vp.width}x${vp.height}.png`),
        fullPage: true,
      })

      console.log(`  -> ${vp.name} (${vp.width}x${vp.height}) captured`)
      await ctx.close()
    }

    // ═══════════════════════════════════════════
    // Phase 2: Main extraction at desktop viewport
    // ═══════════════════════════════════════════
    console.log('\nPhase 2: DOM + Computed Styles extraction...')

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    })
    const page = await context.newPage()
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(2000)

    // 2a: Metadata extraction
    console.log('  Extracting metadata...')
    const meta = await page.evaluate(`
      (function() {
        function getMeta(name) {
          var el = document.querySelector('meta[name="' + name + '"], meta[property="' + name + '"]');
          return el ? el.getAttribute('content') || '' : '';
        }

        var fonts = new Set();
        document.querySelectorAll('*').forEach(function(el) {
          var ff = getComputedStyle(el).fontFamily;
          if (ff) {
            ff.split(',').forEach(function(f) {
              var clean = f.trim().replace(/["']/g, '');
              if (clean && !clean.match(/^(serif|sans-serif|monospace|cursive|fantasy|system-ui|inherit)$/))
                fonts.add(clean);
            });
          }
        });

        var colors = new Set();
        document.querySelectorAll('*').forEach(function(el) {
          var cs = getComputedStyle(el);
          ['color', 'backgroundColor', 'borderColor'].forEach(function(p) {
            var v = cs[p];
            if (v && v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent') colors.add(v);
          });
        });

        return {
          title: document.title,
          description: getMeta('description') || getMeta('og:description'),
          favicon: (document.querySelector('link[rel*="icon"]') || {}).href || '',
          fonts: Array.from(fonts),
          colors: Array.from(colors),
          bodyClasses: document.body.className,
        };
      })()
    `)
    await writeFile(join(captureDir, 'meta.json'), JSON.stringify(meta, null, 2))
    console.log(`  Title: "${meta.title}"`)
    console.log(`  Fonts: ${meta.fonts.slice(0, 5).join(', ')}`)
    console.log(`  Colors: ${meta.colors.length} unique`)

    // 2b: Identify sections
    console.log('  Identifying sections...')
    const sectionsRaw = await page.evaluate(IDENTIFY_SECTIONS_SCRIPT)
    const sections = JSON.parse(sectionsRaw as string)
    await writeFile(join(captureDir, 'sections.json'), JSON.stringify(sections, null, 2))
    console.log(`  -> ${sections.length} sections found`)

    // 2c: Deep extract for FULL page (4 levels deep)
    console.log('  Extracting full DOM tree with computed styles (depth=5)...')
    const fullTreeRaw = await page.evaluate(EXTRACT_TREE_SCRIPT + "('body', 5)")
    const fullTree = JSON.parse(fullTreeRaw as string)
    await writeFile(join(captureDir, 'dom-tree.json'), JSON.stringify(fullTree, null, 2))
    console.log(`  -> Full tree extracted`)

    // 2d: Per-section deep extract (6 levels deep for detail)
    console.log('  Extracting per-section detail (depth=6)...')
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      try {
        const treeRaw = await page.evaluate(
          EXTRACT_TREE_SCRIPT + `('${section.selector.replace(/'/g, "\\'")}', 6)`
        )
        const tree = JSON.parse(treeRaw as string)
        if (!tree.error) {
          const safeName = section.name.replace(/[^a-z0-9-_]/gi, '-').slice(0, 40)
          await writeFile(
            join(specsDir, `${i}-${safeName}.json`),
            JSON.stringify(tree, null, 2)
          )
        }
      } catch (e) {
        console.log(`  -> Section "${section.name}" extraction failed (${(e as Error).message.slice(0, 60)})`)
      }
    }
    console.log(`  -> Per-section specs saved`)

    // 2e: Extract at mobile viewport too
    console.log('  Extracting mobile computed styles...')
    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(1000)
    const mobileTreeRaw = await page.evaluate(EXTRACT_TREE_SCRIPT + "('body', 4)")
    const mobileTree = JSON.parse(mobileTreeRaw as string)
    await writeFile(join(captureDir, 'dom-tree-mobile.json'), JSON.stringify(mobileTree, null, 2))
    console.log(`  -> Mobile tree extracted`)

    // Reset viewport for asset download
    await page.setViewportSize({ width: 1440, height: 900 })

    // ═══════════════════════════════════════════
    // Phase 3: Download assets (images + fonts)
    // ═══════════════════════════════════════════
    console.log('\nPhase 3: Downloading assets...')
    const assets = await downloadAssetsFixed(page, outputDir, url)
    console.log(`  -> ${assets.images.length} images, ${assets.fonts.length} fonts downloaded`)
    await writeFile(join(captureDir, 'assets.json'), JSON.stringify(assets, null, 2))

    // ═══════════════════════════════════════════
    // Phase 4: Save raw HTML
    // ═══════════════════════════════════════════
    console.log('\nPhase 4: Saving raw HTML...')
    const bodyHtml = await page.content()
    await writeFile(join(captureDir, 'page.html'), bodyHtml)
    console.log('  -> Full page HTML saved')

    // ═══════════════════════════════════════════
    // Summary
    // ═══════════════════════════════════════════
    console.log('\n✓ Capture complete!')
    console.log(`Output saved to: ${captureDir}`)
    console.log('\nFiles:')
    console.log('  - meta.json           — title, fonts, colors, metadata')
    console.log('  - sections.json       — identified page sections')
    console.log('  - dom-tree.json       — full DOM tree with computed styles (desktop)')
    console.log('  - dom-tree-mobile.json — full DOM tree with computed styles (mobile)')
    console.log('  - specs/*.json        — per-section deep extraction')
    console.log('  - assets.json         — downloaded asset map')
    console.log('  - page.html           — raw page HTML')
    console.log('  - screenshots/        — full-page screenshots at 3 viewports')

    await context.close()
  } catch (err) {
    console.error('\nCapture failed:', err)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

// ── Fixed asset downloader with unique filenames ──
interface DownloadedAsset {
  originalUrl: string
  localPath: string
  filename: string
}

async function downloadAssetsFixed(
  page: any,
  outputDir: string,
  baseUrl: string
): Promise<{ images: DownloadedAsset[]; fonts: DownloadedAsset[] }> {
  const imagesDir = join(outputDir, 'assets', 'images')
  const fontsDir = join(outputDir, 'assets', 'fonts')
  await mkdir(imagesDir, { recursive: true })
  await mkdir(fontsDir, { recursive: true })

  const imageUrls = await page.evaluate(`
    (function() {
      var urls = new Set();
      document.querySelectorAll('img[src]').forEach(function(img) { urls.add(img.src); });
      document.querySelectorAll('*').forEach(function(el) {
        var bg = getComputedStyle(el).backgroundImage;
        var match = bg.match(/url\\(["']?(.*?)["']?\\)/);
        if (match && match[1] && !match[1].startsWith('data:')) urls.add(match[1]);
      });
      return Array.from(urls);
    })()
  `) as string[]

  const fontUrls = await page.evaluate(`
    (function() {
      var urls = new Set();
      for (var i = 0; i < document.styleSheets.length; i++) {
        try {
          var rules = document.styleSheets[i].cssRules;
          for (var j = 0; j < rules.length; j++) {
            if (rules[j] instanceof CSSFontFaceRule) {
              var src = rules[j].style.getPropertyValue('src');
              var re = /url\\(["']?(.*?)["']?\\)/g;
              var m;
              while ((m = re.exec(src)) !== null) {
                if (m[1] && !m[1].startsWith('data:')) urls.add(m[1]);
              }
            }
          }
        } catch(e) { /* CORS-blocked */ }
      }
      return Array.from(urls);
    })()
  `) as string[]

  const images = await downloadFilesFixed(imageUrls, imagesDir, baseUrl)
  const fonts = await downloadFilesFixed(fontUrls, fontsDir, baseUrl)

  return { images, fonts }
}

async function downloadFilesFixed(
  urls: string[],
  dir: string,
  baseUrl: string
): Promise<DownloadedAsset[]> {
  const results: DownloadedAsset[] = []
  const seenUrls = new Set<string>()
  const usedFilenames = new Set<string>()

  for (const rawUrl of urls) {
    try {
      const resolved = new URL(rawUrl, baseUrl).href
      if (seenUrls.has(resolved)) continue
      seenUrls.add(resolved)

      const response = await fetch(resolved)
      if (!response.ok) continue

      const buffer = Buffer.from(await response.arrayBuffer())

      // Derive meaningful filename
      let filename = deriveFilename(resolved)

      // Ensure uniqueness
      if (usedFilenames.has(filename)) {
        const ext = extname(filename)
        const base = filename.slice(0, filename.length - ext.length)
        let counter = 2
        while (usedFilenames.has(`${base}-${counter}${ext}`)) counter++
        filename = `${base}-${counter}${ext}`
      }
      usedFilenames.add(filename)

      const localPath = join(dir, filename)
      await writeFile(localPath, buffer)
      results.push({ originalUrl: resolved, localPath, filename })
    } catch { /* skip failed downloads */ }
  }

  return results
}

function deriveFilename(urlStr: string): string {
  // Try to decode original filename from base64-encoded CDN URLs (viding.co pattern)
  const b64Match = urlStr.match(/aHR0[A-Za-z0-9_-]+/)
  if (b64Match) {
    try {
      const decoded = Buffer.from(b64Match[0], 'base64').toString()
      const parts = decoded.split('/').pop()
      if (parts && parts.includes('.')) return parts
    } catch { /* fallback */ }
  }

  // Standard URL — use pathname
  const pathname = new URL(urlStr).pathname
  let filename = pathname.split('/').pop() || 'unnamed'

  // Remove query-style suffixes
  filename = filename.split('?')[0]

  // If no extension, try to detect from URL
  if (!extname(filename)) {
    if (urlStr.includes('.png') || urlStr.includes('f%3Apng')) filename += '.png'
    else if (urlStr.includes('.jpg') || urlStr.includes('.jpeg')) filename += '.jpg'
    else if (urlStr.includes('.gif')) filename += '.gif'
    else if (urlStr.includes('.webp')) filename += '.webp'
    else if (urlStr.includes('.svg')) filename += '.svg'
    else filename += '.png' // default
  }

  return filename
}

main()
