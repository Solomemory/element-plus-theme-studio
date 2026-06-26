<template>
  <div class="studio-shell">
    <header class="studio-header">
      <div class="brand-block">
        <div class="brand-mark">
          <el-icon><Brush /></el-icon>
        </div>
        <div>
          <h1>element-plus-theme-studio</h1>
          <p>{{ tokens.packageName }} · {{ t('elementPlusVersion') }} {{ resolvedElementPlusVersion }}</p>
        </div>
      </div>

      <div class="toolbar">
        <input ref="fileInput" class="hidden-input" type="file" accept="application/json,.json" @change="handleImport" />
        <el-select v-model="selectedPresetId" class="preset-select" :placeholder="t('preset')" @change="handlePresetChange">
          <el-option :label="t('customPreset')" :value="customPresetId" disabled />
          <el-option
            v-for="preset in themePresets"
            :key="preset.id"
            :label="preset.label[locale]"
            :value="preset.id"
          >
            <span class="preset-option">
              <span class="preset-swatches" aria-hidden="true">
                <span
                  v-for="color in preset.swatches"
                  :key="color"
                  class="preset-swatch"
                  :style="{ backgroundColor: color }"
                />
              </span>
              <span>{{ preset.label[locale] }}</span>
            </span>
          </el-option>
        </el-select>
        <el-segmented v-model="locale" :options="languageOptions" />
        <el-tooltip :content="isDark ? t('light') : t('dark')" placement="bottom">
          <el-button :icon="isDark ? Sunny : Moon" circle @click="isDark = !isDark" />
        </el-tooltip>
        <el-tooltip :content="t('githubTooltip')" placement="bottom">
          <el-button
            class="github-link-button"
            :icon="LinkIcon"
            tag="a"
            :href="githubRepositoryUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="t('githubRepository')"
          >
            GitHub
          </el-button>
        </el-tooltip>
        <el-button :icon="Upload" @click="fileInput?.click()">{{ t('importJson') }}</el-button>
        <el-button :icon="Download" @click="exportJson">{{ t('exportJson') }}</el-button>
        <el-button :icon="MagicStick" @click="handleRandomTheme">{{ t('randomTheme') }}</el-button>
        <el-button :icon="RefreshLeft" @click="handleReset">{{ t('reset') }}</el-button>
        <el-button type="primary" :icon="Box" :loading="generating" :disabled="issues.length > 0" @click="generateTheme">
          {{ t('generateZip') }}
        </el-button>
      </div>
    </header>

    <div v-if="errorMessage" class="status-banner error">
      {{ errorMessage }}
    </div>
    <div v-else-if="downloadUrl" class="status-banner success">
      <span>{{ zipFileName }} {{ t('generated') }}.</span>
      <a :href="downloadUrl" :download="zipFileName">{{ t('downloadAgain') }}</a>
    </div>

    <div class="studio-main">
      <TokenEditor
        :tokens="tokens"
        :issues="issues"
        :element-plus-metadata="elementPlusMetadata"
        @update="handleTokenUpdate"
      />
      <PreviewPane :tokens="tokens" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Box, Brush, Download, Link as LinkIcon, MagicStick, Moon, RefreshLeft, Sunny, Upload } from '@element-plus/icons-vue'
import TokenEditor from '../components/TokenEditor.vue'
import PreviewPane from '../components/PreviewPane.vue'
import { useI18n } from '../i18n'
import { defaultPresetId, themePresets } from '../presets'
import { useThemeStore } from '../stores/themeStore'
import { applyElementCssVars } from '../utils/cssVars'
import { createRandomThemeTokens } from '../utils/randomTheme'
import type { SassVariableDefinition } from '../../../../packages/theme-builder/src/tokenCatalog'

interface ElementPlusMetadata {
  requestedVersion: string
  version: string
  supportsDarkCssVars: boolean
  variableCount: number
  variables: SassVariableDefinition[]
}

const { tokens, issues, updateToken, replaceTokens, resetTokens } = useThemeStore()
const { locale, languageOptions, t } = useI18n()
const fileInput = ref<HTMLInputElement | null>(null)
const generating = ref(false)
const errorMessage = ref('')
const downloadUrl = ref('')
const zipFileName = ref('element-plus-theme.zip')
const isDark = ref(false)
const elementPlusMetadata = ref<ElementPlusMetadata | null>(null)
const customPresetId = 'custom'
const selectedPresetId = ref(defaultPresetId)
const isStaticDemo = import.meta.env.VITE_STATIC_DEMO === 'true'
const githubRepositoryUrl = 'https://github.com/Solomemory/element-plus-theme-studio'
const resolvedElementPlusVersion = computed(() => elementPlusMetadata.value?.version ?? tokens.elementPlusVersion)

const jsonText = computed(() => JSON.stringify(tokens, null, 2))

watch(
  tokens,
  () => {
    applyElementCssVars(tokens)
  },
  { deep: true, immediate: true },
)

watch(
  isDark,
  (value) => {
    document.documentElement.classList.toggle('dark', value)
  },
  { immediate: true },
)

watch(
  () => tokens.elementPlusVersion,
  () => {
    void loadElementPlusMetadata()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (downloadUrl.value) {
    URL.revokeObjectURL(downloadUrl.value)
  }
})

function exportJson(): void {
  const blob = new Blob([`${jsonText.value}\n`], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${tokens.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'theme'}.json`
  link.click()
  URL.revokeObjectURL(url)
}

function handleTokenUpdate(path: string, value: string): void {
  selectedPresetId.value = customPresetId
  clearGeneratedResult()
  updateToken(path, value)
}

function handlePresetChange(value: string | number | boolean): void {
  const presetId = String(value)
  if (presetId === customPresetId) return

  const preset = themePresets.find((item) => item.id === presetId)
  if (!preset) return

  replaceTokens(preset.tokens)
  selectedPresetId.value = preset.id
  errorMessage.value = ''
  clearGeneratedResult()
  ElMessage.success(t('presetApplied'))
}

function handleReset(): void {
  resetTokens()
  selectedPresetId.value = defaultPresetId
  errorMessage.value = ''
  clearGeneratedResult()
}

function handleRandomTheme(): void {
  replaceTokens(createRandomThemeTokens(tokens.elementPlusVersion))
  selectedPresetId.value = customPresetId
  errorMessage.value = ''
  clearGeneratedResult()
  ElMessage.success(t('randomApplied'))
}

async function handleImport(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    const text = await file.text()
    replaceTokens(JSON.parse(text))
    selectedPresetId.value = customPresetId
    errorMessage.value = ''
    clearGeneratedResult()
    ElMessage.success('JSON imported')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to import JSON.'
  } finally {
    input.value = ''
  }
}

function clearGeneratedResult(): void {
  if (downloadUrl.value) {
    URL.revokeObjectURL(downloadUrl.value)
  }
  downloadUrl.value = ''
  zipFileName.value = 'element-plus-theme.zip'
}

async function generateTheme(): Promise<void> {
  errorMessage.value = ''

  if (isStaticDemo) {
    errorMessage.value = t('staticDemoNoBuild')
    return
  }

  generating.value = true

  try {
    const response = await fetch('/api/theme/build', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokens),
    })

    if (!response.ok) {
      const detail = await safeReadError(response)
      throw new Error(detail)
    }

    if (downloadUrl.value) {
      URL.revokeObjectURL(downloadUrl.value)
    }

    const blob = await response.blob()
    const disposition = response.headers.get('content-disposition') ?? ''
    zipFileName.value = disposition.match(/filename="([^"]+)"/)?.[1] ?? 'element-plus-theme.zip'
    downloadUrl.value = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = downloadUrl.value
    link.download = zipFileName.value
    link.click()
    ElMessage.success('Theme package generated')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Theme generation failed.'
  } finally {
    generating.value = false
  }
}

async function loadElementPlusMetadata(): Promise<void> {
  if (isStaticDemo) {
    elementPlusMetadata.value = {
      requestedVersion: tokens.elementPlusVersion,
      version: tokens.elementPlusVersion,
      supportsDarkCssVars: true,
      variableCount: 0,
      variables: [],
    }
    return
  }

  try {
    const response = await fetch(`/api/element-plus/metadata?version=${encodeURIComponent(tokens.elementPlusVersion)}`)
    if (!response.ok) {
      const detail = (await response.json()) as { message?: string }
      throw new Error(detail.message || t('unsupportedVersion'))
    }
    elementPlusMetadata.value = (await response.json()) as ElementPlusMetadata
  } catch (error) {
    elementPlusMetadata.value = null
    errorMessage.value = error instanceof Error ? error.message : t('unsupportedVersion')
  }
}

async function safeReadError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { message?: string; issues?: Array<{ path: string; message: string }> }
    const issueText = data.issues?.map((issue) => `${issue.path}: ${issue.message}`).join('; ')
    return issueText || data.message || 'Theme generation failed.'
  } catch {
    return 'Theme generation endpoint is unavailable. Run the editor with pnpm dev.'
  }
}
</script>
