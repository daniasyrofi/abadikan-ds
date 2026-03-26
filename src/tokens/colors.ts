/** Primitive color tokens (raw OKLCH) — for JS/Canvas use only.
 *  Always use CSS custom properties in component styles. */

export const primitives = {
  red: {
    light: 'oklch(0.92 0.04 18)',
    base:  'oklch(0.55 0.22 18)',
    dark:  'oklch(0.42 0.22 18)',
  },
  pink: {
    light: 'oklch(0.92 0.04 350)',
    base:  'oklch(0.60 0.18 350)',
    dark:  'oklch(0.47 0.18 350)',
  },
  neutral: {
    50:  'oklch(0.98 0.005 80)',
    100: 'oklch(0.95 0.008 80)',
    200: 'oklch(0.90 0.010 80)',
    300: 'oklch(0.82 0.010 80)',
    400: 'oklch(0.73 0.010 80)',
    500: 'oklch(0.65 0.010 80)',
    600: 'oklch(0.55 0.010 80)',
    700: 'oklch(0.40 0.010 80)',
    800: 'oklch(0.28 0.010 80)',
    900: 'oklch(0.20 0.010 80)',
    950: 'oklch(0.13 0.008 80)',
  },
  success: {
    light: 'oklch(0.92 0.04 145)',
    base:  'oklch(0.65 0.17 145)',
    dark:  'oklch(0.50 0.17 145)',
  },
  warning: {
    light: 'oklch(0.94 0.04 80)',
    base:  'oklch(0.75 0.15 75)',
    dark:  'oklch(0.60 0.15 75)',
  },
  info: {
    light: 'oklch(0.92 0.04 240)',
    base:  'oklch(0.65 0.12 240)',
    dark:  'oklch(0.50 0.12 240)',
  },
} as const

export type PrimitiveColor = typeof primitives
