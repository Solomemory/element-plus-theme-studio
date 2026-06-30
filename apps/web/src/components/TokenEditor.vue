<template>
  <aside class="editor-panel">
    <el-tabs v-model="activeTab" class="editor-tabs">
      <el-tab-pane :label="t('guide')" name="guide">
        <section class="panel-section first guide-panel">
          <div class="section-title">
            <h2>{{ t('guideWorkflowTitle') }}</h2>
          </div>
          <ol class="guide-steps">
            <li>{{ t('guideWorkflowPreset') }}</li>
            <li>{{ t('guideWorkflowEdit') }}</li>
            <li>{{ t('guideWorkflowJson') }}</li>
            <li>{{ t('guideWorkflowZip') }}</li>
          </ol>
        </section>

        <section class="panel-section guide-panel">
          <div class="section-title">
            <h2>{{ t('guideJsonTitle') }}</h2>
          </div>
          <p>{{ t('guideJsonBody') }}</p>
          <ul class="guide-list">
            <li>{{ t('guideImportJson') }}</li>
            <li>{{ t('guideExportJson') }}</li>
          </ul>
        </section>

        <section class="panel-section guide-panel">
          <div class="section-title">
            <h2>{{ t('guideZipTitle') }}</h2>
          </div>
          <p>{{ t('guideZipBody') }}</p>
          <pre class="guide-code"><code>pnpm add ./element-plus-theme-custom

import 'element-plus/theme-chalk/dark/css-vars.css'
import '@your-scope/element-plus-theme-custom/dist/index.css'
import '@your-scope/element-plus-theme-custom/dist/dark.css'</code></pre>
        </section>

        <section class="panel-section guide-panel">
          <div class="section-title">
            <h2>{{ t('guideCliTitle') }}</h2>
          </div>
          <p>{{ t('guideCliBody') }}</p>
          <pre class="guide-code"><code>pnpm theme:build --tokens examples/aura-blue.json</code></pre>
        </section>
      </el-tab-pane>

      <el-tab-pane :label="t('theme')" name="theme">
        <section class="panel-section first">
          <el-form label-position="top" class="compact-form">
            <el-form-item :label="t('name')" :error="issueMessage('name')">
              <el-input :model-value="tokens.name" placeholder="Aura Blue" @input="emitUpdate('name', $event)" />
            </el-form-item>
            <el-form-item :label="t('package')" :error="issueMessage('packageName')">
              <el-input
                :model-value="tokens.packageName"
                placeholder="@scope/element-plus-theme-name"
                @input="emitUpdate('packageName', $event)"
              />
            </el-form-item>
            <el-form-item :label="t('elementPlusVersion')" :error="issueMessage('elementPlusVersion')">
              <el-input
                :model-value="tokens.elementPlusVersion"
                placeholder="latest / installed / 2.14.2"
                @input="emitUpdate('elementPlusVersion', $event)"
              />
              <p v-if="elementPlusMetadata" class="version-meta">
                {{ t('versionResolved') }} {{ elementPlusMetadata.version }} · {{ elementPlusMetadata.variableCount }}
                {{ t('variables') }}
              </p>
            </el-form-item>
            <el-form-item :label="t('density')">
              <el-segmented
                :model-value="tokens.density"
                :options="densityOptions"
                class="density-control"
                @update:model-value="emitUpdate('density', $event)"
              />
            </el-form-item>
          </el-form>
        </section>
      </el-tab-pane>

      <el-tab-pane :label="t('color')" name="color">
        <TokenSection
          v-for="section in colorSections"
          :key="section.title"
          :section="section"
          :tokens="tokens"
          :issues="issues"
          @update="emitUpdate"
        />
      </el-tab-pane>

      <el-tab-pane :label="t('shape')" name="shape">
        <TokenSection
          v-for="section in shapeSections"
          :key="section.title"
          :section="section"
          :tokens="tokens"
          :issues="issues"
          @update="emitUpdate"
        />
      </el-tab-pane>

      <el-tab-pane :label="t('surface')" name="surface">
        <TokenSection
          v-for="section in surfaceSections"
          :key="section.title"
          :section="section"
          :tokens="tokens"
          :issues="issues"
          @update="emitUpdate"
        />
      </el-tab-pane>

      <el-tab-pane :label="t('type')" name="type">
        <TokenSection
          v-for="section in typeSections"
          :key="section.title"
          :section="section"
          :tokens="tokens"
          :issues="issues"
          @update="emitUpdate"
        />
      </el-tab-pane>

      <el-tab-pane :label="`${t('sass')} ${sassVariables.length}`" name="sass">
        <el-tabs v-model="activeSassTab" class="sass-tabs">
          <el-tab-pane
            v-for="category in sassCategories"
            :key="category.name"
            :label="`${category.label} ${category.variables.length}`"
            :name="category.name"
          >
            <div class="token-list">
              <div v-for="variable in category.variables" :key="variable.name" class="token-row">
                <label :for="`scss-${variable.name}`">${{ variable.name }}</label>
                <el-input
                  :id="`scss-${variable.name}`"
                  :model-value="tokens.scssOverrides[variable.name]"
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 5 }"
                  spellcheck="false"
                  placeholder="Sass value"
                  @input="emitUpdate(`scssOverrides.${variable.name}`, $event)"
                />
                <p v-if="issueMessage(`scssOverrides.${variable.name}`)" class="field-error">
                  {{ issueMessage(`scssOverrides.${variable.name}`) }}
                </p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>

      <el-tab-pane :label="t('css')" name="css">
        <section v-if="tokens.compatibility.vben" class="panel-section first css-compat-panel">
          <div class="section-title">
            <h2>{{ t('vbenCompatEnabled') }}</h2>
          </div>
          <p class="css-compat-copy">{{ t('vbenCompatCssNote') }}</p>
          <div class="css-compat-tags">
            <code>design-tokens</code>
            <code>color scales</code>
            <code>Element Plus vars</code>
            <code>card/form/loading</code>
            <code>popup bridge</code>
            <code>dark.css</code>
          </div>
        </section>
        <TokenSection
          v-for="section in cssSections"
          :key="section.title"
          :section="section"
          :tokens="tokens"
          :issues="issues"
          @update="emitUpdate"
        />
      </el-tab-pane>
    </el-tabs>
  </aside>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, ref } from 'vue'
import { ElColorPicker, ElInput, ElInputNumber } from 'element-plus'
import {
  SASS_VARIABLES,
  type SassVariableCategory,
  type SassVariableDefinition,
} from '../../../../packages/theme-builder/src/tokenCatalog'
import {
  THEME_DENSITIES,
  type ThemeDensity,
  type ThemeTokens,
  type TokenIssue,
} from '../../../../packages/theme-builder/src/tokens'
import { useI18n, type MessageKey } from '../i18n'

interface ElementPlusMetadata {
  requestedVersion: string
  version: string
  supportsDarkCssVars: boolean
  variableCount: number
  variables: SassVariableDefinition[]
}

interface Field {
  path: string
  label: string
  labelKey?: MessageKey
  placeholderKey?: MessageKey
  kind?: 'color' | 'textarea' | 'font-size-stepper'
  min?: number
  max?: number
  step?: number
}

interface Section {
  title: string
  titleKey?: MessageKey
  fields: Field[]
}

const props = defineProps<{
  tokens: ThemeTokens
  issues: TokenIssue[]
  elementPlusMetadata: ElementPlusMetadata | null
}>()

const emit = defineEmits<{
  update: [path: string, value: string]
}>()

const activeTab = ref('guide')
const activeSassTab = ref<SassVariableCategory>('core')
const { t } = useI18n()
const densityLabelKeys: Record<ThemeDensity, MessageKey> = {
  compact: 'densityCompact',
  default: 'densityDefault',
  comfortable: 'densityComfortable',
  large: 'densityLarge',
}
const densityOptions = computed(() =>
  THEME_DENSITIES.map((density) => ({
    label: t(densityLabelKeys[density]),
    value: density,
  })),
)
const sassVariables = computed(() => {
  const resolvedVariables = props.elementPlusMetadata?.variables ?? []
  return resolvedVariables.length > 0 ? resolvedVariables : [...SASS_VARIABLES]
})

const colorSections: Section[] = [
  {
    title: 'State',
    titleKey: 'state',
    fields: [
      { path: 'colors.primary', label: 'Primary', kind: 'color' },
      { path: 'colors.success', label: 'Success', kind: 'color' },
      { path: 'colors.warning', label: 'Warning', kind: 'color' },
      { path: 'colors.danger', label: 'Danger', kind: 'color' },
      { path: 'colors.error', label: 'Error', kind: 'color' },
      { path: 'colors.info', label: 'Info', kind: 'color' },
      { path: 'colors.white', label: 'White', kind: 'color' },
      { path: 'colors.black', label: 'Black', kind: 'color' },
    ],
  },
  {
    title: 'Text',
    titleKey: 'text',
    fields: [
      { path: 'text.primary', label: 'Primary', kind: 'color' },
      { path: 'text.regular', label: 'Regular', kind: 'color' },
      { path: 'text.secondary', label: 'Secondary', kind: 'color' },
      { path: 'text.placeholder', label: 'Placeholder', kind: 'color' },
      { path: 'text.disabled', label: 'Disabled', kind: 'color' },
    ],
  },
]

const shapeSections: Section[] = [
  {
    title: 'Radius',
    titleKey: 'radius',
    fields: [
      { path: 'radius.base', label: 'Base' },
      { path: 'radius.small', label: 'Small' },
      { path: 'radius.round', label: 'Round' },
      { path: 'radius.circle', label: 'Circle' },
    ],
  },
  {
    title: 'Border',
    titleKey: 'border',
    fields: [
      { path: 'border.base', label: 'Base', kind: 'color' },
      { path: 'border.light', label: 'Light', kind: 'color' },
      { path: 'border.lighter', label: 'Lighter', kind: 'color' },
      { path: 'border.extraLight', label: 'Extra Light', kind: 'color' },
      { path: 'border.dark', label: 'Dark', kind: 'color' },
      { path: 'border.darker', label: 'Darker', kind: 'color' },
      { path: 'border.hover', label: 'Hover', kind: 'color' },
      { path: 'border.width', label: 'Width' },
      { path: 'border.style', label: 'Style' },
    ],
  },
]

const surfaceSections: Section[] = [
  {
    title: 'Fill',
    titleKey: 'fill',
    fields: [
      { path: 'fill.base', label: 'Base', kind: 'color' },
      { path: 'fill.light', label: 'Light', kind: 'color' },
      { path: 'fill.lighter', label: 'Lighter', kind: 'color' },
      { path: 'fill.extraLight', label: 'Extra Light', kind: 'color' },
      { path: 'fill.dark', label: 'Dark', kind: 'color' },
      { path: 'fill.darker', label: 'Darker', kind: 'color' },
      { path: 'fill.blank', label: 'Blank', kind: 'color' },
    ],
  },
  {
    title: 'Background',
    titleKey: 'background',
    fields: [
      { path: 'background.page', label: 'Page', kind: 'color' },
      { path: 'background.base', label: 'Base', kind: 'color' },
      { path: 'background.overlay', label: 'Overlay', kind: 'color' },
    ],
  },
  {
    title: 'Shadow',
    titleKey: 'shadow',
    fields: [
      { path: 'shadow.base', label: 'Base', kind: 'textarea' },
      { path: 'shadow.light', label: 'Light', kind: 'textarea' },
      { path: 'shadow.lighter', label: 'Lighter', kind: 'textarea' },
      { path: 'shadow.dark', label: 'Dark', kind: 'textarea' },
    ],
  },
  {
    title: 'Overlay',
    titleKey: 'overlay',
    fields: [
      { path: 'overlay.base', label: 'Base' },
      { path: 'overlay.light', label: 'Light' },
      { path: 'overlay.lighter', label: 'Lighter' },
      { path: 'mask.base', label: 'Mask' },
      { path: 'mask.extraLight', label: 'Mask Extra Light' },
    ],
  },
]

const typeSections: Section[] = [
  {
    title: 'Typography',
    titleKey: 'typography',
    fields: [
      {
        path: 'typography.htmlFontSize',
        label: 'HTML Font Size',
        labelKey: 'htmlFontSize',
        kind: 'font-size-stepper',
        min: 1,
        max: 64,
        step: 1,
      },
      { path: 'typography.fontFamily', label: 'Family', kind: 'textarea' },
      { path: 'typography.extraLarge', label: 'Extra Large' },
      { path: 'typography.large', label: 'Large' },
      { path: 'typography.medium', label: 'Medium' },
      { path: 'typography.base', label: 'Base' },
      { path: 'typography.small', label: 'Small' },
      { path: 'typography.extraSmall', label: 'Extra Small' },
    ],
  },
  {
    title: 'Component Size',
    titleKey: 'componentSize',
    fields: [
      { path: 'componentSize.large', label: 'Large' },
      { path: 'componentSize.default', label: 'Default' },
      { path: 'componentSize.small', label: 'Small' },
    ],
  },
  {
    title: 'Breakpoints',
    titleKey: 'breakpoints',
    fields: [
      { path: 'breakpoints.sm', label: 'SM' },
      { path: 'breakpoints.md', label: 'MD' },
      { path: 'breakpoints.lg', label: 'LG' },
      { path: 'breakpoints.xl', label: 'XL' },
    ],
  },
]

const cssSections: Section[] = [
  {
    title: 'Component CSS',
    titleKey: 'componentCss',
    fields: [
      {
        path: 'cssOverrides.light',
        label: 'Light Overrides',
        labelKey: 'cssLight',
        placeholderKey: 'cssOverridesPlaceholder',
        kind: 'textarea',
      },
      {
        path: 'cssOverrides.dark',
        label: 'Dark Overrides',
        labelKey: 'cssDark',
        placeholderKey: 'cssOverridesPlaceholder',
        kind: 'textarea',
      },
    ],
  },
]

const sassCategoryOrder: SassVariableCategory[] = ['core', 'form', 'actions', 'feedback', 'data', 'navigation', 'layout']

const sassCategories = computed(() =>
  sassCategoryOrder.map((name) => ({
    name,
    label: t(name),
    variables: sassVariables.value.filter((variable) => variable.category === name),
  })),
)

function getValue(path: string): string {
  const [section, key] = path.split('.')
  if (!key) {
    return props.tokens[section as 'name' | 'packageName' | 'elementPlusVersion']
  }
  return (props.tokens[section as keyof ThemeTokens] as Record<string, string>)[key]
}

function issueMessage(path: string): string {
  return props.issues.find((issue) => issue.path === path)?.message ?? ''
}

function emitUpdate(path: string, value: string | number): void {
  emit('update', path, String(value))
}

function parseLengthNumber(value: string, fallback = 16): number {
  const match = value.trim().match(/^([0-9]+(?:\.[0-9]+)?)(px|rem|em|%)?$/)
  return match ? Number(match[1]) : fallback
}

function parseLengthUnit(value: string, fallback = 'px'): string {
  const match = value.trim().match(/^[0-9]+(?:\.[0-9]+)?(px|rem|em|%)?$/)
  return match?.[1] || fallback
}

function formatSteppedLength(originalValue: string, nextValue: number | undefined, fallbackUnit = 'px'): string {
  if (typeof nextValue !== 'number' || Number.isNaN(nextValue)) {
    return originalValue
  }

  const unit = parseLengthUnit(originalValue, fallbackUnit)
  const normalized = Number.isInteger(nextValue) ? String(nextValue) : String(Number(nextValue.toFixed(2)))
  return `${normalized}${unit}`
}

const TokenSection = defineComponent({
  props: {
    section: {
      type: Object as () => Section,
      required: true,
    },
    tokens: {
      type: Object as () => ThemeTokens,
      required: true,
    },
    issues: {
      type: Array as () => TokenIssue[],
      required: true,
    },
  },
  emits: ['update'],
  setup(sectionProps, { emit: sectionEmit }) {
    const predefinedColors = [
      '#ffffff',
      '#000000',
      '#2563eb',
      '#7c3aed',
      '#0f766e',
      '#16a34a',
      '#d97706',
      '#dc2626',
      '#64748b',
      '#f8fafc',
    ]

    function sectionValue(path: string): string {
      const [sectionName, key] = path.split('.')
      return (sectionProps.tokens[sectionName as keyof ThemeTokens] as Record<string, string>)[key]
    }

    function sectionIssue(path: string): string {
      return sectionProps.issues.find((issue) => issue.path === path)?.message ?? ''
    }

    return () =>
      h('section', { class: 'panel-section' }, [
        h('div', { class: 'section-title' }, [
          h('h2', sectionProps.section.titleKey ? t(sectionProps.section.titleKey) : sectionProps.section.title),
        ]),
        h(
          'div',
          { class: 'token-list' },
          sectionProps.section.fields.map((field) =>
            h('div', { key: field.path, class: 'token-row' }, [
              h('label', { for: field.path }, field.labelKey ? t(field.labelKey) : field.label),
              renderTokenField(field, sectionValue(field.path), predefinedColors, (value) =>
                sectionEmit('update', field.path, value),
              ),
              sectionIssue(field.path) ? h('p', { class: 'field-error' }, sectionIssue(field.path)) : null,
            ]),
          ),
        ),
      ])
  },
})

function renderTokenField(
  field: Field,
  value: string,
  predefinedColors: string[],
  onUpdate: (value: string) => void,
) {
  if (field.kind === 'color') {
    return h('div', { class: 'token-control' }, [
      h(ElColorPicker, {
        modelValue: value,
        predefine: predefinedColors,
        onChange: (nextValue: string | null) => onUpdate(nextValue || ''),
      }),
      h(ElInput, {
        id: field.path,
        modelValue: value,
        spellcheck: false,
        onInput: (nextValue: string) => onUpdate(nextValue),
      }),
    ])
  }

  if (field.kind === 'font-size-stepper') {
    return h('div', { class: 'font-size-control' }, [
      h(ElInputNumber, {
        id: field.path,
        modelValue: parseLengthNumber(value),
        min: field.min,
        max: field.max,
        step: field.step ?? 1,
        stepStrictly: false,
        controls: true,
        onChange: (nextValue: number | undefined) => onUpdate(formatSteppedLength(value, nextValue)),
      }),
      h('span', { class: 'font-size-unit' }, parseLengthUnit(value)),
    ])
  }

  return h(ElInput, {
    id: field.path,
    modelValue: value,
    type: field.kind === 'textarea' ? 'textarea' : undefined,
    autosize:
      field.kind === 'textarea'
        ? field.path.startsWith('cssOverrides.')
          ? { minRows: 8, maxRows: 16 }
          : { minRows: 2, maxRows: 5 }
        : undefined,
    placeholder: field.placeholderKey ? t(field.placeholderKey) : undefined,
    spellcheck: false,
    onInput: (nextValue: string) => onUpdate(nextValue),
  })
}
</script>
