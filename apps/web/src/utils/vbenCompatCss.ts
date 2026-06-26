import vbenDarkCss from '../../../../packages/theme-builder/src/vben/dark.css?raw'
import vbenDefaultCss from '../../../../packages/theme-builder/src/vben/default.css?raw'
import vbenTransitionCss from '../../../../packages/theme-builder/src/vben/transition.css?raw'
import vbenUiCss from '../../../../packages/theme-builder/src/vben/ui.css?raw'
import {
  generateVbenElementPlusStructuralCss,
  generateVbenElementPlusVars,
  generateVbenGlobalCompatCss,
  generateVbenPaletteCss,
} from '../../../../packages/theme-builder/src/vbenCompatCore'

export function generatePreviewVbenCompatCss(mode: 'light' | 'dark'): string {
  const sourceCss =
    mode === 'dark' ? vbenDarkCss : [vbenDefaultCss, vbenTransitionCss, vbenUiCss].join('\n\n')

  return [
    `/* Vben Admin source theme compatibility (${mode}) */`,
    sourceCss.trim(),
    generateVbenPaletteCss(),
    generateVbenElementPlusVars(mode),
    mode === 'light' ? generateVbenGlobalCompatCss() : '',
    generateVbenElementPlusStructuralCss(mode),
  ]
    .filter(Boolean)
    .join('\n\n')
}
