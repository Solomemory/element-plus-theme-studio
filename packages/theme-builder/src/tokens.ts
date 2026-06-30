import { createEmptyScssOverrides } from './tokenCatalog.js'

export const THEME_DENSITIES = ['compact', 'default', 'comfortable', 'large'] as const

export type ThemeDensity = (typeof THEME_DENSITIES)[number]

export interface ThemeTokens {
  name: string
  packageName: string
  elementPlusVersion: string
  density: ThemeDensity
  colors: {
    white: string
    black: string
    primary: string
    success: string
    warning: string
    danger: string
    error: string
    info: string
  }
  radius: {
    base: string
    small: string
    round: string
    circle: string
  }
  text: {
    primary: string
    regular: string
    secondary: string
    placeholder: string
    disabled: string
  }
  border: {
    base: string
    light: string
    lighter: string
    extraLight: string
    dark: string
    darker: string
    width: string
    style: string
    hover: string
  }
  fill: {
    base: string
    light: string
    lighter: string
    extraLight: string
    dark: string
    darker: string
    blank: string
  }
  background: {
    page: string
    base: string
    overlay: string
  }
  shadow: {
    base: string
    light: string
    lighter: string
    dark: string
  }
  typography: {
    htmlFontSize: string
    fontFamily: string
    extraLarge: string
    large: string
    medium: string
    base: string
    small: string
    extraSmall: string
  }
  componentSize: {
    large: string
    default: string
    small: string
  }
  overlay: {
    base: string
    light: string
    lighter: string
  }
  mask: {
    base: string
    extraLight: string
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  scssOverrides: Record<string, string>
  cssOverrides: {
    light: string
    dark: string
  }
  compatibility: {
    vben: boolean
  }
}

export interface TokenIssue {
  path: string
  message: string
}

export const DEFAULT_TOKENS: ThemeTokens = {
  name: 'Aura Blue',
  packageName: '@local/element-plus-theme-aura-blue',
  elementPlusVersion: 'latest',
  density: 'default',
  colors: {
    white: '#ffffff',
    black: '#000000',
    primary: '#2563eb',
    success: '#16a34a',
    warning: '#d97706',
    danger: '#dc2626',
    error: '#dc2626',
    info: '#64748b',
  },
  radius: {
    base: '6px',
    small: '4px',
    round: '9999px',
    circle: '100%',
  },
  text: {
    primary: '#111827',
    regular: '#374151',
    secondary: '#6b7280',
    placeholder: '#9ca3af',
    disabled: '#cbd5e1',
  },
  border: {
    base: '#d1d5db',
    light: '#e5e7eb',
    lighter: '#f3f4f6',
    extraLight: '#f8fafc',
    dark: '#cbd5e1',
    darker: '#94a3b8',
    width: '1px',
    style: 'solid',
    hover: '#94a3b8',
  },
  fill: {
    base: '#f1f5f9',
    light: '#f8fafc',
    lighter: '#fbfdff',
    extraLight: '#ffffff',
    dark: '#e2e8f0',
    darker: '#cbd5e1',
    blank: '#ffffff',
  },
  background: {
    page: '#f8fafc',
    base: '#ffffff',
    overlay: '#ffffff',
  },
  shadow: {
    base: '0 12px 32px 4px rgba(15, 23, 42, 0.06), 0 8px 20px rgba(15, 23, 42, 0.08)',
    light: '0 0 12px rgba(15, 23, 42, 0.10)',
    lighter: '0 0 6px rgba(15, 23, 42, 0.10)',
    dark: '0 16px 48px 16px rgba(15, 23, 42, 0.08), 0 12px 32px rgba(15, 23, 42, 0.12)',
  },
  typography: {
    htmlFontSize: '16px',
    fontFamily:
      "'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
    extraLarge: '20px',
    large: '18px',
    medium: '16px',
    base: '14px',
    small: '13px',
    extraSmall: '12px',
  },
  componentSize: {
    large: '40px',
    default: '32px',
    small: '24px',
  },
  overlay: {
    base: 'rgba(15, 23, 42, 0.80)',
    light: 'rgba(15, 23, 42, 0.70)',
    lighter: 'rgba(15, 23, 42, 0.50)',
  },
  mask: {
    base: 'rgba(255, 255, 255, 0.90)',
    extraLight: 'rgba(255, 255, 255, 0.30)',
  },
  breakpoints: {
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1920px',
  },
  scssOverrides: createEmptyScssOverrides(),
  cssOverrides: {
    light: '',
    dark: '',
  },
  compatibility: {
    vben: false,
  },
}

const colorSections = ['colors', 'text', 'border', 'fill', 'background'] as const
const colorLikeKeys = new Set(['base', 'light', 'lighter', 'extraLight', 'dark', 'darker', 'blank', 'page', 'overlay', 'hover'])
const radiusKeys = ['base', 'small', 'round', 'circle'] as const
const lengthSections = ['radius', 'typography', 'componentSize', 'breakpoints'] as const
const rootStringKeys = ['name', 'packageName', 'elementPlusVersion'] as const

export const DENSITY_TOKEN_PRESETS: Record<
  ThemeDensity,
  {
    htmlFontSize: string
    typography: Omit<ThemeTokens['typography'], 'fontFamily' | 'htmlFontSize'>
    componentSize: ThemeTokens['componentSize']
  }
> = {
  compact: {
    htmlFontSize: '15px',
    typography: {
      extraLarge: '18px',
      large: '16px',
      medium: '15px',
      base: '13px',
      small: '12px',
      extraSmall: '11px',
    },
    componentSize: {
      large: '38px',
      default: '30px',
      small: '22px',
    },
  },
  default: {
    htmlFontSize: '16px',
    typography: {
      extraLarge: '20px',
      large: '18px',
      medium: '16px',
      base: '14px',
      small: '13px',
      extraSmall: '12px',
    },
    componentSize: {
      large: '40px',
      default: '32px',
      small: '24px',
    },
  },
  comfortable: {
    htmlFontSize: '17px',
    typography: {
      extraLarge: '21px',
      large: '19px',
      medium: '17px',
      base: '15px',
      small: '14px',
      extraSmall: '13px',
    },
    componentSize: {
      large: '42px',
      default: '34px',
      small: '26px',
    },
  },
  large: {
    htmlFontSize: '18px',
    typography: {
      extraLarge: '22px',
      large: '20px',
      medium: '18px',
      base: '16px',
      small: '15px',
      extraSmall: '14px',
    },
    componentSize: {
      large: '44px',
      default: '36px',
      small: '28px',
    },
  },
}

export class ThemeValidationError extends Error {
  constructor(public readonly issues: TokenIssue[]) {
    super(issues.map((issue) => `${issue.path}: ${issue.message}`).join('\n'))
    this.name = 'ThemeValidationError'
  }
}

export function cloneThemeTokens(tokens: ThemeTokens = DEFAULT_TOKENS): ThemeTokens {
  return JSON.parse(JSON.stringify(tokens)) as ThemeTokens
}

export function isHexColor(value: string): boolean {
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
}

export function isCssLength(value: string): boolean {
  return /^(?:0|[0-9]+(?:\.[0-9]+)?(?:px|rem|em|%)|9999px)$/.test(value)
}

export function isThemeDensity(value: unknown): value is ThemeDensity {
  return typeof value === 'string' && (THEME_DENSITIES as readonly string[]).includes(value)
}

export function isValidPackageName(value: string): boolean {
  if (value.length < 2 || value.length > 214) return false
  if (value !== value.toLowerCase()) return false
  if (value.includes(' ') || value.includes('..')) return false
  return /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/.test(value)
}

export function slugifyPackageName(packageName: string): string {
  return packageName
    .replace(/^@/, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function mergeThemeTokens(input: unknown): ThemeTokens {
  const merged = cloneThemeTokens()
  if (!isRecord(input)) return merged

  if (isThemeDensity(input.density)) {
    assignDensityTokens(merged, input.density)
  }

  for (const key of rootStringKeys) {
    if (typeof input[key] === 'string') {
      merged[key] = input[key]
    }
  }

  for (const section of colorSections) {
    const source = input[section]
    if (!isRecord(source)) continue
    for (const key of Object.keys(merged[section]) as Array<keyof ThemeTokens[typeof section]>) {
      if (typeof source[key] === 'string') {
        ;(merged[section] as Record<string, string>)[key] = source[key]
      }
    }
  }

  for (const section of lengthSections) {
    const source = input[section]
    if (!isRecord(source)) continue
    for (const key of Object.keys(merged[section]) as Array<keyof ThemeTokens[typeof section]>) {
      if (typeof source[key] === 'string') {
        ;(merged[section] as Record<string, string>)[key] = source[key]
      }
    }
  }

  for (const section of ['shadow', 'overlay', 'mask'] as const) {
    const source = input[section]
    if (!isRecord(source)) continue
    for (const key of Object.keys(merged[section]) as Array<keyof ThemeTokens[typeof section]>) {
      if (typeof source[key] === 'string') {
        ;(merged[section] as Record<string, string>)[key] = source[key]
      }
    }
  }

  if (isRecord(input.border)) {
    for (const key of ['width', 'style'] as const) {
      if (typeof input.border[key] === 'string') {
        merged.border[key] = input.border[key]
      }
    }
  }

  if (isRecord(input.scssOverrides)) {
    for (const [name, value] of Object.entries(input.scssOverrides)) {
      if (isSassVariableName(name) && typeof value === 'string') {
        merged.scssOverrides[name] = value
      }
    }
  }

  if (isRecord(input.cssOverrides)) {
    for (const key of ['light', 'dark'] as const) {
      if (typeof input.cssOverrides[key] === 'string') {
        merged.cssOverrides[key] = input.cssOverrides[key]
      }
    }
  }

  if (isRecord(input.compatibility) && typeof input.compatibility.vben === 'boolean') {
    merged.compatibility.vben = input.compatibility.vben
  }

  return merged
}

export function assignDensityTokens(tokens: ThemeTokens, density: ThemeDensity): void {
  const preset = DENSITY_TOKEN_PRESETS[density]
  tokens.density = density
  tokens.typography.htmlFontSize = preset.htmlFontSize
  Object.assign(tokens.typography, preset.typography)
  Object.assign(tokens.componentSize, preset.componentSize)
}

export function applyThemeDensity(tokens: ThemeTokens, density: ThemeDensity): ThemeTokens {
  const next = cloneThemeTokens(tokens)
  assignDensityTokens(next, density)
  return next
}

export function validateThemeTokens(tokens: ThemeTokens): TokenIssue[] {
  const issues: TokenIssue[] = []

  if (!isThemeDensity(tokens.density)) {
    issues.push({ path: 'density', message: 'Use compact, default, comfortable, or large.' })
  }

  if (!tokens.name.trim()) {
    issues.push({ path: 'name', message: 'Theme name is required.' })
  } else if (tokens.name.trim().length > 80) {
    issues.push({ path: 'name', message: 'Theme name must be 80 characters or fewer.' })
  }

  if (!isValidPackageName(tokens.packageName)) {
    issues.push({
      path: 'packageName',
      message: 'Use a valid lowercase npm package name, e.g. @scope/element-plus-theme-blue.',
    })
  }

  if (!/^(?:installed|latest|[0-9]+(?:\.[0-9]+){0,2}(?:[-+][a-zA-Z0-9.-]+)?|[\^~><=]+[0-9].*)$/.test(tokens.elementPlusVersion)) {
    issues.push({
      path: 'elementPlusVersion',
      message: 'Use latest, installed, or a valid Element Plus version like 2.14.2.',
    })
  }

  for (const section of colorSections) {
    for (const [key, value] of Object.entries(tokens[section])) {
      if (section === 'border' && (key === 'width' || key === 'style')) continue
      if (section === 'background' && key === 'overlay') {
        if (!isHexColor(value)) {
          issues.push({ path: `${section}.${key}`, message: 'Use a hex color like #ffffff.' })
        }
        continue
      }
      if (colorLikeKeys.has(key) && !isHexColor(value)) {
        issues.push({ path: `${section}.${key}`, message: 'Use a hex color like #2563eb.' })
      }
    }
  }

  for (const section of lengthSections) {
    for (const [key, value] of Object.entries(tokens[section])) {
      if (section === 'typography' && key === 'fontFamily') continue
      if (section === 'radius' && key === 'circle' && value === '100%') continue
      if (!isCssLength(value)) {
        issues.push({ path: `${section}.${key}`, message: 'Use a CSS length like 6px, 0.5rem, or 9999px.' })
      }
    }
  }

  if (!isCssLength(tokens.border.width)) {
    issues.push({ path: 'border.width', message: 'Use a CSS length like 1px.' })
  }

  if (!/^[a-z-]+$/.test(tokens.border.style)) {
    issues.push({ path: 'border.style', message: 'Use a border style like solid, dashed, or dotted.' })
  }

  for (const [name, value] of Object.entries(tokens.scssOverrides)) {
    if (!isSassVariableName(name)) {
      issues.push({ path: `scssOverrides.${name}`, message: 'Use a valid Sass variable name.' })
    } else if (value.trim() === '$') {
      issues.push({ path: `scssOverrides.${name}`, message: 'Enter a valid Sass expression or leave it blank.' })
    }
  }

  for (const [name, value] of Object.entries(tokens.cssOverrides)) {
    if (value.length > 200000) {
      issues.push({ path: `cssOverrides.${name}`, message: 'Keep CSS overrides under 200,000 characters.' })
    }
  }

  return issues
}

export function assertValidThemeTokens(tokens: ThemeTokens): void {
  const issues = validateThemeTokens(tokens)
  if (issues.length > 0) {
    throw new ThemeValidationError(issues)
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isSassVariableName(value: string): boolean {
  return /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(value)
}
