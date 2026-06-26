import { readFileSync } from 'node:fs'
import {
  generateVbenElementPlusStructuralCss,
  generateVbenElementPlusVars,
  generateVbenGlobalCompatCss,
  generateVbenPaletteCss,
} from './vbenCompatCore.js'

const vbenCssFiles = {
  dark: new URL('./vben/dark.css', import.meta.url),
  default: new URL('./vben/default.css', import.meta.url),
  transition: new URL('./vben/transition.css', import.meta.url),
  ui: new URL('./vben/ui.css', import.meta.url),
}

export function generateVbenCompatCss(mode: 'light' | 'dark'): string {
  const sourceCss =
    mode === 'dark'
      ? readCss(vbenCssFiles.dark)
      : [readCss(vbenCssFiles.default), readCss(vbenCssFiles.transition), readCss(vbenCssFiles.ui)].join('\n\n')

  return [
    `\n/* Vben Admin source theme compatibility (${mode}) */`,
    sourceCss,
    generateVbenPaletteCss(),
    generateVbenElementPlusVars(mode),
    mode === 'light' ? generateVbenGlobalCompatCss() : '',
    generateVbenElementPlusStructuralCss(mode),
  ]
    .filter(Boolean)
    .join('\n\n')
}

function readCss(file: URL): string {
  return readFileSync(file, 'utf8').trim()
}
