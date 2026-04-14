/**
 * Generate a unique CSS selector for a DOM element.
 * Designed to run inside page.evaluate() context.
 */
export const getSelectorScript = `
function getUniqueSelector(el) {
  if (!el || el === document.body) return 'body'
  if (el.id) return '#' + CSS.escape(el.id)

  const parts = []
  let current = el

  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase()

    // Prefer meaningful class names (skip utility classes)
    const meaningful = Array.from(current.classList).filter(c =>
      !c.match(/^(w-|h-|p-|m-|flex|grid|text-|bg-|border-|rounded|shadow|opacity|translate|scale|rotate|skew|transition|animate|duration|ease|delay)/)
    )
    if (meaningful.length > 0) {
      selector += '.' + meaningful.map(c => CSS.escape(c)).join('.')
    }

    // Add nth-child if selector isn't unique among siblings
    const parent = current.parentElement
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        s => s.tagName === current.tagName
      )
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1
        selector += ':nth-child(' + index + ')'
      }
    }

    parts.unshift(selector)
    current = current.parentElement

    // Stop if we have enough specificity
    if (current && (current.id || parts.length >= 4)) {
      if (current.id) parts.unshift('#' + CSS.escape(current.id))
      break
    }
  }

  return parts.join(' > ')
}
`
