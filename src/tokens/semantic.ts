/**
 * Semantic design tokens — JavaScript/TypeScript accessible.
 *
 * Colors are exported as CSS custom property references so they
 * automatically reflect the current theme (light/dark).
 * Non-color tokens are exported as their resolved values.
 *
 * @example
 * ```ts
 * import { colors, spacing, radii } from '@abadikan/ds/tokens'
 *
 * // In canvas/chart contexts (runtime value):
 * const bg = getComputedStyle(el).getPropertyValue('--color-primary')
 *
 * // In inline styles:
 * el.style.color = colors.primary           // 'var(--color-primary)'
 * el.style.padding = spacing[4]             // '16px'
 * el.style.borderRadius = radii.md          // '8px'
 * ```
 */

// ── Semantic color tokens ─────────────────────────────────────────────────────
// Values are CSS variable references — they swap automatically in dark mode.

export const colors = {
  // Backgrounds
  bg:               'var(--color-bg)',
  bgSubtle:         'var(--color-bg-subtle)',
  surface:          'var(--color-surface)',
  surfaceRaised:    'var(--color-surface-raised)',
  surfaceOverlay:   'var(--color-surface-overlay)',
  surfaceGlass:     'var(--color-surface-glass)',

  // Borders
  border:           'var(--color-border)',
  borderSubtle:     'var(--color-border-subtle)',
  borderStrong:     'var(--color-border-strong)',

  // Text
  textHeading:      'var(--color-text-heading)',
  textPrimary:      'var(--color-text-primary)',
  textSecondary:    'var(--color-text-secondary)',
  textTertiary:     'var(--color-text-tertiary)',
  textMuted:        'var(--color-text-muted)',
  textDisabled:     'var(--color-text-disabled)',
  textInverse:      'var(--color-text-inverse)',

  // Brand / interactive
  primary:          'var(--color-primary)',
  primaryHover:     'var(--color-primary-hover)',
  primaryLight:     'var(--color-primary-light)',
  primaryText:      'var(--color-primary-text)',

  secondary:        'var(--color-secondary)',
  secondaryHover:   'var(--color-secondary-hover)',
  secondaryLight:   'var(--color-secondary-light)',

  neutral:          'var(--color-neutral)',
  neutralHover:     'var(--color-neutral-hover)',
  neutralLight:     'var(--color-neutral-light)',
  neutralSubtle:    'var(--color-neutral-subtle)',

  // Status
  success:          'var(--color-success)',
  successHover:     'var(--color-success-hover)',
  successLight:     'var(--color-success-light)',

  warning:          'var(--color-warning)',
  warningHover:     'var(--color-warning-hover)',
  warningLight:     'var(--color-warning-light)',

  danger:           'var(--color-danger)',
  dangerHover:      'var(--color-danger-hover)',
  dangerLight:      'var(--color-danger-light)',

  info:             'var(--color-info)',
  infoHover:        'var(--color-info-hover)',
  infoLight:        'var(--color-info-light)',
} as const

export type SemanticColor = keyof typeof colors

// ── Spacing ───────────────────────────────────────────────────────────────────

export const spacing = {
  0:    '0px',
  px:   '1px',
  0.5:  '2px',
  1:    '4px',
  1.5:  '6px',
  2:    '8px',
  2.5:  '10px',
  3:    '12px',
  4:    '16px',
  5:    '20px',
  6:    '24px',
  8:    '32px',
  10:   '40px',
  12:   '48px',
  16:   '64px',
  20:   '80px',
  24:   '96px',
} as const

export type SpacingScale = keyof typeof spacing

// ── Border radii ──────────────────────────────────────────────────────────────

export const radii = {
  xs:   '2px',
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  '2xl':'20px',
  full: '9999px',
} as const

export type RadiusScale = keyof typeof radii

// ── Shadows ───────────────────────────────────────────────────────────────────
// CSS variable references — dark mode variants swap automatically.

export const shadows = {
  xs:        'var(--shadow-xs)',
  sm:        'var(--shadow-sm)',
  md:        'var(--shadow-md)',
  lg:        'var(--shadow-lg)',
  xl:        'var(--shadow-xl)',
  '2xl':     'var(--shadow-2xl)',
  inset:     'var(--shadow-inset)',
  highlight: 'var(--shadow-highlight)',
} as const

// ── Duration / easing ─────────────────────────────────────────────────────────

export const duration = {
  fast:   '100ms',
  normal: '200ms',
  slow:   '300ms',
} as const

export const easing = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  in:      'cubic-bezier(0.4, 0, 1, 1)',
  out:     'cubic-bezier(0, 0, 0.2, 1)',
} as const

// ── Breakpoints ───────────────────────────────────────────────────────────────

export const breakpoints = {
  xs:  '480px',
  sm:  '480px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  '2xl': '1536px',
} as const

export type Breakpoint = keyof typeof breakpoints

// ── Font families ─────────────────────────────────────────────────────────────

export const fonts = {
  display: "'Abadikan Sans', sans-serif",
  ui:      "'Inter', sans-serif",
  mono:    "'JetBrains Mono', monospace",
} as const

// ── Z-index scale ─────────────────────────────────────────────────────────────

export const zIndex = {
  base:    0,
  raised:  10,
  dropdown: 40,
  sticky:  50,
  overlay: 60,
  modal:   70,
  popover: 80,
  toast:   90,
  tooltip: 100,
} as const

export type ZIndexScale = keyof typeof zIndex

// ── Runtime helper ────────────────────────────────────────────────────────────

/**
 * Read the computed value of a CSS custom property at runtime.
 * Useful for canvas/chart contexts that need resolved color values.
 *
 * @example
 * ```ts
 * const primaryColor = getCSSVar('--color-primary')
 * // → 'oklch(0.55 0.22 18)' in light mode
 * ```
 */
export function getCSSVar(property: string, element: Element = document.documentElement): string {
  return getComputedStyle(element).getPropertyValue(property).trim()
}
