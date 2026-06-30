<template>
  <main class="preview-panel">
    <section class="preview-section token-showcase">
      <div class="preview-heading">
        <h2>{{ t('tokens') }}</h2>
      </div>
      <div class="swatch-grid">
        <div v-for="swatch in swatches" :key="swatch.label" class="swatch-item">
          <span class="swatch-chip" :style="{ background: swatch.value }" />
          <span>{{ swatch.label }}</span>
          <code>{{ swatch.value }}</code>
        </div>
      </div>
      <div class="token-demo-grid">
        <div class="radius-demo" :style="{ borderRadius: tokens.radius.base }">Base radius</div>
        <div class="radius-demo small" :style="{ borderRadius: tokens.radius.small }">Small radius</div>
        <div class="radius-demo round" :style="{ borderRadius: tokens.radius.round }">Round radius</div>
        <div class="type-demo" :style="{ fontFamily: tokens.typography.fontFamily }">
          <strong>Typography</strong>
          <span>{{ tokens.density }} / HTML {{ tokens.typography.htmlFontSize }} / {{ tokens.typography.extraLarge }} / {{ tokens.typography.base }} / {{ tokens.typography.extraSmall }}</span>
        </div>
        <div class="shadow-demo" :style="{ boxShadow: tokens.shadow.light }">Shadow</div>
      </div>
    </section>

    <section id="preview-actions" class="preview-section">
      <div class="preview-heading">
        <h2>{{ t('previewActions') }}</h2>
        <div class="inline-actions">
          <el-button :icon="ChatLineRound" @click="openMessage">{{ t('message') }}</el-button>
          <el-button type="primary" :icon="Bell" @click="openNotification">{{ t('notify') }}</el-button>
          <el-button :icon="View" @click="dialogVisible = true">{{ t('dialog') }}</el-button>
          <el-button :icon="Expand" @click="drawerVisible = true">{{ t('drawer') }}</el-button>
        </div>
      </div>
      <div class="button-grid">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="primary" plain>Plain</el-button>
        <el-button type="primary" link>Link</el-button>
        <el-dropdown>
          <el-button class="tour-target">
            Dropdown
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Export</el-dropdown-item>
              <el-dropdown-item>Duplicate</el-dropdown-item>
              <el-dropdown-item divided>Archive</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-popconfirm title="Generate this theme?" @confirm="openMessage">
          <template #reference>
            <el-button>Popconfirm</el-button>
          </template>
        </el-popconfirm>
        <el-tooltip content="Tooltip preview" placement="top">
          <el-button :icon="InfoFilled">Tooltip</el-button>
        </el-tooltip>
        <el-popover placement="bottom" title="Popover" :width="220" trigger="click" content="Overlay, border, and shadow tokens.">
          <template #reference>
            <el-button>Popover</el-button>
          </template>
        </el-popover>
        <el-button @click="openMessageBox">MessageBox</el-button>
        <el-button @click="tourOpen = true">Tour</el-button>
      </div>
    </section>

    <section id="preview-form" class="preview-section">
      <div class="preview-heading">
        <h2>{{ t('previewForm') }}</h2>
      </div>
      <el-form label-position="top" class="preview-form">
        <div class="form-grid">
          <el-form-item label="Input">
            <el-input v-model="form.name" placeholder="Element Plus theme" clearable />
          </el-form-item>
          <el-form-item label="Input Number">
            <el-input-number v-model="quantity" :min="1" :max="10" />
          </el-form-item>
          <el-form-item label="Select">
            <el-select v-model="form.category" placeholder="Select">
              <el-option label="Admin" value="admin" />
              <el-option label="Design System" value="design" />
              <el-option label="SaaS" value="saas" />
            </el-select>
          </el-form-item>
          <el-form-item label="Cascader">
            <el-cascader v-model="cascaderValue" :options="cascaderOptions" />
          </el-form-item>
          <el-form-item label="Mention">
            <el-mention v-model="mentionText" :options="mentionOptions" placeholder="@designer" />
          </el-form-item>
          <el-form-item label="Input Tag">
            <el-input-tag v-model="inputTags" />
          </el-form-item>
          <el-form-item label="OTP">
            <el-input-otp v-model="otpValue" />
          </el-form-item>
          <el-form-item label="Date">
            <el-date-picker v-model="pickedDate" type="date" placeholder="Pick a day" />
          </el-form-item>
          <el-form-item label="Time">
            <el-time-picker v-model="pickedTime" placeholder="Pick time" />
          </el-form-item>
          <el-form-item label="Color">
            <el-color-picker v-model="pickedColor" />
          </el-form-item>
        </div>
        <el-form-item label="Controls">
          <div class="control-stack">
            <el-switch v-model="enabled" />
            <el-radio-group v-model="density">
              <el-radio-button label="Compact" value="compact" />
              <el-radio-button label="Comfortable" value="comfortable" />
            </el-radio-group>
            <el-checkbox-group v-model="checks">
              <el-checkbox label="Buttons" value="buttons" />
              <el-checkbox label="Forms" value="forms" />
            </el-checkbox-group>
            <el-segmented v-model="segment" :options="segments" />
          </div>
        </el-form-item>
        <el-form-item label="Range">
          <div class="range-grid">
            <el-slider v-model="sliderValue" />
            <el-rate v-model="rating" />
          </div>
        </el-form-item>
      </el-form>
    </section>

    <section id="preview-feedback" class="preview-section">
      <div class="preview-heading">
        <h2>{{ t('previewFeedback') }}</h2>
      </div>
      <div class="status-stack">
        <el-alert title="Primary workflows are ready" type="success" show-icon :closable="false" />
        <el-alert title="Token contrast needs review" type="warning" show-icon :closable="false" />
        <el-alert title="Danger state preview" type="error" show-icon :closable="false" />
        <div v-loading="loading" class="loading-box">Loading directive</div>
        <div class="feedback-actions">
          <div class="feedback-group">
            <span class="feedback-label">Message</span>
            <el-button
              v-for="item in feedbackTypes"
              :key="`message-${item.type}`"
              :type="buttonTypeForFeedback(item.type)"
              size="small"
              @click="openMessage(item.type)"
            >
              {{ item.label }}
            </el-button>
          </div>
          <div class="feedback-group">
            <span class="feedback-label">Notification</span>
            <el-button
              v-for="item in feedbackTypes"
              :key="`notification-${item.type}`"
              :type="buttonTypeForFeedback(item.type)"
              size="small"
              @click="openNotification(item.type)"
            >
              {{ item.label }}
            </el-button>
          </div>
        </div>
        <el-alert title="Info state preview" type="info" show-icon :closable="false" />
        <el-result icon="success" title="Result" sub-title="Generated package can be imported in Vite.">
          <template #extra>
            <el-button type="primary" size="small">Done</el-button>
          </template>
        </el-result>
      </div>
    </section>

    <section id="preview-data" class="preview-section">
      <div class="preview-heading">
        <h2>{{ t('previewData') }}</h2>
      </div>
      <div class="tag-row">
        <el-tag>Default</el-tag>
        <el-tag type="success">Success</el-tag>
        <el-tag type="warning">Warning</el-tag>
        <el-tag type="danger">Danger</el-tag>
        <el-tag type="info">Info</el-tag>
        <el-badge :value="12">
          <el-avatar :icon="UserFilled" />
        </el-badge>
      </div>
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="Token Set" min-width="160" />
        <el-table-column prop="status" label="Status" width="120">
          <template #default="{ row }">
            <el-tag :type="row.type">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="owner" label="Owner" width="140" />
      </el-table>
      <el-pagination class="sample-pagination" layout="prev, pager, next" :total="80" />
      <el-descriptions title="Descriptions" :column="2" border>
        <el-descriptions-item label="Package">{{ tokens.packageName }}</el-descriptions-item>
        <el-descriptions-item label="Primary">{{ tokens.colors.primary }}</el-descriptions-item>
      </el-descriptions>
      <div class="data-grid">
        <el-statistic title="Downloads" :value="268500" />
        <el-progress :percentage="68" />
      </div>
    </section>

    <section id="preview-navigation" class="preview-section">
      <div class="preview-heading">
        <h2>{{ t('previewNavigation') }}</h2>
      </div>
      <el-menu mode="horizontal" :default-active="activeMenu" class="sample-menu" @select="activeMenu = $event">
        <el-menu-item index="overview">Overview</el-menu-item>
        <el-menu-item index="tokens">Tokens</el-menu-item>
        <el-menu-item index="components">Components</el-menu-item>
      </el-menu>
      <el-tabs v-model="activeTab" class="sample-tabs">
        <el-tab-pane label="Preview" name="preview">Buttons, forms, data, and feedback components.</el-tab-pane>
        <el-tab-pane label="Tokens" name="tokens">Theme values are applied as live CSS variables.</el-tab-pane>
        <el-tab-pane label="Package" name="package">The generated package compiles SCSS from Element Plus.</el-tab-pane>
      </el-tabs>
      <div class="nav-grid">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>Theme</el-breadcrumb-item>
          <el-breadcrumb-item>Preview</el-breadcrumb-item>
        </el-breadcrumb>
        <el-steps :active="2" finish-status="success">
          <el-step title="Edit" />
          <el-step title="Build" />
          <el-step title="Ship" />
        </el-steps>
        <el-anchor class="sample-anchor" :offset="80">
          <el-anchor-link href="#preview-actions" title="Actions" />
          <el-anchor-link href="#preview-form" title="Form" />
          <el-anchor-link href="#preview-data" title="Data" />
        </el-anchor>
        <el-link type="primary">Primary link</el-link>
      </div>
    </section>

    <section id="preview-content" class="preview-section">
      <div class="preview-heading">
        <h2>{{ t('previewContent') }}</h2>
      </div>
      <div class="content-grid">
        <el-card shadow="never" class="sample-card">
          <template #header>
            <span>Theme Card</span>
          </template>
          <p>Spacing, border, text, and background tokens are visible here.</p>
        </el-card>
        <el-collapse v-model="collapseValue">
          <el-collapse-item title="Collapse" name="1">Collapse body inherits text and border tokens.</el-collapse-item>
        </el-collapse>
        <el-skeleton :rows="3" animated />
        <el-empty description="Empty state" />
        <el-upload drag action="#" :auto-upload="false" :file-list="uploadFiles">
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">Drop file here or click</div>
        </el-upload>
      </div>
      <div class="content-grid wide">
        <el-tree :data="treeData" :props="{ label: 'label', children: 'children' }" default-expand-all />
        <el-transfer v-model="transferValue" :data="transferData" />
      </div>
      <el-carousel height="140px" class="sample-carousel">
        <el-carousel-item v-for="item in 3" :key="item">
          <div class="carousel-panel">Carousel {{ item }}</div>
        </el-carousel-item>
      </el-carousel>
      <el-timeline>
        <el-timeline-item timestamp="2026-06-26" type="primary">Theme edited</el-timeline-item>
        <el-timeline-item timestamp="2026-06-26" type="success">Package generated</el-timeline-item>
      </el-timeline>
      <el-calendar v-model="calendarDate" />
    </section>

    <el-dialog v-model="dialogVisible" title="Dialog Preview" width="420px">
      <p>The dialog inherits the live theme variables from the editor.</p>
      <template #footer>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </template>
    </el-dialog>

    <el-drawer v-model="drawerVisible" title="Drawer Preview" size="360px">
      <p>Drawer background, border, text, and overlay variables are active.</p>
    </el-drawer>

    <el-tour v-model="tourOpen" :steps="tourSteps" />
    <el-backtop target=".preview-panel" :right="24" :bottom="24" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import {
  ArrowDown,
  Bell,
  ChatLineRound,
  Expand,
  InfoFilled,
  UploadFilled,
  UserFilled,
  View,
} from '@element-plus/icons-vue'
import type { ThemeTokens } from '../../../../packages/theme-builder/src/tokens'
import { useI18n } from '../i18n'

const props = defineProps<{
  tokens: ThemeTokens
}>()

const { t } = useI18n()

type FeedbackType = 'error' | 'info' | 'success' | 'warning'
type PreviewButtonType = 'danger' | 'info' | 'success' | 'warning'

const enabled = ref(true)
const density = ref('compact')
const checks = ref(['buttons', 'forms'])
const segment = ref('Design')
const segments = ['Design', 'Build', 'Ship']
const activeTab = ref('preview')
const activeMenu = ref('overview')
const dialogVisible = ref(false)
const drawerVisible = ref(false)
const tourOpen = ref(false)
const loading = ref(true)
const quantity = ref(3)
const sliderValue = ref(42)
const rating = ref(4)
const pickedColor = ref('#2563eb')
const pickedDate = ref(new Date())
const pickedTime = ref(new Date())
const calendarDate = ref(new Date())
const cascaderValue = ref(['design', 'tokens'])
const mentionText = ref('@designer Please review this theme.')
const inputTags = ref(['primary', 'surface'])
const otpValue = ref('2026')
const collapseValue = ref(['1'])
const transferValue = ref([1, 3])
const uploadFiles = ref([])
const form = ref({
  name: 'Theme Studio',
  category: 'design',
})

const swatches = computed(() => [
  { label: 'Primary', value: props.tokens.colors.primary },
  { label: 'Success', value: props.tokens.colors.success },
  { label: 'Warning', value: props.tokens.colors.warning },
  { label: 'Danger', value: props.tokens.colors.danger },
  { label: 'Info', value: props.tokens.colors.info },
  { label: 'Text', value: props.tokens.text.primary },
  { label: 'Border', value: props.tokens.border.base },
  { label: 'Fill', value: props.tokens.fill.base },
  { label: 'Page', value: props.tokens.background.page },
])

const mentionOptions = [
  { label: 'designer', value: 'designer' },
  { label: 'frontend', value: 'frontend' },
  { label: 'product', value: 'product' },
]

const cascaderOptions = [
  {
    value: 'design',
    label: 'Design',
    children: [
      { value: 'tokens', label: 'Tokens' },
      { value: 'components', label: 'Components' },
    ],
  },
]

const tableData = [
  { name: 'Aura Blue', status: 'Ready', owner: 'Design', type: 'success' },
  { name: 'Ops Neutral', status: 'Draft', owner: 'Platform', type: 'warning' },
  { name: 'Signal Red', status: 'Review', owner: 'Brand', type: 'danger' },
]

const treeData = [
  {
    label: 'Theme',
    children: [{ label: 'Core' }, { label: 'Components' }, { label: 'Dark' }],
  },
]

const transferData = Array.from({ length: 6 }, (_, index) => ({
  key: index + 1,
  label: `Token ${index + 1}`,
}))

const feedbackTypes: Array<{ label: string; type: FeedbackType }> = [
  { label: 'Info', type: 'info' },
  { label: 'Success', type: 'success' },
  { label: 'Warning', type: 'warning' },
  { label: 'Error', type: 'error' },
]

const tourSteps = [
  {
    target: '.tour-target',
    title: 'Dropdown',
    description: 'Overlay components inherit popper, border, and shadow variables.',
  },
]

function buttonTypeForFeedback(type: FeedbackType): PreviewButtonType {
  return type === 'error' ? 'danger' : type
}

function openMessage(type: FeedbackType = 'success'): void {
  ElMessage({
    message: `Element Plus ${type} message preview`,
    type,
  })
}

function openNotification(type: FeedbackType = 'success'): void {
  ElNotification({
    title: 'Theme package',
    message: `Element Plus ${type} notification preview`,
    type,
  })
}

function openMessageBox(): void {
  void ElMessageBox.confirm('MessageBox preview with current theme variables.', 'MessageBox', {
    type: 'info',
  }).catch(() => undefined)
}
</script>
