import { computed, reactive } from 'vue'
import {
  DEFAULT_TOKENS,
  cloneThemeTokens,
  mergeThemeTokens,
  validateThemeTokens,
  type ThemeTokens,
} from '../../../../packages/theme-builder/src/tokens'

const tokens = reactive<ThemeTokens>(cloneThemeTokens(DEFAULT_TOKENS))

export function useThemeStore() {
  const issues = computed(() => validateThemeTokens(tokens))

  function updateToken(path: string, value: string): void {
    const [section, key] = String(path).split('.')
    if (!key) {
      if (section === 'name' || section === 'packageName' || section === 'elementPlusVersion') {
        tokens[section] = value
      }
      return
    }

    const target = tokens[section as keyof ThemeTokens]
    if (typeof target === 'object' && target !== null) {
      ;(target as Record<string, string>)[key] = value
    }
  }

  function replaceTokens(input: unknown): void {
    const next = mergeThemeTokens(input)
    Object.assign(tokens, next)
  }

  function resetTokens(): void {
    Object.assign(tokens, cloneThemeTokens(DEFAULT_TOKENS))
  }

  return {
    tokens,
    issues,
    updateToken,
    replaceTokens,
    resetTokens,
  }
}
