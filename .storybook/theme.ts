import { create } from 'storybook/theming/create'

export const lightTheme = create({
  base: 'light',
  brandTitle: 'Abadikan Design System',
  brandUrl: '/',

  // Terracotta/Black
  colorPrimary:   '#111111',
  colorSecondary: '#111111', // Active tabs

  appBg:          '#FAFAF8', // Sidebar warm white
  appContentBg:   '#FFFFFF', // Storybook main area
  appPreviewBg:   '#FFFFFF',
  appBorderColor: '#EBE8E0',
  appBorderRadius: 8,

  fontBase:  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:  '"JetBrains Mono", "SF Mono", monospace',

  textColor:       '#111111',
  textInverseColor:'#FFFFFF',
  textMutedColor:  '#666666',

  barTextColor:    '#666666',
  barSelectedColor:'#111111',
  barHoverColor:   '#111111',
  barBg:           '#FFFFFF',

  inputBg:         '#FFFFFF',
  inputBorder:     '#E5E3DB',
  inputTextColor:  '#111111',
  inputBorderRadius: 6,

  booleanBg:          '#EDECEA',
  booleanSelectedBg:  '#3A3936',

  buttonBg:           '#F5F5F3',
  buttonBorder:       '#E8E8E4',
})

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'Design System',
  brandUrl: '/',

  colorPrimary:   '#d44e8c',
  colorSecondary: '#d44e8c',

  appBg:            '#141414',
  appContentBg:     '#1A1A1A',
  appPreviewBg:     '#1A1A1A',
  appBorderColor:   '#2A2A2A',
  appBorderRadius:  8,

  fontBase:  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:  '"JetBrains Mono", "SF Mono", "Cascadia Code", monospace',

  textColor:        '#E5E5E5',
  textInverseColor: '#141414',
  textMutedColor:   '#888888',

  barTextColor:     '#888888',
  barSelectedColor: '#E5E5E5',
  barHoverColor:    '#E5E5E5',
  barBg:            '#1A1A1A',

  inputBg:            '#222222',
  inputBorder:        '#2A2A2A',
  inputTextColor:     '#E5E5E5',
  inputBorderRadius:  6,

  booleanBg:          '#2A2A2A',
  booleanSelectedBg:  '#d44e8c',

  buttonBg:           '#222222',
  buttonBorder:       '#2A2A2A',
})
