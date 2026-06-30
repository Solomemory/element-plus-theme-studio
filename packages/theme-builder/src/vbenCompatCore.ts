import { TinyColor } from '@ctrl/tinycolor'
import { getColors } from 'theme-colors'

const vbenThemeColors = {
  primary: 'hsl(212 100% 45%)',
  destructive: 'hsl(348 100% 61%)',
  success: 'hsl(144 57% 58%)',
  warning: 'hsl(42 84% 61%)',
} as const

interface ColorItem {
  alias?: string
  color: string
  name: string
}

export function generateVbenPaletteCss(): string {
  const variables = generatorColorVariables([
    { color: vbenThemeColors.primary, name: 'primary' },
    { alias: 'warning', color: vbenThemeColors.warning, name: 'yellow' },
    { alias: 'success', color: vbenThemeColors.success, name: 'green' },
    { alias: 'destructive', color: vbenThemeColors.destructive, name: 'red' },
  ])

  for (const [source, target] of Object.entries({
    '--primary-500': '--primary',
    '--red-500': '--destructive',
    '--green-500': '--success',
    '--yellow-500': '--warning',
  })) {
    if (variables[source]) {
      variables[target] = variables[source]
    }
  }

  return `:root {\n${formatVars(variables)}\n}\n`
}

export function generateVbenElementPlusVars(mode: 'light' | 'dark'): string {
  const dark = mode === 'dark'
  const selector = dark ? '.dark, .dark[data-theme="default"]' : ':root, .light, .light[data-theme="default"]'
  const vars: Record<string, string> = {
    '--el-bg-color': 'hsl(var(--background))',
    '--el-bg-color-overlay': 'hsl(var(--popover))',
    '--el-bg-color-page': 'hsl(var(--background-deep))',
    '--el-border-color': 'hsl(var(--border))',
    '--el-border-color-dark': 'hsl(var(--border))',
    '--el-border-color-extra-light': 'hsl(var(--border))',
    '--el-border-color-hover': 'hsl(var(--accent))',
    '--el-border-color-light': 'hsl(var(--border))',
    '--el-border-color-lighter': 'hsl(var(--border))',
    '--el-border-radius-base': 'var(--radius)',
    '--el-border-radius-small': 'calc(var(--radius) - 2px)',
    '--el-border-radius-round': '9999px',
    '--el-color-info': 'hsl(var(--info-foreground))',
    '--el-color-info-light-3': 'hsl(var(--muted-foreground))',
    '--el-color-info-light-5': 'hsl(var(--border))',
    '--el-color-info-light-7': 'hsl(var(--border))',
    '--el-color-info-light-8': 'hsl(var(--border))',
    '--el-color-info-light-9': 'hsl(var(--info))',
    '--el-color-info-dark-2': 'hsl(var(--foreground))',
    '--el-fill-color': 'hsl(var(--accent))',
    '--el-fill-color-blank': 'hsl(var(--background))',
    '--el-fill-color-dark': 'hsl(var(--accent-dark))',
    '--el-fill-color-darker': 'hsl(var(--accent-darker))',
    '--el-fill-color-extra-light': 'hsl(var(--accent-lighter))',
    '--el-fill-color-light': 'hsl(var(--accent))',
    '--el-fill-color-lighter': 'hsl(var(--accent-lighter))',
    '--el-mask-color': dark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    '--el-mask-color-extra-light': dark ? 'rgba(0, 0, 0, 0.32)' : 'rgba(255, 255, 255, 0.3)',
    '--el-overlay-color': 'hsl(var(--overlay))',
    '--el-overlay-color-light': dark ? 'rgba(0, 0, 0, 0.56)' : 'rgba(0, 0, 0, 0.35)',
    '--el-overlay-color-lighter': dark ? 'rgba(0, 0, 0, 0.40)' : 'rgba(0, 0, 0, 0.20)',
    '--el-text-color-disabled': 'hsl(var(--muted-foreground))',
    '--el-text-color-placeholder': 'hsl(var(--input-placeholder))',
    '--el-text-color-primary': 'hsl(var(--foreground))',
    '--el-text-color-regular': 'hsl(var(--foreground))',
    '--el-text-color-secondary': 'hsl(var(--muted-foreground))',
    '--el-box-shadow': '0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%)',
    '--el-box-shadow-light': '0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 10%)',
    '--el-box-shadow-lighter': '0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px -1px rgb(0 0 0 / 10%)',
    '--el-box-shadow-dark': '0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%)',
    '--el-font-family': 'var(--font-family)',
    '--el-font-size-base': 'var(--font-size-base)',
    '--el-index-popper': 'var(--popup-z-index)',
  }

  Object.assign(vars, stateColorVars('primary', 'primary', dark))
  Object.assign(vars, stateColorVars('success', 'success', dark))
  Object.assign(vars, stateColorVars('warning', 'warning', dark))
  Object.assign(vars, stateColorVars('danger', 'destructive', dark))
  Object.assign(vars, stateColorVars('error', 'destructive', dark))

  return `${selector} {\n${formatVars(vars)}\n}\n`
}

export function generateVbenGlobalCompatCss(): string {
  return `
/* Vben Tailwind base styles expanded for standalone theme usage. */
*,
::after,
::before {
  box-sizing: border-box;
  border-color: hsl(var(--border));
  border-style: solid;
  border-width: 0;
  outline-color: hsl(var(--ring) / 0.5);
}

html {
  min-height: 100%;
  color: hsl(var(--foreground));
  background: hsl(var(--background));
  font-family: var(--font-family);
  font-size: var(--font-size-base, 16px);
  font-synthesis-weight: none;
  font-variation-settings: normal;
  line-height: 1.15;
  scroll-behavior: smooth;
  text-rendering: optimizelegibility;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}

body,
#app {
  width: 100%;
  min-height: 100%;
}

body {
  margin: 0;
  background: hsl(var(--background-deep));
}

a,
a:active,
a:hover,
a:link,
a:visited {
  color: inherit;
  text-decoration: none;
}

input::placeholder,
textarea::placeholder {
  opacity: 1;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  margin: 0;
  appearance: none;
}

html:not([data-platform='macOs']) ::-webkit-scrollbar {
  width: 0.625rem;
  height: 0.625rem;
}

html:not([data-platform='macOs']) ::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border: none;
  border-radius: calc(var(--radius) - 4px);
}

html:not([data-platform='macOs']) ::-webkit-scrollbar-track {
  background: transparent;
  border: none;
  border-radius: calc(var(--radius) - 4px);
  box-shadow: none;
}

html:not([data-platform='macOs']) ::-webkit-scrollbar-button {
  display: none;
}

button:not(:disabled),
[role='button']:not(:disabled) {
  cursor: pointer;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-col-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.outline-box {
  position: relative;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: calc(var(--radius) - 2px);
  outline: 1px solid hsl(var(--border));
}

.outline-box::after {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 20;
  width: 1px;
  height: 0;
  padding: 0;
  content: "";
  border-radius: calc(var(--radius) - 4px);
  opacity: 0;
  outline: 2px solid transparent;
  transition: all 0.3s;
}

.outline-box.outline-box-active {
  outline: 2px solid hsl(var(--primary));
}

.outline-box.outline-box-active::after {
  display: none;
}

.outline-box:not(.outline-box-active):hover::after {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0.25rem;
  opacity: 1;
  outline-color: hsl(var(--primary));
}

.vben-link {
  color: hsl(var(--primary-500));
  cursor: pointer;
}

.vben-link:hover {
  color: hsl(var(--primary-600));
}

.vben-link:active {
  color: hsl(var(--primary-700));
}

.card-box {
  color: hsl(var(--card-foreground));
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: calc(var(--radius) + 4px);
}

#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1031;
  width: 100%;
  height: 0.125rem;
  background: hsl(var(--primary));
}

#nprogress .peg {
  position: absolute;
  right: 0;
  display: block;
  width: 6.25rem;
  height: 100%;
  box-shadow:
    0 0 10px hsl(var(--primary)),
    0 0 5px hsl(var(--primary));
  opacity: 1;
  transform: rotate(3deg) translate(0, -4px);
}

#nprogress .spinner {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1031;
  display: block;
}

#nprogress .spinner-icon {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top-color: hsl(var(--primary));
  border-left-color: hsl(var(--primary));
  border-radius: 9999px;
  animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
  position: relative;
  overflow: hidden;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@keyframes nprogress-spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes enter-x-animation {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes enter-y-animation {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.enter-x:nth-child(1),
.-enter-x:nth-child(1),
.enter-y:nth-child(1),
.-enter-y:nth-child(1) {
  animation-delay: 0.1s;
}

.enter-x:nth-child(2),
.-enter-x:nth-child(2),
.enter-y:nth-child(2),
.-enter-y:nth-child(2) {
  animation-delay: 0.2s;
}

.enter-x:nth-child(3),
.-enter-x:nth-child(3),
.enter-y:nth-child(3),
.-enter-y:nth-child(3) {
  animation-delay: 0.3s;
}

.enter-x:nth-child(4),
.-enter-x:nth-child(4),
.enter-y:nth-child(4),
.-enter-y:nth-child(4) {
  animation-delay: 0.4s;
}

.enter-x:nth-child(5),
.-enter-x:nth-child(5),
.enter-y:nth-child(5),
.-enter-y:nth-child(5) {
  animation-delay: 0.5s;
}

.enter-x,
.-enter-x {
  opacity: 0;
  animation: enter-x-animation 0.3s ease-in-out forwards;
}

.enter-x {
  transform: translateX(50px);
}

.-enter-x {
  transform: translateX(-50px);
}

.enter-y,
.-enter-y {
  opacity: 0;
  animation: enter-y-animation 0.3s ease-in-out forwards;
}

.enter-y {
  transform: translateY(50px);
}

.-enter-y {
  transform: translateY(-50px);
}

html.invert-mode {
  filter: invert(1);
}

html.grayscale-mode {
  filter: grayscale(1);
}
`
}

export function generateVbenElementPlusStructuralCss(mode: 'light' | 'dark'): string {
  const dark = mode === 'dark'
  if (dark) {
    return `
/* Vben popup-ui visual bridge for Element Plus dialog-like components. */
.dark .el-overlay {
  background-color: hsl(var(--overlay));
}

.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 55%);
}
`
  }

  return `
/* Vben Element Plus adapter styles from packages/styles/src/ele/index.css. */
.el-card {
  --el-card-border-radius: var(--radius) !important;
}

.form-valid-error .el-select .el-select__wrapper,
.form-valid-error .el-input .el-input__wrapper {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}

.form-valid-error .el-radio .el-radio__inner,
.form-valid-error .el-checkbox .el-checkbox__inner,
.form-valid-error .el-checkbox-button .el-checkbox-button__inner,
.form-valid-error .el-radio-button .el-radio-button__inner {
  border: 1px solid var(--el-color-danger);
}

.form-valid-error .el-checkbox-button:first-child .el-checkbox-button__inner,
.form-valid-error .el-radio-button:first-child .el-radio-button__inner {
  border-left: 1px solid var(--el-color-danger);
}

.form-valid-error .el-checkbox-button:not(:first-child) .el-checkbox-button__inner,
.form-valid-error .el-radio-button:not(:first-child) .el-radio-button__inner {
  border-left: none;
}

.form-valid-error .el-textarea .el-textarea__inner {
  border: 1px solid var(--el-color-danger);
}

html .el-loading-mask {
  z-index: 1000;
}

/* Vben popup-ui visual bridge for Element Plus dialog-like components. */
.el-overlay {
  background-color: hsl(var(--overlay));
}

.el-dialog {
  --el-dialog-width: 32.5rem;
  --el-dialog-margin-top: 10vh;
  --el-dialog-bg-color: hsl(var(--background));
  --el-dialog-box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
  display: flex;
  max-width: calc(100vw - 20px);
  max-height: min(80%, calc(100dvh - 20px));
  flex-direction: column;
  padding: 0;
  border: 0;
  border-radius: var(--radius);
  overflow: hidden;
}

.el-dialog__header {
  margin-right: 0;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid hsl(var(--border));
}

.el-dialog__title {
  color: hsl(var(--foreground));
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  text-align: left;
}

.el-dialog__body {
  min-height: 10rem;
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
  color: hsl(var(--foreground));
}

.el-dialog__footer {
  padding: 0.5rem;
  border-top: 1px solid hsl(var(--border));
}

.el-dialog__headerbtn,
.el-message-box__headerbtn,
.el-drawer__close-btn {
  top: 0.75rem;
  right: 0.75rem;
  display: inline-flex;
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  color: hsl(var(--foreground) / 0.8);
  border-radius: 9999px;
  opacity: 0.7;
  transition:
    color 0.2s,
    background-color 0.2s,
    opacity 0.2s;
}

.el-dialog__headerbtn:hover,
.el-message-box__headerbtn:hover,
.el-drawer__close-btn:hover {
  color: hsl(var(--accent-foreground));
  background: hsl(var(--accent));
  opacity: 1;
}

.el-drawer {
  color: hsl(var(--foreground));
  background: hsl(var(--background));
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
}

.el-drawer__header {
  margin-bottom: 0;
  padding: 1rem 1.5rem;
  color: hsl(var(--foreground));
  border-bottom: 1px solid hsl(var(--border));
}

.el-drawer__body {
  padding: 0.75rem;
}

.el-drawer__footer {
  padding: 0.5rem 0.75rem;
  border-top: 1px solid hsl(var(--border));
}

.el-message-box {
  width: 32.5rem;
  max-width: calc(100vw - 20px);
  padding: 0;
  color: hsl(var(--foreground));
  background: hsl(var(--background));
  border: 0;
  border-radius: var(--radius);
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
  overflow: hidden;
}

.el-message-box__header {
  padding: 1rem 1.25rem 0.5rem;
}

.el-message-box__title {
  color: hsl(var(--foreground));
  font-size: 1rem;
  font-weight: 600;
}

.el-message-box__content {
  padding: 0.5rem 1.25rem 1rem;
  color: hsl(var(--foreground));
}

.el-message-box__btns {
  padding: 0.5rem;
  border-top: 1px solid hsl(var(--border));
}
`
}

function generatorColorVariables(colorItems: ColorItem[]): Record<string, string> {
  const colorVariables: Record<string, string> = {}

  for (const { alias, color, name } of colorItems) {
    if (!color) continue
    const colorsMap = getColors(new TinyColor(color).toHexString())
    let mainColor = colorsMap['500']

    for (const [key, colorValue] of Object.entries(colorsMap)) {
      if (!colorValue) continue
      const hslColor = convertToHslCssVar(colorValue)
      colorVariables[`--${name}-${key}`] = hslColor
      if (alias) {
        colorVariables[`--${alias}-${key}`] = hslColor
      }
      if (key === '500') {
        mainColor = hslColor
      }
    }

    if (alias && mainColor) {
      colorVariables[`--${alias}`] = mainColor
    }
  }

  return colorVariables
}

function convertToHslCssVar(color: string): string {
  const { a, h, l, s } = new TinyColor(color).toHsl()
  const hsl = `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  return a < 1 ? `${hsl} / ${a}` : hsl
}

function stateColorVars(componentName: string, vbenName: string, dark: boolean): Record<string, string> {
  const light3 = dark ? '600' : '400'
  const light5 = dark ? '700' : '300'
  const light7 = dark ? '800' : '200'
  const light8 = dark ? '900' : '100'
  const light9 = dark ? '950' : '50'
  const dark2 = dark ? '400' : '600'

  return {
    [`--el-color-${componentName}`]: `hsl(var(--${vbenName}-500))`,
    [`--el-color-${componentName}-dark-2`]: `hsl(var(--${vbenName}-${dark2}))`,
    [`--el-color-${componentName}-light-3`]: `hsl(var(--${vbenName}-${light3}))`,
    [`--el-color-${componentName}-light-5`]: `hsl(var(--${vbenName}-${light5}))`,
    [`--el-color-${componentName}-light-7`]: `hsl(var(--${vbenName}-${light7}))`,
    [`--el-color-${componentName}-light-8`]: `hsl(var(--${vbenName}-${light8}))`,
    [`--el-color-${componentName}-light-9`]: `hsl(var(--${vbenName}-${light9}))`,
  }
}

function formatVars(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
}
