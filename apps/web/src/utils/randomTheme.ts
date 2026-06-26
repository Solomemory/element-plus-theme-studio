import {
  cloneThemeTokens,
  DEFAULT_TOKENS,
  type ThemeTokens,
} from '../../../../packages/theme-builder/src/tokens'

const adjectives = [
  'Aurora',
  'Cobalt',
  'Coral',
  'Harbor',
  'Iris',
  'Jade',
  'Lumen',
  'Nova',
  'Orchid',
  'Quartz',
  'Signal',
  'Vertex',
]

const nouns = [
  'Atlas',
  'Console',
  'Flow',
  'Matrix',
  'Pulse',
  'Studio',
  'System',
  'Theme',
]

const radiusPairs = [
  { base: '4px', small: '2px' },
  { base: '6px', small: '4px' },
  { base: '8px', small: '5px' },
  { base: '10px', small: '6px' },
]

export function createRandomThemeTokens(elementPlusVersion = 'latest'): ThemeTokens {
  const tokens = cloneThemeTokens(DEFAULT_TOKENS)
  const hue = randomInt(0, 359)
  const surfaceHue = rotateHue(hue, randomInt(-12, 12))
  const seed = randomId()
  const name = `${pick(adjectives)} ${pick(nouns)}`
  const radius = pick(radiusPairs)

  tokens.name = `${name} ${seed.toUpperCase()}`
  tokens.packageName = `@local/element-plus-theme-random-${seed}`
  tokens.elementPlusVersion = elementPlusVersion
  tokens.colors = {
    white: '#ffffff',
    black: '#020617',
    primary: hslToHex(hue, randomInt(58, 76), randomInt(42, 50)),
    success: hslToHex(randomInt(138, 158), randomInt(52, 68), randomInt(38, 46)),
    warning: hslToHex(randomInt(34, 44), randomInt(82, 92), randomInt(45, 53)),
    danger: hslToHex(randomInt(348, 358), randomInt(72, 84), randomInt(48, 56)),
    error: '',
    info: hslToHex(rotateHue(surfaceHue, randomInt(-18, 18)), randomInt(10, 18), randomInt(40, 48)),
  }
  tokens.colors.error = tokens.colors.danger

  tokens.radius = {
    base: radius.base,
    small: radius.small,
    round: '9999px',
    circle: '100%',
  }
  tokens.text = {
    primary: hslToHex(surfaceHue, randomInt(24, 34), randomInt(12, 18)),
    regular: hslToHex(surfaceHue, randomInt(18, 28), randomInt(25, 32)),
    secondary: hslToHex(surfaceHue, randomInt(12, 22), randomInt(43, 50)),
    placeholder: hslToHex(surfaceHue, randomInt(10, 18), randomInt(62, 70)),
    disabled: hslToHex(surfaceHue, randomInt(10, 18), randomInt(76, 82)),
  }
  tokens.border = {
    base: hslToHex(surfaceHue, randomInt(22, 32), randomInt(82, 88)),
    light: hslToHex(surfaceHue, randomInt(24, 34), randomInt(88, 92)),
    lighter: hslToHex(surfaceHue, randomInt(26, 36), randomInt(93, 96)),
    extraLight: hslToHex(surfaceHue, randomInt(28, 38), randomInt(96, 98)),
    dark: hslToHex(surfaceHue, randomInt(18, 28), randomInt(74, 80)),
    darker: hslToHex(surfaceHue, randomInt(16, 26), randomInt(60, 68)),
    width: '1px',
    style: 'solid',
    hover: tokens.colors.primary,
  }
  tokens.fill = {
    base: hslToHex(surfaceHue, randomInt(34, 46), randomInt(93, 96)),
    light: hslToHex(surfaceHue, randomInt(36, 48), randomInt(96, 98)),
    lighter: hslToHex(surfaceHue, randomInt(38, 50), randomInt(98, 99)),
    extraLight: '#ffffff',
    dark: hslToHex(surfaceHue, randomInt(28, 40), randomInt(88, 92)),
    darker: hslToHex(surfaceHue, randomInt(24, 36), randomInt(82, 88)),
    blank: '#ffffff',
  }
  tokens.background = {
    page: hslToHex(surfaceHue, randomInt(34, 46), randomInt(95, 98)),
    base: '#ffffff',
    overlay: '#ffffff',
  }
  tokens.shadow = {
    base: shadowFor(hue, 0.07, 0.08),
    light: `0 0 12px ${hsla(hue, 42, 32, 0.1)}`,
    lighter: `0 0 6px ${hsla(hue, 42, 32, 0.1)}`,
    dark: `0 16px 48px 16px ${hsla(hue, 42, 28, 0.1)}, 0 12px 32px rgba(15, 23, 42, 0.12)`,
  }
  tokens.overlay = {
    base: 'rgba(15, 23, 42, 0.78)',
    light: 'rgba(15, 23, 42, 0.64)',
    lighter: 'rgba(15, 23, 42, 0.44)',
  }
  tokens.mask = {
    base: 'rgba(255, 255, 255, 0.90)',
    extraLight: 'rgba(255, 255, 255, 0.30)',
  }
  tokens.cssOverrides = {
    light: '',
    dark: '',
  }
  tokens.compatibility = {
    vben: false,
  }

  return tokens
}

function shadowFor(hue: number, tintAlpha: number, neutralAlpha: number): string {
  return `0 12px 32px 4px ${hsla(hue, 42, 30, tintAlpha)}, 0 8px 20px rgba(15, 23, 42, ${neutralAlpha})`
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 7)
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function rotateHue(hue: number, amount: number): number {
  return (hue + amount + 360) % 360
}

function pick<T>(items: T[]): T {
  return items[randomInt(0, items.length - 1)]
}

function hslToHex(hue: number, saturation: number, lightness: number): string {
  const [red, green, blue] = hslToRgb(hue, saturation, lightness)
  return `#${[red, green, blue].map((value) => value.toString(16).padStart(2, '0')).join('')}`
}

function hsla(hue: number, saturation: number, lightness: number, alpha: number): string {
  const [red, green, blue] = hslToRgb(hue, saturation, lightness)
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

function hslToRgb(hue: number, saturation: number, lightness: number): [number, number, number] {
  const normalizedHue = ((hue % 360) + 360) % 360
  const s = saturation / 100
  const l = lightness / 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((normalizedHue / 60) % 2) - 1))
  const m = l - c / 2
  const [red, green, blue] =
    normalizedHue < 60
      ? [c, x, 0]
      : normalizedHue < 120
        ? [x, c, 0]
        : normalizedHue < 180
          ? [0, c, x]
          : normalizedHue < 240
            ? [0, x, c]
            : normalizedHue < 300
              ? [x, 0, c]
              : [c, 0, x]

  return [
    Math.round((red + m) * 255),
    Math.round((green + m) * 255),
    Math.round((blue + m) * 255),
  ]
}
