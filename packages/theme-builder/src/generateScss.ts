import type { ThemeTokens } from './tokens.js'
import { generateVbenCompatCss } from './vbenCompat.js'

export interface ElementPlusThemeImports {
  varScss: string
  indexScss: string
}

const stateColorKeys = ['primary', 'success', 'warning', 'danger', 'error', 'info'] as const

export function generateThemeScss(
  tokens: ThemeTokens,
  imports: ElementPlusThemeImports,
  availableVariables?: Iterable<string>,
): string {
  const entries = buildForwardEntries(tokens, availableVariables)

  return `@forward '${imports.varScss}' with (
${entries.map((entry) => indent(entry, 2)).join(',\n')}
);

@use '${imports.indexScss}' as *;
`
}

export function generateDarkCss(tokens: ThemeTokens): string {
  const vars: Record<string, string> = {
    '--el-bg-color': '#111827',
    '--el-bg-color-page': '#0f172a',
    '--el-bg-color-overlay': '#1f2937',
    '--el-text-color-primary': '#f8fafc',
    '--el-text-color-regular': '#e2e8f0',
    '--el-text-color-secondary': '#94a3b8',
    '--el-text-color-placeholder': '#64748b',
    '--el-border-color': '#334155',
    '--el-border-color-light': '#475569',
    '--el-border-color-lighter': '#1f2937',
    '--el-border-color-extra-light': '#1f2937',
    '--el-border-color-dark': '#64748b',
    '--el-border-color-darker': '#94a3b8',
    '--el-fill-color': '#1e293b',
    '--el-fill-color-blank': '#111827',
    '--el-fill-color-light': '#1f2937',
    '--el-fill-color-lighter': '#172033',
    '--el-fill-color-extra-light': '#111827',
    '--el-mask-color': 'rgba(15, 23, 42, 0.72)',
    '--el-border-radius-base': tokens.radius.base,
    '--el-border-radius-small': tokens.radius.small,
    '--el-border-radius-round': tokens.radius.round,
    '--el-border-radius-circle': tokens.radius.circle,
    '--el-font-size-extra-large': tokens.typography.extraLarge,
    '--el-font-size-large': tokens.typography.large,
    '--el-font-size-medium': tokens.typography.medium,
    '--el-font-size-base': tokens.typography.base,
    '--el-font-size-small': tokens.typography.small,
    '--el-font-size-extra-small': tokens.typography.extraSmall,
    '--el-component-size-large': tokens.componentSize.large,
    '--el-component-size': tokens.componentSize.default,
    '--el-component-size-small': tokens.componentSize.small,
  }

  for (const key of stateColorKeys) {
    Object.assign(vars, makeStateColorVars(key, tokens.colors[key], true))
  }

  return `.dark {\n${Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')}\n}\n`
}

export function generateCssOverrides(tokens: ThemeTokens, mode: 'light' | 'dark'): string {
  const chunks: string[] = []
  if (tokens.compatibility.vben) {
    chunks.push(generateVbenCompatCss(mode))
  }

  const css = tokens.cssOverrides[mode].trim()
  if (css) {
    chunks.push(`/* Component CSS overrides (${mode}) */\n${css}`)
  }

  return chunks.length > 0 ? `\n${chunks.join('\n\n')}\n` : ''
}

export function generatePreviewCssVars(tokens: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {
    '--el-border-radius-base': tokens.radius.base,
    '--el-border-radius-small': tokens.radius.small,
    '--el-border-radius-round': tokens.radius.round,
    '--el-border-radius-circle': tokens.radius.circle,
    '--el-text-color-primary': tokens.text.primary,
    '--el-text-color-regular': tokens.text.regular,
    '--el-text-color-secondary': tokens.text.secondary,
    '--el-text-color-placeholder': tokens.text.placeholder,
    '--el-text-color-disabled': tokens.text.disabled,
    '--el-border-color': tokens.border.base,
    '--el-border-color-light': tokens.border.light,
    '--el-border-color-lighter': tokens.border.lighter,
    '--el-border-color-extra-light': tokens.border.extraLight,
    '--el-border-color-dark': tokens.border.dark,
    '--el-border-color-darker': tokens.border.darker,
    '--el-border-width': tokens.border.width,
    '--el-border-style': tokens.border.style,
    '--el-border-color-hover': tokens.border.hover,
    '--el-fill-color': tokens.fill.base,
    '--el-fill-color-light': tokens.fill.light,
    '--el-fill-color-lighter': tokens.fill.lighter,
    '--el-fill-color-extra-light': tokens.fill.extraLight,
    '--el-fill-color-dark': tokens.fill.dark,
    '--el-fill-color-darker': tokens.fill.darker,
    '--el-fill-color-blank': tokens.fill.blank,
    '--el-bg-color-page': tokens.background.page,
    '--el-bg-color': tokens.background.base,
    '--el-bg-color-overlay': tokens.background.overlay,
    '--el-box-shadow': tokens.shadow.base,
    '--el-box-shadow-light': tokens.shadow.light,
    '--el-box-shadow-lighter': tokens.shadow.lighter,
    '--el-box-shadow-dark': tokens.shadow.dark,
    '--el-font-family': tokens.typography.fontFamily,
    '--el-font-size-extra-large': tokens.typography.extraLarge,
    '--el-font-size-large': tokens.typography.large,
    '--el-font-size-medium': tokens.typography.medium,
    '--el-font-size-base': tokens.typography.base,
    '--el-font-size-small': tokens.typography.small,
    '--el-font-size-extra-small': tokens.typography.extraSmall,
    '--el-component-size-large': tokens.componentSize.large,
    '--el-component-size': tokens.componentSize.default,
    '--el-component-size-small': tokens.componentSize.small,
    '--el-overlay-color': tokens.overlay.base,
    '--el-overlay-color-light': tokens.overlay.light,
    '--el-overlay-color-lighter': tokens.overlay.lighter,
    '--el-mask-color': tokens.mask.base,
    '--el-mask-color-extra-light': tokens.mask.extraLight,
  }

  for (const key of stateColorKeys) {
    Object.assign(vars, makeStateColorVars(key, tokens.colors[key], false))
  }

  return vars
}

function buildForwardEntries(tokens: ThemeTokens, availableVariables?: Iterable<string>): string[] {
  const available = availableVariables ? new Set(availableVariables) : undefined
  const generatedEntries: Record<string, string> = {
    colors: `(
  'white': ${tokens.colors.white},
  'black': ${tokens.colors.black},
${stateColorKeys.map((key) => `  '${key}': ('base': ${tokens.colors[key]}),`).join('\n')}
)`,
    'border-radius': `(
  'base': ${tokens.radius.base},
  'small': ${tokens.radius.small},
  'round': ${tokens.radius.round},
  'circle': ${tokens.radius.circle},
)`,
    'text-color': `(
  'primary': ${tokens.text.primary},
  'regular': ${tokens.text.regular},
  'secondary': ${tokens.text.secondary},
  'placeholder': ${tokens.text.placeholder},
  'disabled': ${tokens.text.disabled},
)`,
    'border-color': `(
  '': ${tokens.border.base},
  'light': ${tokens.border.light},
  'lighter': ${tokens.border.lighter},
  'extra-light': ${tokens.border.extraLight},
  'dark': ${tokens.border.dark},
  'darker': ${tokens.border.darker},
)`,
    'border-width': tokens.border.width,
    'border-style': tokens.border.style,
    'border-color-hover': tokens.border.hover,
    'fill-color': `(
  '': ${tokens.fill.base},
  'light': ${tokens.fill.light},
  'lighter': ${tokens.fill.lighter},
  'extra-light': ${tokens.fill.extraLight},
  'dark': ${tokens.fill.dark},
  'darker': ${tokens.fill.darker},
  'blank': ${tokens.fill.blank},
)`,
    'bg-color': `(
  '': ${tokens.background.base},
  'page': ${tokens.background.page},
  'overlay': ${tokens.background.overlay},
)`,
    'box-shadow': `(
  '': (${tokens.shadow.base}),
  'light': (${tokens.shadow.light}),
  'lighter': (${tokens.shadow.lighter}),
  'dark': (${tokens.shadow.dark}),
)`,
    'font-family': `(
  '': (${tokens.typography.fontFamily}),
)`,
    'font-size': `(
  'extra-large': ${tokens.typography.extraLarge},
  'large': ${tokens.typography.large},
  'medium': ${tokens.typography.medium},
  'base': ${tokens.typography.base},
  'small': ${tokens.typography.small},
  'extra-small': ${tokens.typography.extraSmall},
)`,
    'common-component-size': `(
  'large': ${tokens.componentSize.large},
  'default': ${tokens.componentSize.default},
  'small': ${tokens.componentSize.small},
)`,
    'overlay-color': `(
  '': ${tokens.overlay.base},
  'light': ${tokens.overlay.light},
  'lighter': ${tokens.overlay.lighter},
)`,
    'mask-color': `(
  '': ${tokens.mask.base},
  'extra-light': ${tokens.mask.extraLight},
)`,
    sm: tokens.breakpoints.sm,
    md: tokens.breakpoints.md,
    lg: tokens.breakpoints.lg,
    xl: tokens.breakpoints.xl,
  }
  const configured = new Set<string>()
  const entries: string[] = []

  for (const [name, generatedValue] of Object.entries(generatedEntries)) {
    if (available && !available.has(name)) continue
    const override = tokens.scssOverrides[name]?.trim()
    entries.push(`$${name}: ${override || generatedValue}`)
    configured.add(name)
  }

  for (const [name, rawValue] of Object.entries(tokens.scssOverrides)) {
    const value = rawValue.trim()
    if (!value || configured.has(name)) continue
    if (available && !available.has(name)) continue
    entries.push(`$${name}: ${value}`)
  }

  return entries
}

function indent(value: string, spaces: number): string {
  const prefix = ' '.repeat(spaces)
  return value
    .split('\n')
    .map((line) => `${prefix}${line}`)
    .join('\n')
}

function makeStateColorVars(name: string, hex: string, dark: boolean): Record<string, string> {
  const lightTarget = dark ? '#141414' : '#ffffff'
  const darkTarget = dark ? '#ffffff' : '#000000'
  return {
    [`--el-color-${name}`]: hex,
    [`--el-color-${name}-light-3`]: mix(hex, lightTarget, 0.3),
    [`--el-color-${name}-light-5`]: mix(hex, lightTarget, 0.5),
    [`--el-color-${name}-light-7`]: mix(hex, lightTarget, 0.7),
    [`--el-color-${name}-light-8`]: mix(hex, lightTarget, 0.8),
    [`--el-color-${name}-light-9`]: mix(hex, lightTarget, 0.9),
    [`--el-color-${name}-dark-2`]: mix(hex, darkTarget, 0.2),
  }
}

function mix(hex: string, target: string, weight: number): string {
  const sourceRgb = hexToRgb(hex)
  const targetRgb = hexToRgb(target)
  const rgb = sourceRgb.map((channel, index) =>
    Math.round(channel * (1 - weight) + targetRgb[index] * weight),
  )
  return rgbToHex(rgb[0], rgb[1], rgb[2])
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized =
    hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex
  const value = Number.parseInt(normalized.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function rgbToHex(red: number, green: number, blue: number): string {
  return `#${[red, green, blue]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')}`
}
