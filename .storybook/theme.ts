import { create } from '@storybook/theming/create'

export const lightTheme = create({
  base: 'light',
  brandTitle: 'Design System',
  brandUrl: '/',

  // Colors matching our palette
  colorPrimary:   '#D72539',
  colorSecondary: '#D72539',

  // UI
  appBg:          '#f7f6f0',
  appContentBg:   '#ffffff',
  appBorderColor: '#e8e6df',
  appBorderRadius: 8,

  // Typography
  fontBase:  '"Inter", sans-serif',
  fontCode:  '"JetBrains Mono", monospace',

  // Text colors
  textColor:       '#3d3c38',
  textInverseColor:'#ffffff',
  textMutedColor:  '#8a8880',

  // Toolbar
  barTextColor:    '#8a8880',
  barSelectedColor:'#D72539',
  barHoverColor:   '#D72539',
  barBg:           '#f7f6f0',

  // Form
  inputBg:         '#ffffff',
  inputBorder:     '#e8e6df',
  inputTextColor:  '#3d3c38',
  inputBorderRadius: 6,
})

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'Design System',
  brandUrl: '/',

  colorPrimary:   '#e86070',
  colorSecondary: '#e86070',

  appBg:          '#1a1918',
  appContentBg:   '#1f1e1c',
  appBorderColor: '#2e2d2a',
  appBorderRadius: 8,

  fontBase:  '"Inter", sans-serif',
  fontCode:  '"JetBrains Mono", monospace',

  textColor:       '#e3e1dc',
  textInverseColor:'#1a1918',
  textMutedColor:  '#7a7874',

  barTextColor:    '#7a7874',
  barSelectedColor:'#e86070',
  barHoverColor:   '#e86070',
  barBg:           '#1a1918',

  inputBg:         '#252420',
  inputBorder:     '#2e2d2a',
  inputTextColor:  '#e3e1dc',
  inputBorderRadius: 6,
})
