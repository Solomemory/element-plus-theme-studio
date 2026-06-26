import type { ThemeTokens } from '../../../../packages/theme-builder/src/tokens'
import { generatePreviewVbenCompatCss } from './vbenCompatCss'

const stateColorKeys = ['primary', 'success', 'warning', 'danger', 'error', 'info'] as const

export function applyElementCssVars(tokens: ThemeTokens): void {
  const style = ensureStyleElement()
  style.textContent = `:root {\n${formatVars(buildCssVars(tokens))}\n}\n\n.dark {\n${formatVars(
    buildDarkCssVars(tokens),
  )}\n}\n${formatCssOverrides(tokens)}`
}

export function buildCssVars(tokens: ThemeTokens): Record<string, string> {
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
    Object.assign(vars, colorVars(key, tokens.colors[key]))
  }

  return vars
}

export function buildDarkCssVars(tokens: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {
    '--el-bg-color': '#111827',
    '--el-bg-color-page': '#0f172a',
    '--el-bg-color-overlay': '#1f2937',
    '--el-text-color-primary': '#f8fafc',
    '--el-text-color-regular': '#e2e8f0',
    '--el-text-color-secondary': '#94a3b8',
    '--el-text-color-placeholder': '#64748b',
    '--el-text-color-disabled': '#475569',
    '--el-border-color': '#334155',
    '--el-border-color-light': '#475569',
    '--el-border-color-lighter': '#1f2937',
    '--el-border-color-extra-light': '#172033',
    '--el-border-color-dark': '#64748b',
    '--el-border-color-darker': '#94a3b8',
    '--el-fill-color': '#1e293b',
    '--el-fill-color-light': '#1f2937',
    '--el-fill-color-lighter': '#172033',
    '--el-fill-color-extra-light': '#111827',
    '--el-fill-color-dark': '#334155',
    '--el-fill-color-darker': '#475569',
    '--el-fill-color-blank': '#111827',
    '--el-box-shadow': '0 12px 32px 4px rgba(0, 0, 0, 0.36)',
    '--el-box-shadow-light': '0 0 12px rgba(0, 0, 0, 0.36)',
    '--el-box-shadow-lighter': '0 0 6px rgba(0, 0, 0, 0.28)',
    '--el-box-shadow-dark': '0 16px 48px 16px rgba(0, 0, 0, 0.40)',
    '--el-border-radius-base': tokens.radius.base,
    '--el-border-radius-small': tokens.radius.small,
    '--el-border-radius-round': tokens.radius.round,
    '--el-border-radius-circle': tokens.radius.circle,
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
    '--el-overlay-color': 'rgba(0, 0, 0, 0.82)',
    '--el-overlay-color-light': 'rgba(0, 0, 0, 0.72)',
    '--el-overlay-color-lighter': 'rgba(0, 0, 0, 0.56)',
    '--el-mask-color': 'rgba(15, 23, 42, 0.72)',
    '--el-mask-color-extra-light': 'rgba(15, 23, 42, 0.28)',
  }

  for (const key of stateColorKeys) {
    Object.assign(vars, colorVars(key, tokens.colors[key], true))
  }

  return vars
}

function colorVars(name: string, hex: string, dark = false): Record<string, string> {
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

function ensureStyleElement(): HTMLStyleElement {
  const existing = document.getElementById('theme-studio-css-vars')
  if (existing instanceof HTMLStyleElement) return existing
  const style = document.createElement('style')
  style.id = 'theme-studio-css-vars'
  document.head.append(style)
  return style
}

function formatVars(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
}

function formatCssOverrides(tokens: ThemeTokens): string {
  const compatCss = tokens.compatibility.vben
    ? `\n${generatePreviewVbenCompatCss('light')}\n\n${generatePreviewVbenCompatCss('dark')}`
    : ''
  const lightCss = tokens.cssOverrides.light.trim()
  const darkCss = tokens.cssOverrides.dark.trim()
  return [
    compatCss,
    lightCss ? `\n/* Component CSS overrides (light) */\n${lightCss}` : '',
    darkCss ? `\n/* Component CSS overrides (dark) */\n${darkCss}` : '',
  ].join('\n')
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
  if (!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) {
    return [64, 158, 255]
  }

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
