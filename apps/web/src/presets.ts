import { cloneThemeTokens, DEFAULT_TOKENS } from '../../../packages/theme-builder/src/tokens'
import vbenAdminTokens from '../../../examples/vben-admin.json'

export interface ThemePreset {
  id: string
  label: {
    'zh-CN': string
    'en-US': string
  }
  swatches: string[]
  tokens: unknown
}

interface ComponentCoverageCssOptions {
  scope?: '.dark'
  surface: string
  surfaceAlt: string
  surfaceMuted: string
  border: string
  text: string
  textMuted: string
  primary: string
  primaryText: string
  activeBg: string
  hoverBg: string
  tableHeaderBg: string
  tableHeaderText: string
  shadow: string
  softShadow: string
  radius: string
  accent?: string
  fontFamily?: string
  fontWeight?: string
  textTransform?: string
  clipPath?: string
}

function createComponentCoverageCss(options: ComponentCoverageCssOptions): string {
  const s = options.scope ? `${options.scope} ` : ''
  const accent = options.accent ?? options.primary
  const fontFamily = options.fontFamily ? `  font-family: ${options.fontFamily};\n` : ''
  const fontWeight = options.fontWeight ? `  font-weight: ${options.fontWeight};\n` : ''
  const textTransform = options.textTransform ? `  text-transform: ${options.textTransform};\n` : ''
  const clipPath = options.clipPath ? `  clip-path: ${options.clipPath};\n` : ''

  return String.raw`
${s}.el-button:not(.is-text):not(.is-link),
${s}.el-checkbox-button__inner,
${s}.el-radio-button__inner,
${s}.el-segmented,
${s}.el-tag,
${s}.el-pagination button,
${s}.el-pager li,
${s}.el-backtop {
  border-color: ${options.border};
  border-radius: ${options.radius};
  color: ${options.text};
  box-shadow: ${options.softShadow};
${fontFamily}${fontWeight}${textTransform}${clipPath}}

${s}.el-button:not(.is-text):not(.is-link):not(.el-button--primary):not(.el-button--success):not(.el-button--warning):not(.el-button--danger):not(.el-button--info),
${s}.el-pagination button,
${s}.el-pager li,
${s}.el-segmented {
  background: ${options.surface};
}

${s}.el-button:not(.is-text):not(.is-link):hover,
${s}.el-button:not(.is-text):not(.is-link):focus,
${s}.el-pager li:hover,
${s}.el-backtop:hover {
  border-color: ${options.primary};
  color: ${options.primary};
  background: ${options.hoverBg};
}

${s}.el-input__wrapper,
${s}.el-textarea__inner,
${s}.el-select__wrapper,
${s}.el-input-number,
${s}.el-input-number__decrease,
${s}.el-input-number__increase,
${s}.el-date-editor.el-input__wrapper,
${s}.el-input-tag,
${s}.el-input-tag__wrapper,
${s}.el-input-otp,
${s}.el-color-picker__trigger,
${s}.el-upload,
${s}.el-upload-dragger,
${s}.el-transfer-panel,
${s}.el-transfer-panel__header {
  border-color: ${options.border};
  border-radius: ${options.radius};
  color: ${options.text};
  background: ${options.surface};
  box-shadow: ${options.softShadow};
}

${s}.el-input__inner,
${s}.el-textarea__inner,
${s}.el-select__selected-item,
${s}.el-select__placeholder,
${s}.el-input-tag__inner,
${s}.el-input-otp__inner {
  color: ${options.text};
}

${s}.el-input__wrapper.is-focus,
${s}.el-textarea__inner:focus,
${s}.el-select__wrapper.is-focused,
${s}.el-color-picker__trigger:hover,
${s}.el-upload-dragger:hover {
  border-color: ${options.primary};
  box-shadow: 0 0 0 1px ${options.primary}, ${options.softShadow};
}

${s}.el-checkbox__inner,
${s}.el-radio__inner,
${s}.el-switch__core,
${s}.el-slider__runway,
${s}.el-progress-bar__outer,
${s}.el-rate__decimal {
  border-color: ${options.border};
  background: ${options.surfaceMuted};
}

${s}.el-checkbox__input.is-checked .el-checkbox__inner,
${s}.el-radio__input.is-checked .el-radio__inner,
${s}.el-switch.is-checked .el-switch__core,
${s}.el-slider__bar,
${s}.el-progress-bar__inner,
${s}.el-segmented__item-selected,
${s}.el-pager li.is-active,
${s}.el-rate__item .el-rate__icon.is-active {
  border-color: ${options.primary};
  color: ${options.primaryText};
  background: ${options.primary};
}

${s}.el-slider__button {
  border-color: ${options.primary};
  background: ${options.surface};
  box-shadow: ${options.softShadow};
}

${s}.el-alert,
${s}.el-result,
${s}.el-message,
${s}.el-notification,
${s}.el-message-box,
${s}.el-dialog,
${s}.el-drawer,
${s}.el-tour__content,
${s}.el-popover.el-popper,
${s}.el-popper.is-light,
${s}.el-popper.is-dark,
${s}.el-tooltip__popper,
${s}.el-dropdown__popper .el-scrollbar,
${s}.el-select__popper.el-popper,
${s}.el-picker__popper.el-popper,
${s}.el-cascader__dropdown.el-popper,
${s}.el-color-dropdown,
${s}.el-mention__popper {
  border-color: ${options.border};
  border-radius: ${options.radius};
  color: ${options.text};
  background: ${options.surfaceAlt};
  box-shadow: ${options.shadow};
}

${s}.el-message__content,
${s}.el-notification__title,
${s}.el-notification__content,
${s}.el-message-box__title,
${s}.el-message-box__content,
${s}.el-dialog__title,
${s}.el-drawer__title,
${s}.el-result__title,
${s}.el-result__subtitle {
  color: ${options.text};
}

${s}.el-loading-mask {
  color: ${options.primary};
  background: ${options.activeBg};
}

${s}.el-table,
${s}.el-table__inner-wrapper,
${s}.el-table tr,
${s}.el-table td.el-table__cell,
${s}.el-table--border .el-table__cell,
${s}.el-descriptions,
${s}.el-descriptions__body,
${s}.el-descriptions__cell,
${s}.el-statistic,
${s}.el-tree,
${s}.el-calendar,
${s}.el-calendar-table td,
${s}.el-collapse,
${s}.el-collapse-item__wrap,
${s}.el-collapse-item__header,
${s}.el-card,
${s}.el-empty,
${s}.el-skeleton,
${s}.el-timeline {
  border-color: ${options.border};
  color: ${options.text};
  background: ${options.surfaceAlt};
}

${s}.el-table th.el-table__cell,
${s}.el-descriptions__label,
${s}.el-transfer-panel__header,
${s}.el-calendar__header {
  border-color: ${options.border};
  color: ${options.tableHeaderText};
  background: ${options.tableHeaderBg};
}

${s}.el-table__body tr:hover > td.el-table__cell,
${s}.el-tree-node__content:hover,
${s}.el-calendar-table td.is-selected,
${s}.el-calendar-table td:hover,
${s}.el-collapse-item__header:hover {
  color: ${options.primary};
  background: ${options.hoverBg};
}

${s}.el-tag,
${s}.el-badge__content,
${s}.el-avatar,
${s}.el-skeleton__item,
${s}.el-progress-bar__outer,
${s}.el-carousel__container,
${s}.carousel-panel {
  border-color: ${options.border};
  color: ${options.text};
  background: ${options.surfaceMuted};
}

${s}.el-menu,
${s}.sample-menu,
${s}.el-tabs__nav-wrap::after,
${s}.el-anchor,
${s}.sample-anchor,
${s}.el-breadcrumb,
${s}.el-steps,
${s}.el-step__line,
${s}.el-timeline-item__tail {
  border-color: ${options.border};
  color: ${options.text};
  background: ${options.surfaceAlt};
}

${s}.el-menu-item,
${s}.el-tabs__item,
${s}.el-breadcrumb__inner,
${s}.el-step__title,
${s}.el-anchor__link,
${s}.el-link,
${s}.el-dropdown-menu__item,
${s}.el-select-dropdown__item,
${s}.el-cascader-node,
${s}.el-date-table td,
${s}.el-time-spinner__item {
  color: ${options.textMuted};
}

${s}.el-menu-item.is-active,
${s}.el-menu-item:hover,
${s}.el-tabs__item.is-active,
${s}.el-tabs__item:hover,
${s}.el-anchor__link.is-active,
${s}.el-link,
${s}.el-dropdown-menu__item:hover,
${s}.el-dropdown-menu__item:focus,
${s}.el-select-dropdown__item.is-selected,
${s}.el-select-dropdown__item.hover,
${s}.el-cascader-node.in-active-path,
${s}.el-cascader-node.is-active,
${s}.el-cascader-node:hover,
${s}.el-date-table td.current:not(.disabled) .el-date-table-cell__text,
${s}.el-time-spinner__item.is-active:not(.is-disabled) {
  color: ${options.primary};
  background: ${options.activeBg};
}

${s}.el-tabs__active-bar,
${s}.el-anchor__marker,
${s}.el-timeline-item__node,
${s}.el-carousel__indicator.is-active button {
  background: ${options.primary};
}

${s}.el-upload__text,
${s}.el-empty__description,
${s}.el-statistic__head,
${s}.el-statistic__content,
${s}.el-calendar__title,
${s}.el-collapse-item__content,
${s}.el-transfer-panel__item,
${s}.el-tree-node__label,
${s}.el-timeline-item__content,
${s}.el-timeline-item__timestamp {
  color: ${options.textMuted};
}

${s}.el-card__header,
${s}.el-dialog__header,
${s}.el-drawer__header,
${s}.el-message-box__header,
${s}.el-popconfirm__main,
${s}.el-tour__header,
${s}.el-transfer-panel__footer {
  border-color: ${options.border};
  color: ${options.text};
}

${s}.el-scrollbar__thumb {
  background: ${accent};
}
`
}

const glassAuroraLightCss = String.raw`
.studio-shell {
  position: relative;
  isolation: isolate;
  background:
    linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
}

.studio-shell::before {
  content: '';
  position: absolute;
  inset: 88px 18px 18px;
  z-index: 0;
  pointer-events: none;
  border-radius: 34px;
  background:
    linear-gradient(
      118deg,
      rgba(255, 255, 255, 0.26) 0%,
      rgba(255, 255, 255, 0.68) 44%,
      rgba(255, 255, 255, 0.18) 100%
    ),
    linear-gradient(
      135deg,
      rgba(124, 58, 237, 0.72) 0%,
      rgba(37, 99, 235, 0.66) 23%,
      rgba(6, 182, 212, 0.54) 42%,
      rgba(34, 197, 94, 0.44) 58%,
      rgba(250, 204, 21, 0.56) 74%,
      rgba(251, 113, 133, 0.64) 100%
    );
  filter: saturate(112%);
  opacity: 0.92;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.54),
    0 34px 82px rgba(91, 124, 250, 0.18);
}

.studio-header,
.studio-main,
.status-banner {
  position: relative;
  z-index: 1;
}

.studio-header,
.editor-panel,
.preview-panel,
.el-dialog,
.el-message-box,
.el-drawer,
.el-message,
.el-notification,
.el-tour__content,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  border-color: rgba(255, 255, 255, 0.62);
  background: rgba(255, 255, 255, 0.58);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    0 18px 48px rgba(91, 124, 250, 0.10),
    0 24px 60px rgba(31, 35, 52, 0.08);
  backdrop-filter: blur(26px) saturate(135%);
  -webkit-backdrop-filter: blur(26px) saturate(135%);
}

.studio-header {
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.62), 0 10px 30px rgba(31, 35, 52, 0.05);
}

.editor-panel,
.preview-panel {
  border-radius: 22px;
}

.preview-section,
.preview-card,
.el-card {
  border-color: rgba(255, 255, 255, 0.54);
  background: rgba(255, 255, 255, 0.54);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    0 10px 28px rgba(31, 35, 52, 0.05);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.brand-mark,
.token-swatch,
.stat-card,
.swatch-item,
.radius-demo,
.type-demo,
.shadow-demo,
.loading-box,
.carousel-panel,
.sample-anchor {
  border-color: rgba(255, 255, 255, 0.68);
  background: rgba(255, 255, 255, 0.50);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.88),
    0 12px 28px rgba(31, 35, 52, 0.06);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner,
.el-segmented,
.el-upload-dragger {
  border-color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.62);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.92),
    0 8px 22px rgba(31, 35, 52, 0.05);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.el-button:not(.is-text):not(.is-link),
.el-tag,
.el-alert {
  border-color: rgba(255, 255, 255, 0.72);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.64);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.90),
    0 10px 24px rgba(31, 35, 52, 0.06);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.el-button--primary:not(.is-plain):not(.is-link):not(.is-text) {
  color: #ffffff;
  border-color: rgba(91, 124, 250, 0.34);
  background: rgba(91, 124, 250, 0.86);
}

.el-button--success:not(.is-plain):not(.is-link):not(.is-text) {
  color: #ffffff;
  border-color: rgba(40, 199, 111, 0.34);
  background: rgba(40, 199, 111, 0.86);
}

.el-button--warning:not(.is-plain):not(.is-link):not(.is-text) {
  color: #3b2a08;
  border-color: rgba(245, 165, 36, 0.42);
  background: rgba(245, 165, 36, 0.88);
}

.el-button--danger:not(.is-plain):not(.is-link):not(.is-text) {
  color: #ffffff;
  border-color: rgba(243, 18, 96, 0.34);
  background: rgba(243, 18, 96, 0.86);
}

.el-button--info:not(.is-plain):not(.is-link):not(.is-text) {
  color: #ffffff;
  border-color: rgba(139, 143, 163, 0.34);
  background: rgba(139, 143, 163, 0.86);
}

.el-button.is-plain:not(.is-link):not(.is-text) {
  background: rgba(255, 255, 255, 0.42);
}

.el-button--primary.is-plain:not(.is-link):not(.is-text) {
  color: #3f63f3;
  border-color: rgba(91, 124, 250, 0.34);
  background: rgba(91, 124, 250, 0.13);
}

.el-alert--success.is-light,
.el-tag--success {
  color: #137a46;
  border-color: rgba(40, 199, 111, 0.24);
  background: rgba(40, 199, 111, 0.16);
}

.el-alert--warning.is-light,
.el-tag--warning {
  color: #8a5a00;
  border-color: rgba(245, 165, 36, 0.28);
  background: rgba(245, 165, 36, 0.18);
}

.el-alert--error.is-light,
.el-tag--danger {
  color: #b20d47;
  border-color: rgba(243, 18, 96, 0.24);
  background: rgba(243, 18, 96, 0.15);
}

.el-alert--info.is-light,
.el-tag--info {
  color: #5f6476;
  border-color: rgba(139, 143, 163, 0.22);
  background: rgba(139, 143, 163, 0.14);
}

.el-alert__title {
  color: inherit;
}

.el-alert {
  border-radius: 16px;
}

.el-button:not(.is-text):not(.is-link):hover,
.el-input__wrapper:hover,
.el-select__wrapper:hover {
  border-color: rgba(255, 255, 255, 0.92);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 14px 30px rgba(91, 124, 250, 0.10);
}

.el-table,
.el-table__inner-wrapper,
.el-table th.el-table__cell,
.el-table tr,
.el-table td.el-table__cell {
  background-color: transparent;
}

.el-table th.el-table__cell {
  color: #6f7382;
  background: rgba(255, 255, 255, 0.28);
}

.el-table__body tr:hover > td.el-table__cell {
  background: rgba(255, 255, 255, 0.22);
}

.el-tabs__nav-wrap::after {
  background: rgba(255, 255, 255, 0.42);
}

.el-menu,
.sample-menu {
  border-color: rgba(255, 255, 255, 0.64);
  background: rgba(255, 255, 255, 0.32);
}

.el-tabs__item,
.el-menu-item,
.brand-block p,
.sample-card p,
.token-row label {
  color: #6f7382;
}

.panel-section.first,
.panel-section + .panel-section {
  border-color: rgba(255, 255, 255, 0.56);
}

.guide-code,
.css-compat-panel {
  border-color: rgba(255, 255, 255, 0.64);
  background: rgba(255, 255, 255, 0.46);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}
`

const glassAuroraDarkCss = String.raw`
.dark .studio-shell {
  position: relative;
  isolation: isolate;
  background:
    linear-gradient(180deg, #0f111a 0%, #161a27 100%);
}

.dark .studio-shell::before {
  content: '';
  position: absolute;
  inset: 88px 18px 18px;
  z-index: 0;
  pointer-events: none;
  border-radius: 34px;
  background:
    linear-gradient(
      118deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.18) 44%,
      rgba(255, 255, 255, 0.05) 100%
    ),
    linear-gradient(
      135deg,
      rgba(124, 58, 237, 0.52) 0%,
      rgba(37, 99, 235, 0.46) 22%,
      rgba(6, 182, 212, 0.34) 42%,
      rgba(34, 197, 94, 0.24) 58%,
      rgba(250, 204, 21, 0.28) 74%,
      rgba(251, 113, 133, 0.38) 100%
    );
  filter: saturate(112%);
  opacity: 0.84;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 34px 82px rgba(0, 0, 0, 0.30);
}

.dark .studio-header,
.dark .studio-main,
.dark .status-banner {
  position: relative;
  z-index: 1;
}

.dark .studio-header,
.dark .editor-panel,
.dark .preview-panel,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-message,
.dark .el-notification,
.dark .el-tour__content,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(24, 26, 39, 0.58);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 22px 58px rgba(0, 0, 0, 0.30),
    0 14px 36px rgba(91, 124, 250, 0.08);
  backdrop-filter: blur(28px) saturate(135%);
  -webkit-backdrop-filter: blur(28px) saturate(135%);
}

.dark .editor-panel,
.dark .preview-panel {
  border-radius: 22px;
}

.dark .preview-section,
.dark .preview-card,
.dark .el-card {
  border-color: rgba(255, 255, 255, 0.10);
  background: rgba(24, 26, 39, 0.50);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 12px 28px rgba(0, 0, 0, 0.22);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.dark .brand-mark,
.dark .token-swatch,
.dark .stat-card,
.dark .swatch-item,
.dark .radius-demo,
.dark .type-demo,
.dark .shadow-demo,
.dark .loading-box,
.dark .carousel-panel,
.dark .sample-anchor {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(24, 26, 39, 0.48);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.11),
    0 14px 32px rgba(0, 0, 0, 0.22);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.dark .el-input__wrapper,
.dark .el-textarea__inner,
.dark .el-select__wrapper,
.dark .el-input-number,
.dark .el-checkbox-button__inner,
.dark .el-radio-button__inner,
.dark .el-segmented,
.dark .el-upload-dragger {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(24, 26, 39, 0.54);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 10px 26px rgba(0, 0, 0, 0.20);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.dark .el-button:not(.is-text):not(.is-link),
.dark .el-tag,
.dark .el-alert {
  border-color: rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.10);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 10px 26px rgba(0, 0, 0, 0.22);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.dark .el-button--primary:not(.is-plain):not(.is-link):not(.is-text) {
  color: #ffffff;
  border-color: rgba(143, 166, 255, 0.30);
  background: rgba(91, 124, 250, 0.74);
}

.dark .el-button--success:not(.is-plain):not(.is-link):not(.is-text) {
  color: #ffffff;
  border-color: rgba(40, 199, 111, 0.30);
  background: rgba(40, 199, 111, 0.70);
}

.dark .el-button--warning:not(.is-plain):not(.is-link):not(.is-text) {
  color: #2d2106;
  border-color: rgba(245, 165, 36, 0.34);
  background: rgba(245, 165, 36, 0.78);
}

.dark .el-button--danger:not(.is-plain):not(.is-link):not(.is-text) {
  color: #ffffff;
  border-color: rgba(243, 18, 96, 0.30);
  background: rgba(243, 18, 96, 0.72);
}

.dark .el-button--info:not(.is-plain):not(.is-link):not(.is-text) {
  color: #ffffff;
  border-color: rgba(139, 143, 163, 0.26);
  background: rgba(139, 143, 163, 0.62);
}

.dark .el-button.is-plain:not(.is-link):not(.is-text) {
  background: rgba(255, 255, 255, 0.08);
}

.dark .el-button--primary.is-plain:not(.is-link):not(.is-text) {
  color: #aebfff;
  border-color: rgba(143, 166, 255, 0.28);
  background: rgba(91, 124, 250, 0.16);
}

.dark .el-alert--success.is-light,
.dark .el-tag--success {
  color: #8ce8b2;
  border-color: rgba(40, 199, 111, 0.24);
  background: rgba(40, 199, 111, 0.14);
}

.dark .el-alert--warning.is-light,
.dark .el-tag--warning {
  color: #f9d487;
  border-color: rgba(245, 165, 36, 0.24);
  background: rgba(245, 165, 36, 0.15);
}

.dark .el-alert--error.is-light,
.dark .el-tag--danger {
  color: #ff9cbc;
  border-color: rgba(243, 18, 96, 0.24);
  background: rgba(243, 18, 96, 0.14);
}

.dark .el-alert--info.is-light,
.dark .el-tag--info {
  color: #c8ccda;
  border-color: rgba(139, 143, 163, 0.22);
  background: rgba(139, 143, 163, 0.14);
}

.dark .el-alert__title {
  color: inherit;
}

.dark .el-alert {
  border-radius: 16px;
}

.dark .el-table,
.dark .el-table__inner-wrapper,
.dark .el-table th.el-table__cell,
.dark .el-table tr,
.dark .el-table td.el-table__cell {
  background-color: transparent;
}

.dark .el-table th.el-table__cell {
  color: #c8ccda;
  background: rgba(255, 255, 255, 0.08);
}

.dark .el-table__body tr:hover > td.el-table__cell {
  background: rgba(255, 255, 255, 0.07);
}

.dark .el-menu,
.dark .sample-menu {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(24, 26, 39, 0.42);
}

.dark .el-tabs__item,
.dark .el-menu-item,
.dark .brand-block p,
.dark .sample-card p,
.dark .token-row label {
  color: #a9aebf;
}

.dark .section-title h2,
.dark .preview-heading h2 {
  color: #f5f7ff;
}

.dark .guide-panel p,
.dark .guide-steps,
.dark .guide-list,
.dark .guide-code,
.dark .css-compat-copy {
  color: #d8deef;
}

.dark .panel-section.first,
.dark .panel-section + .panel-section {
  border-color: rgba(255, 255, 255, 0.18);
}

.dark .guide-code,
.dark .css-compat-panel {
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(8, 10, 18, 0.48);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px) saturate(125%);
  -webkit-backdrop-filter: blur(16px) saturate(125%);
}

.dark .swatch-item {
  color: #f5f7ff;
}

.dark .swatch-item code {
  color: #a9aebf;
}
`

const dataWallLightCss = String.raw`
.studio-shell {
  color: #e0f2fe;
  background-color: #05131f;
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 211, 238, 0.08) 1px, transparent 1px),
    linear-gradient(135deg, #05131f 0%, #082f49 46%, #111827 100%);
  background-size: 32px 32px, 32px 32px, auto;
}

.studio-header,
.editor-panel,
.preview-panel,
.preview-card,
.el-card,
.el-dialog,
.el-message-box,
.el-drawer,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  color: #e0f2fe;
  border-color: rgba(34, 211, 238, 0.24);
  background: rgba(8, 29, 48, 0.88);
  box-shadow:
    inset 0 1px 0 rgba(125, 211, 252, 0.14),
    0 18px 48px rgba(0, 0, 0, 0.34),
    0 0 28px rgba(34, 211, 238, 0.08);
}

.brand-mark,
.token-swatch,
.stat-card {
  color: #22d3ee;
  border-color: rgba(34, 211, 238, 0.34);
  background: rgba(8, 47, 73, 0.72);
  box-shadow: inset 0 0 18px rgba(34, 211, 238, 0.14);
}

.brand-block p,
.sample-card p,
.section-title h2,
.preview-heading h2,
.token-row label {
  color: #bae6fd;
}

.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner {
  color: #e0f2fe;
  border-color: rgba(34, 211, 238, 0.26);
  background: rgba(6, 24, 38, 0.78);
  box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.18) inset;
}

.el-input__inner,
.el-textarea__inner {
  color: #e0f2fe;
}

.el-table,
.el-table__inner-wrapper,
.el-table th.el-table__cell,
.el-table tr,
.el-table td.el-table__cell {
  background-color: transparent;
}

.el-table th.el-table__cell {
  color: #67e8f9;
  background: rgba(8, 47, 73, 0.78);
}

.el-table__body tr:hover > td.el-table__cell {
  background: rgba(34, 211, 238, 0.08);
}

.el-button--primary {
  box-shadow: 0 0 18px rgba(34, 211, 238, 0.32);
}

.el-alert,
.el-tag,
.el-menu,
.sample-menu {
  border-color: rgba(34, 211, 238, 0.18);
  background-color: rgba(8, 47, 73, 0.62);
}

.el-tabs__item,
.el-menu-item {
  color: #bae6fd;
}

.el-tabs__item.is-active,
.el-menu-item.is-active {
  color: #22d3ee;
  text-shadow: 0 0 12px rgba(34, 211, 238, 0.36);
}
`

const dataWallDarkCss = String.raw`
.dark .studio-shell {
  color: #e0f2fe;
  background-color: #030b14;
  background-image:
    linear-gradient(rgba(34, 211, 238, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(167, 139, 250, 0.06) 1px, transparent 1px),
    linear-gradient(135deg, #030b14 0%, #082f49 44%, #111827 100%);
  background-size: 32px 32px, 32px 32px, auto;
}

.dark .studio-header,
.dark .editor-panel,
.dark .preview-panel,
.dark .preview-card,
.dark .el-card,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  color: #e0f2fe;
  border-color: rgba(34, 211, 238, 0.22);
  background: rgba(3, 14, 26, 0.88);
  box-shadow:
    inset 0 1px 0 rgba(125, 211, 252, 0.12),
    0 22px 56px rgba(0, 0, 0, 0.42),
    0 0 32px rgba(34, 211, 238, 0.08);
}

.dark .brand-mark,
.dark .token-swatch,
.dark .stat-card {
  color: #67e8f9;
  border-color: rgba(34, 211, 238, 0.30);
  background: rgba(8, 47, 73, 0.56);
  box-shadow: inset 0 0 18px rgba(34, 211, 238, 0.12);
}

.dark .brand-block p,
.dark .sample-card p,
.dark .section-title h2,
.dark .preview-heading h2,
.dark .token-row label {
  color: #bae6fd;
}

.dark .el-input__wrapper,
.dark .el-textarea__inner,
.dark .el-select__wrapper,
.dark .el-input-number,
.dark .el-checkbox-button__inner,
.dark .el-radio-button__inner {
  color: #e0f2fe;
  border-color: rgba(34, 211, 238, 0.22);
  background: rgba(3, 14, 26, 0.78);
  box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.16) inset;
}

.dark .el-input__inner,
.dark .el-textarea__inner {
  color: #e0f2fe;
}

.dark .el-table,
.dark .el-table__inner-wrapper,
.dark .el-table th.el-table__cell,
.dark .el-table tr,
.dark .el-table td.el-table__cell {
  background-color: transparent;
}

.dark .el-table th.el-table__cell {
  color: #67e8f9;
  background: rgba(8, 47, 73, 0.68);
}

.dark .el-table__body tr:hover > td.el-table__cell {
  background: rgba(34, 211, 238, 0.08);
}
`

const neoBrutalLightCss = String.raw`
.studio-shell {
  background: #fff7d6;
}

.studio-header,
.editor-panel,
.preview-panel,
.preview-section,
.el-card,
.el-dialog,
.el-message-box,
.el-drawer,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  border: 2px solid #111827;
  background: #fffdf2;
  box-shadow: 6px 6px 0 #111827;
}

.brand-mark,
.swatch-item,
.radius-demo,
.type-demo,
.shadow-demo,
.loading-box,
.carousel-panel,
.sample-anchor {
  border: 2px solid #111827;
  background: #ffffff;
  box-shadow: 4px 4px 0 #111827;
}

.el-button:not(.is-text):not(.is-link),
.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner,
.el-tag,
.el-alert {
  border: 2px solid #111827;
  box-shadow: 3px 3px 0 #111827;
}

.el-button:not(.is-text):not(.is-link):active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 #111827;
}

.el-button--primary,
.el-switch.is-checked .el-switch__core,
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-radio__input.is-checked .el-radio__inner {
  border-color: #111827;
}

.el-table,
.el-table__inner-wrapper,
.el-table th.el-table__cell,
.el-table tr,
.el-table td.el-table__cell {
  background-color: #fffdf2;
}

.el-table th.el-table__cell {
  color: #111827;
  background: #fde047;
}

.el-tabs__active-bar {
  height: 4px;
  background: #7c3aed;
}

.sample-menu {
  border: 2px solid #111827;
  background: #ffffff;
}
`

const neoBrutalDarkCss = String.raw`
.dark .studio-shell {
  background: #141019;
}

.dark .studio-header,
.dark .editor-panel,
.dark .preview-panel,
.dark .preview-section,
.dark .el-card,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  border: 2px solid #fef08a;
  background: #1f1830;
  box-shadow: 6px 6px 0 #fef08a;
}

.dark .brand-mark,
.dark .swatch-item,
.dark .radius-demo,
.dark .type-demo,
.dark .shadow-demo,
.dark .loading-box,
.dark .carousel-panel,
.dark .sample-anchor {
  border: 2px solid #fef08a;
  background: #21192e;
  box-shadow: 4px 4px 0 #fef08a;
}

.dark .el-button:not(.is-text):not(.is-link),
.dark .el-input__wrapper,
.dark .el-textarea__inner,
.dark .el-select__wrapper,
.dark .el-input-number,
.dark .el-checkbox-button__inner,
.dark .el-radio-button__inner,
.dark .el-tag,
.dark .el-alert {
  border: 2px solid #fef08a;
  box-shadow: 3px 3px 0 #fef08a;
}

.dark .el-button:not(.is-text):not(.is-link):active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 #fef08a;
}

.dark .el-table,
.dark .el-table__inner-wrapper,
.dark .el-table th.el-table__cell,
.dark .el-table tr,
.dark .el-table td.el-table__cell {
  background-color: #1f1830;
}

.dark .el-table th.el-table__cell {
  color: #fef08a;
  background: #3b255f;
}

.dark .el-tabs__active-bar {
  height: 4px;
  background: #fef08a;
}

.dark .sample-menu {
  border: 2px solid #fef08a;
  background: #21192e;
}
`

const clayPopLightCss = String.raw`
.studio-shell {
  background: #fff7ed;
}

.studio-header,
.editor-panel,
.preview-panel,
.preview-section,
.el-card,
.el-dialog,
.el-message-box,
.el-drawer,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  border-color: rgba(251, 146, 60, 0.24);
  background: #fffaf4;
  box-shadow: 0 14px 0 rgba(251, 146, 60, 0.10), 0 22px 44px rgba(124, 45, 18, 0.08);
}

.brand-mark,
.swatch-item,
.radius-demo,
.type-demo,
.shadow-demo,
.loading-box,
.carousel-panel,
.sample-anchor,
.el-card {
  border-radius: 18px;
}

.el-button:not(.is-text):not(.is-link),
.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner,
.el-tag,
.el-alert {
  border-color: rgba(251, 146, 60, 0.28);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.82), 0 8px 18px rgba(124, 45, 18, 0.08);
}

.el-button:not(.is-text):not(.is-link):hover {
  transform: translateY(-1px);
}

.el-table,
.el-table__inner-wrapper,
.el-table th.el-table__cell,
.el-table tr,
.el-table td.el-table__cell {
  background-color: transparent;
}

.el-table th.el-table__cell {
  color: #7c2d12;
  background: #ffedd5;
}

.el-tabs__item.is-active,
.el-menu-item.is-active {
  font-weight: 700;
}
`

const clayPopDarkCss = String.raw`
.dark .studio-shell {
  background: #1f1b24;
}

.dark .studio-header,
.dark .editor-panel,
.dark .preview-panel,
.dark .preview-section,
.dark .el-card,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  border-color: rgba(251, 146, 60, 0.22);
  background: #2a2230;
  box-shadow: 0 14px 0 rgba(251, 146, 60, 0.10), 0 24px 48px rgba(0, 0, 0, 0.26);
}

.dark .brand-mark,
.dark .swatch-item,
.dark .radius-demo,
.dark .type-demo,
.dark .shadow-demo,
.dark .loading-box,
.dark .carousel-panel,
.dark .sample-anchor,
.dark .el-card {
  border-radius: 18px;
}

.dark .el-button:not(.is-text):not(.is-link),
.dark .el-input__wrapper,
.dark .el-textarea__inner,
.dark .el-select__wrapper,
.dark .el-input-number,
.dark .el-checkbox-button__inner,
.dark .el-radio-button__inner,
.dark .el-tag,
.dark .el-alert {
  border-color: rgba(251, 146, 60, 0.22);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 8px 20px rgba(0, 0, 0, 0.24);
}

.dark .el-table,
.dark .el-table__inner-wrapper,
.dark .el-table th.el-table__cell,
.dark .el-table tr,
.dark .el-table td.el-table__cell {
  background-color: transparent;
}

.dark .el-table th.el-table__cell {
  color: #fed7aa;
  background: #3d2b24;
}
`

const softNeumorphLightCss = String.raw`
.studio-shell {
  background: #e8eef5;
}

.studio-header,
.editor-panel,
.preview-panel,
.preview-section,
.el-card,
.el-dialog,
.el-message-box,
.el-drawer,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  border-color: rgba(148, 163, 184, 0.24);
  background: #eef3f8;
  box-shadow: 10px 10px 24px rgba(148, 163, 184, 0.42), -10px -10px 24px rgba(255, 255, 255, 0.88);
}

.brand-mark,
.swatch-item,
.radius-demo,
.type-demo,
.shadow-demo,
.loading-box,
.carousel-panel,
.sample-anchor {
  border-color: rgba(148, 163, 184, 0.20);
  background: #eef3f8;
  box-shadow: 7px 7px 16px rgba(148, 163, 184, 0.36), -7px -7px 16px rgba(255, 255, 255, 0.88);
}

.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner {
  border-color: transparent;
  background: #e8eef5;
  box-shadow: inset 5px 5px 12px rgba(148, 163, 184, 0.34), inset -5px -5px 12px rgba(255, 255, 255, 0.82);
}

.el-button:not(.is-text):not(.is-link),
.el-tag,
.el-alert {
  border-color: rgba(148, 163, 184, 0.22);
  box-shadow: 6px 6px 14px rgba(148, 163, 184, 0.30), -6px -6px 14px rgba(255, 255, 255, 0.82);
}

.el-button:not(.is-text):not(.is-link):active {
  box-shadow: inset 4px 4px 10px rgba(37, 99, 235, 0.20), inset -4px -4px 10px rgba(255, 255, 255, 0.74);
}

.el-table,
.el-table__inner-wrapper,
.el-table th.el-table__cell,
.el-table tr,
.el-table td.el-table__cell {
  background-color: transparent;
}

.el-table th.el-table__cell {
  background: #dfe7f0;
}
`

const softNeumorphDarkCss = String.raw`
.dark .studio-shell {
  background: #111827;
}

.dark .studio-header,
.dark .editor-panel,
.dark .preview-panel,
.dark .preview-section,
.dark .el-card,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  border-color: rgba(71, 85, 105, 0.42);
  background: #182235;
  box-shadow: 10px 10px 24px rgba(0, 0, 0, 0.36), -10px -10px 24px rgba(51, 65, 85, 0.22);
}

.dark .brand-mark,
.dark .swatch-item,
.dark .radius-demo,
.dark .type-demo,
.dark .shadow-demo,
.dark .loading-box,
.dark .carousel-panel,
.dark .sample-anchor {
  border-color: rgba(71, 85, 105, 0.38);
  background: #182235;
  box-shadow: 7px 7px 16px rgba(0, 0, 0, 0.32), -7px -7px 16px rgba(51, 65, 85, 0.18);
}

.dark .el-input__wrapper,
.dark .el-textarea__inner,
.dark .el-select__wrapper,
.dark .el-input-number,
.dark .el-checkbox-button__inner,
.dark .el-radio-button__inner {
  border-color: transparent;
  background: #111827;
  box-shadow: inset 5px 5px 12px rgba(0, 0, 0, 0.32), inset -5px -5px 12px rgba(51, 65, 85, 0.16);
}

.dark .el-button:not(.is-text):not(.is-link),
.dark .el-tag,
.dark .el-alert {
  border-color: rgba(71, 85, 105, 0.34);
  box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.28), -6px -6px 14px rgba(51, 65, 85, 0.14);
}

.dark .el-table,
.dark .el-table__inner-wrapper,
.dark .el-table th.el-table__cell,
.dark .el-table tr,
.dark .el-table td.el-table__cell {
  background-color: transparent;
}

.dark .el-table th.el-table__cell {
  background: #1f2937;
}
`

const monoEditorialLightCss = String.raw`
.studio-shell {
  background: #f7f7f4;
}

.studio-header,
.editor-panel,
.preview-panel,
.preview-section,
.el-card,
.el-dialog,
.el-message-box,
.el-drawer,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  border-color: #111827;
  background: #ffffff;
  box-shadow: none;
}

.el-button:not(.is-text):not(.is-link),
.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner,
.el-tag,
.el-alert,
.sample-menu,
.sample-anchor {
  border-color: #111827;
  box-shadow: none;
}

.el-table th.el-table__cell {
  color: #111827;
  background: #f1f1ee;
}

.el-tabs__active-bar {
  height: 2px;
  background: #111827;
}
`

const monoEditorialDarkCss = String.raw`
.dark .studio-shell {
  background: #0f1115;
}

.dark .studio-header,
.dark .editor-panel,
.dark .preview-panel,
.dark .preview-section,
.dark .el-card,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  border-color: #d9dde7;
  background: #151821;
  box-shadow: none;
}

.dark .el-button:not(.is-text):not(.is-link),
.dark .el-input__wrapper,
.dark .el-textarea__inner,
.dark .el-select__wrapper,
.dark .el-input-number,
.dark .el-checkbox-button__inner,
.dark .el-radio-button__inner,
.dark .el-tag,
.dark .el-alert,
.dark .sample-menu,
.dark .sample-anchor {
  border-color: #596173;
  box-shadow: none;
}

.dark .el-table th.el-table__cell {
  color: #f5f7ff;
  background: #1c202b;
}
`

const bentoMintLightCss = String.raw`
.studio-shell {
  background: #edf8f4;
}

.studio-header,
.editor-panel,
.preview-panel,
.preview-section,
.el-card,
.el-dialog,
.el-message-box,
.el-drawer,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  border-color: rgba(13, 148, 136, 0.18);
  background: #fbfffd;
  box-shadow: 0 12px 30px rgba(15, 118, 110, 0.08);
}

.preview-section:nth-of-type(3n + 1) {
  background: #f0fdfa;
}

.preview-section:nth-of-type(3n + 2) {
  background: #f0f9ff;
}

.preview-section:nth-of-type(3n) {
  background: #fff7ed;
}

.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner,
.el-tag,
.el-alert,
.sample-menu,
.sample-anchor {
  border-color: rgba(13, 148, 136, 0.18);
  box-shadow: 0 6px 16px rgba(15, 118, 110, 0.06);
}

.el-table th.el-table__cell {
  background: #ccfbf1;
}
`

const bentoMintDarkCss = String.raw`
.dark .studio-shell {
  background: #10191a;
}

.dark .studio-header,
.dark .editor-panel,
.dark .preview-panel,
.dark .preview-section,
.dark .el-card,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  border-color: rgba(45, 212, 191, 0.16);
  background: #142224;
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.28);
}

.dark .preview-section:nth-of-type(3n + 1) {
  background: #122b29;
}

.dark .preview-section:nth-of-type(3n + 2) {
  background: #132739;
}

.dark .preview-section:nth-of-type(3n) {
  background: #2b2117;
}

.dark .el-table th.el-table__cell {
  color: #ccfbf1;
  background: #123532;
}
`

const flatCandyLightCss = String.raw`
.studio-shell {
  background: #f7fbff;
}

.studio-header,
.editor-panel,
.preview-panel,
.preview-section,
.el-card,
.el-dialog,
.el-message-box,
.el-drawer,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  border-color: #d8e3f0;
  background: #ffffff;
  box-shadow: none;
}

.el-button:not(.is-text):not(.is-link),
.el-tag,
.el-alert {
  border-width: 0;
  box-shadow: none;
}

.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner {
  border-color: #d8e3f0;
  background: #f7fbff;
  box-shadow: none;
}

.el-table th.el-table__cell {
  background: #e0f2fe;
}
`

const flatCandyDarkCss = String.raw`
.dark .studio-shell {
  background: #15131d;
}

.dark .studio-header,
.dark .editor-panel,
.dark .preview-panel,
.dark .preview-section,
.dark .el-card,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  border-color: #3b3651;
  background: #1d1a29;
  box-shadow: none;
}

.dark .el-button:not(.is-text):not(.is-link),
.dark .el-tag,
.dark .el-alert {
  border-width: 0;
  box-shadow: none;
}

.dark .el-input__wrapper,
.dark .el-textarea__inner,
.dark .el-select__wrapper,
.dark .el-input-number,
.dark .el-checkbox-button__inner,
.dark .el-radio-button__inner {
  border-color: #3b3651;
  background: #171420;
  box-shadow: none;
}
`

const midnightNeonLightCss = String.raw`
.studio-shell {
  color: #e5f3ff;
  background: #101014;
}

.studio-header,
.editor-panel,
.preview-panel,
.preview-section,
.el-card,
.el-dialog,
.el-message-box,
.el-drawer,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  color: #e5f3ff;
  border-color: rgba(34, 211, 238, 0.22);
  background: #171820;
  box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.08), 0 18px 48px rgba(0, 0, 0, 0.32);
}

.brand-block p,
.sample-card p,
.section-title h2,
.preview-heading h2,
.token-row label {
  color: #b7e7f5;
}

.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner,
.sample-menu,
.sample-anchor {
  color: #e5f3ff;
  border-color: rgba(34, 211, 238, 0.20);
  background: #11131b;
  box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.08);
}

.el-button--primary {
  box-shadow: 0 0 18px rgba(34, 211, 238, 0.26);
}

.el-table th.el-table__cell {
  color: #67e8f9;
  background: #111b24;
}
`

const midnightNeonDarkCss = String.raw`
.dark .studio-shell {
  color: #e5f3ff;
  background: #08090f;
}

.dark .studio-header,
.dark .editor-panel,
.dark .preview-panel,
.dark .preview-section,
.dark .el-card,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  color: #e5f3ff;
  border-color: rgba(34, 211, 238, 0.20);
  background: #101119;
  box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.08), 0 20px 52px rgba(0, 0, 0, 0.42);
}

.dark .brand-block p,
.dark .sample-card p,
.dark .section-title h2,
.dark .preview-heading h2,
.dark .token-row label {
  color: #b7e7f5;
}
`

const phantomRedLightCss = String.raw`
.studio-shell {
  position: relative;
  isolation: isolate;
  color: #111111;
  background:
    linear-gradient(128deg, transparent 0 16%, rgba(230, 0, 18, 0.96) 16% 36%, transparent 36% 100%),
    repeating-linear-gradient(116deg, rgba(255, 255, 255, 0.10) 0 2px, transparent 2px 18px),
    linear-gradient(135deg, #050505 0%, #111111 45%, #e60012 45%, #e60012 60%, #050505 60% 100%);
}

.studio-shell::before {
  content: '';
  position: absolute;
  inset: 82px 18px 18px;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(102deg, transparent 0 11%, rgba(255, 255, 255, 0.96) 11% 18%, transparent 18% 100%),
    linear-gradient(76deg, transparent 0 63%, rgba(230, 0, 18, 0.88) 63% 70%, transparent 70% 100%);
  clip-path: polygon(0 3%, 100% 0, 96% 100%, 2% 96%);
  opacity: 0.54;
}

.studio-header,
.studio-main,
.status-banner {
  position: relative;
  z-index: 1;
}

.studio-header,
.editor-panel,
.preview-panel,
.preview-section,
.el-card,
.el-dialog,
.el-message-box,
.el-drawer,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  border: 3px solid #111111;
  border-radius: 2px;
  background: #fffaf2;
  box-shadow: 8px 8px 0 #111111, 12px 12px 0 rgba(230, 0, 18, 0.88);
}

.studio-header {
  border-width: 0 0 4px;
}

.brand-block h1,
.section-title h2,
.preview-heading h2 {
  color: #111111;
  font-family: 'Oswald', 'Impact', 'Arial Narrow', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
}

.brand-block p,
.sample-card p,
.token-row label,
.feedback-label {
  color: #2a2a2a;
}

.brand-mark,
.swatch-item,
.radius-demo,
.type-demo,
.shadow-demo,
.loading-box,
.carousel-panel,
.sample-menu,
.sample-anchor {
  border: 2px solid #111111;
  border-radius: 2px;
  background: #ffffff;
  box-shadow: 5px 5px 0 #111111;
}

.el-button:not(.is-text):not(.is-link),
.el-tag,
.el-alert,
.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner {
  border: 2px solid #111111;
  border-radius: 2px;
  box-shadow: 4px 4px 0 #111111;
}

.el-button:not(.is-text):not(.is-link),
.el-tag {
  clip-path: polygon(6px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
  font-family: 'Oswald', 'Impact', 'Arial Narrow', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
}

.el-button--primary,
.el-tag--primary {
  color: #ffffff;
  background: #e60012;
}

.el-button--success,
.el-tag--success {
  color: #ffffff;
  background: #00a86b;
}

.el-button--warning,
.el-tag--warning {
  color: #111111;
  background: #ffd400;
}

.el-button--danger,
.el-tag--danger {
  color: #ffffff;
  background: #c50018;
}

.el-tabs__active-bar {
  height: 4px;
  background: #e60012;
}

.el-table,
.el-table__inner-wrapper,
.el-table th.el-table__cell,
.el-table tr,
.el-table td.el-table__cell {
  background-color: transparent;
}

.el-table th.el-table__cell {
  color: #ffffff;
  background: #111111;
}
`

const phantomRedDarkCss = String.raw`
.dark .studio-shell {
  position: relative;
  isolation: isolate;
  color: #fffaf2;
  background:
    linear-gradient(126deg, transparent 0 13%, rgba(230, 0, 18, 0.94) 13% 30%, transparent 30% 100%),
    repeating-linear-gradient(118deg, rgba(255, 255, 255, 0.08) 0 2px, transparent 2px 17px),
    linear-gradient(135deg, #000000 0%, #101010 42%, #5a0007 42%, #e60012 55%, #050505 55% 100%);
}

.dark .studio-shell::before {
  content: '';
  position: absolute;
  inset: 82px 18px 18px;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(102deg, transparent 0 11%, rgba(255, 250, 242, 0.20) 11% 18%, transparent 18% 100%),
    linear-gradient(76deg, transparent 0 63%, rgba(230, 0, 18, 0.78) 63% 70%, transparent 70% 100%);
  clip-path: polygon(0 3%, 100% 0, 96% 100%, 2% 96%);
  opacity: 0.72;
}

.dark .studio-header,
.dark .studio-main,
.dark .status-banner {
  position: relative;
  z-index: 1;
}

.dark .studio-header,
.dark .editor-panel,
.dark .preview-panel,
.dark .preview-section,
.dark .el-card,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  color: #fffaf2;
  border: 3px solid #fffaf2;
  border-radius: 2px;
  background: #101010;
  box-shadow: 8px 8px 0 #e60012, 12px 12px 0 rgba(0, 0, 0, 0.76);
}

.dark .studio-header {
  border-width: 0 0 4px;
}

.dark .brand-block h1,
.dark .section-title h2,
.dark .preview-heading h2 {
  color: #ffffff;
  font-family: 'Oswald', 'Impact', 'Arial Narrow', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  text-shadow: 3px 3px 0 #e60012;
}

.dark .brand-block p,
.dark .sample-card p,
.dark .token-row label,
.dark .feedback-label {
  color: #f3d8d8;
}

.dark .brand-mark,
.dark .swatch-item,
.dark .radius-demo,
.dark .type-demo,
.dark .shadow-demo,
.dark .loading-box,
.dark .carousel-panel,
.dark .sample-menu,
.dark .sample-anchor {
  color: #fffaf2;
  border: 2px solid #fffaf2;
  border-radius: 2px;
  background: #171717;
  box-shadow: 5px 5px 0 #e60012;
}

.dark .el-button:not(.is-text):not(.is-link),
.dark .el-tag,
.dark .el-alert,
.dark .el-input__wrapper,
.dark .el-textarea__inner,
.dark .el-select__wrapper,
.dark .el-input-number,
.dark .el-checkbox-button__inner,
.dark .el-radio-button__inner {
  border: 2px solid #fffaf2;
  border-radius: 2px;
  box-shadow: 4px 4px 0 #e60012;
}

.dark .el-button:not(.is-text):not(.is-link),
.dark .el-tag {
  clip-path: polygon(6px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
  font-family: 'Oswald', 'Impact', 'Arial Narrow', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
}

.dark .el-table th.el-table__cell {
  color: #111111;
  background: #fffaf2;
}
`

const cupertinoMinimalLightCss = String.raw`
.studio-shell {
  color: #1d1d1f;
  background: #f5f5f7;
}

.studio-header {
  border-bottom-color: rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.86);
  box-shadow: none;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

.editor-panel,
.preview-panel,
.preview-section,
.el-card,
.el-dialog,
.el-message-box,
.el-drawer,
.el-popover.el-popper,
.el-dropdown__popper .el-scrollbar,
.el-select__popper.el-popper,
.el-picker__popper.el-popper,
.el-cascader__dropdown.el-popper {
  border-color: rgba(0, 0, 0, 0.08);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.04);
}

.brand-mark,
.swatch-item,
.radius-demo,
.type-demo,
.shadow-demo,
.loading-box,
.carousel-panel,
.sample-menu,
.sample-anchor {
  border-color: rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  background: #fbfbfd;
  box-shadow: none;
}

.brand-block h1,
.section-title h2,
.preview-heading h2 {
  color: #1d1d1f;
  font-weight: 700;
}

.brand-block p,
.sample-card p,
.token-row label,
.feedback-label {
  color: #6e6e73;
}

.el-button:not(.is-text):not(.is-link),
.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-checkbox-button__inner,
.el-radio-button__inner,
.el-tag,
.el-alert {
  border-color: rgba(0, 0, 0, 0.08);
  border-radius: 9999px;
  box-shadow: none;
}

.el-input__wrapper,
.el-textarea__inner,
.el-select__wrapper,
.el-input-number,
.el-input-tag,
.el-input-tag__wrapper {
  border-radius: 12px;
  background: #fbfbfd;
}

.el-button--primary {
  border-color: #0071e3;
  background: #0071e3;
}

.el-button--primary:hover,
.el-button--primary:focus {
  border-color: #0077ed;
  background: #0077ed;
}

.el-table th.el-table__cell {
  color: #1d1d1f;
  background: #f5f5f7;
}

.el-tabs__active-bar,
.el-anchor__marker {
  background: #0071e3;
}
`

const cupertinoMinimalDarkCss = String.raw`
.dark .studio-shell {
  color: #f5f5f7;
  background: #000000;
}

.dark .studio-header {
  border-bottom-color: rgba(255, 255, 255, 0.14);
  background: rgba(22, 22, 23, 0.86);
  box-shadow: none;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

.dark .editor-panel,
.dark .preview-panel,
.dark .preview-section,
.dark .el-card,
.dark .el-dialog,
.dark .el-message-box,
.dark .el-drawer,
.dark .el-popover.el-popper,
.dark .el-dropdown__popper .el-scrollbar,
.dark .el-select__popper.el-popper,
.dark .el-picker__popper.el-popper,
.dark .el-cascader__dropdown.el-popper {
  color: #f5f5f7;
  border-color: rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  background: #1d1d1f;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.36);
}

.dark .brand-mark,
.dark .swatch-item,
.dark .radius-demo,
.dark .type-demo,
.dark .shadow-demo,
.dark .loading-box,
.dark .carousel-panel,
.dark .sample-menu,
.dark .sample-anchor {
  color: #f5f5f7;
  border-color: rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  background: #2c2c2e;
  box-shadow: none;
}

.dark .brand-block h1,
.dark .section-title h2,
.dark .preview-heading h2 {
  color: #f5f5f7;
  font-weight: 700;
}

.dark .brand-block p,
.dark .sample-card p,
.dark .token-row label,
.dark .feedback-label {
  color: #a1a1a6;
}

.dark .el-button:not(.is-text):not(.is-link),
.dark .el-input__wrapper,
.dark .el-textarea__inner,
.dark .el-select__wrapper,
.dark .el-input-number,
.dark .el-checkbox-button__inner,
.dark .el-radio-button__inner,
.dark .el-tag,
.dark .el-alert {
  border-color: rgba(255, 255, 255, 0.14);
  border-radius: 9999px;
  box-shadow: none;
}

.dark .el-input__wrapper,
.dark .el-textarea__inner,
.dark .el-select__wrapper,
.dark .el-input-number,
.dark .el-input-tag,
.dark .el-input-tag__wrapper {
  border-radius: 12px;
  background: #2c2c2e;
}

.dark .el-button--primary {
  border-color: #2997ff;
  background: #2997ff;
}

.dark .el-button--primary:hover,
.dark .el-button--primary:focus {
  border-color: #43a5ff;
  background: #43a5ff;
}

.dark .el-table th.el-table__cell {
  color: #f5f5f7;
  background: #2c2c2e;
}

.dark .el-tabs__active-bar,
.dark .el-anchor__marker {
  background: #2997ff;
}
`

const presetHtmlFontSizes: Record<string, string> = {
  'aura-blue': '16px',
  'glass-aurora': '17px',
  'cupertino-minimal': '17px',
  'data-wall': '18px',
  'neo-brutal': '17px',
  'clay-pop': '17px',
  'soft-neumorph': '16px',
  'mono-editorial': '17px',
  'bento-mint': '16px',
  'flat-candy': '16px',
  'midnight-neon': '17px',
  'phantom-red': '17px',
  'vben-admin': '16px',
  'emerald-console': '16px',
  'rose-quartz': '16px',
  'graphite-pro': '16px',
}

function applyPresetHtmlFontSize(preset: ThemePreset): ThemePreset {
  const tokens = preset.tokens
  if (!tokens || typeof tokens !== 'object') {
    return preset
  }

  const tokenObject = tokens as Record<string, unknown>
  const typography = tokenObject.typography
  const typographyObject = typography && typeof typography === 'object' ? (typography as Record<string, unknown>) : {}

  return {
    ...preset,
    tokens: {
      ...tokenObject,
      typography: {
        ...typographyObject,
        htmlFontSize: presetHtmlFontSizes[preset.id] ?? '16px',
      },
    },
  }
}

export const themePresets: ThemePreset[] = [
  {
    id: 'aura-blue',
    label: {
      'zh-CN': '灵光蓝',
      'en-US': 'Aura Blue',
    },
    swatches: ['#2563eb', '#16a34a', '#f8fafc'],
    tokens: cloneThemeTokens(DEFAULT_TOKENS),
  },
  {
    id: 'glass-aurora',
    label: {
      'zh-CN': '极光玻璃',
      'en-US': 'Glass Aurora',
    },
    swatches: ['#5b7cfa', '#f8f8fb', '#ffb86b'],
    tokens: {
      name: 'Glass Aurora',
      packageName: '@local/element-plus-theme-glass-aurora',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#111827',
        primary: '#5b7cfa',
        success: '#28c76f',
        warning: '#f5a524',
        danger: '#f31260',
        error: '#f31260',
        info: '#8b8fa3',
      },
      radius: {
        base: '18px',
        small: '14px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#232634',
        regular: '#545866',
        secondary: '#7b8090',
        placeholder: '#a2a6b3',
        disabled: '#c9ccd6',
      },
      border: {
        base: '#e6e8f0',
        light: '#eef0f5',
        lighter: '#f4f5f9',
        extraLight: '#fafbff',
        dark: '#d6dae5',
        darker: '#c4c9d6',
        width: '1px',
        style: 'solid',
        hover: '#cfd5e4',
      },
      fill: {
        base: '#f4f5f9',
        light: '#f8f8fb',
        lighter: '#fbfbfd',
        extraLight: '#ffffff',
        dark: '#e8ebf3',
        darker: '#dfe3ee',
        blank: '#ffffff',
      },
      background: {
        page: '#f8f8fb',
        base: '#fbfbfd',
        overlay: '#ffffff',
      },
      shadow: {
        base: 'inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 18px 48px rgba(91, 124, 250, 0.10), 0 24px 60px rgba(31, 35, 52, 0.08)',
        light: 'inset 0 1px 0 rgba(255, 255, 255, 0.88), 0 12px 28px rgba(31, 35, 52, 0.06)',
        lighter: 'inset 0 1px 0 rgba(255, 255, 255, 0.82), 0 8px 18px rgba(31, 35, 52, 0.05)',
        dark: 'inset 0 1px 0 rgba(255, 255, 255, 0.90), 0 28px 76px rgba(91, 124, 250, 0.14), 0 30px 80px rgba(31, 35, 52, 0.12)',
      },
      typography: {
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
        base: 'rgba(15, 23, 42, 0.72)',
        light: 'rgba(15, 23, 42, 0.58)',
        lighter: 'rgba(15, 23, 42, 0.38)',
      },
      mask: {
        base: 'rgba(255, 255, 255, 0.72)',
        extraLight: 'rgba(255, 255, 255, 0.28)',
      },
      cssOverrides: {
        light: `${glassAuroraLightCss}\n${createComponentCoverageCss({
          surface: 'rgba(255, 255, 255, 0.56)',
          surfaceAlt: 'rgba(255, 255, 255, 0.68)',
          surfaceMuted: 'rgba(255, 255, 255, 0.42)',
          border: 'rgba(255, 255, 255, 0.62)',
          text: '#232634',
          textMuted: '#626777',
          primary: '#5b7cfa',
          primaryText: '#ffffff',
          activeBg: 'rgba(91, 124, 250, 0.14)',
          hoverBg: 'rgba(91, 124, 250, 0.10)',
          tableHeaderBg: 'rgba(255, 255, 255, 0.52)',
          tableHeaderText: '#232634',
          shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.86), 0 18px 48px rgba(91, 124, 250, 0.10)',
          softShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.82), 0 8px 18px rgba(31, 35, 52, 0.06)',
          radius: '18px',
          accent: '#ffb86b',
        })}`,
        dark: `${glassAuroraDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: 'rgba(30, 32, 46, 0.56)',
          surfaceAlt: 'rgba(30, 32, 46, 0.70)',
          surfaceMuted: 'rgba(45, 48, 70, 0.58)',
          border: 'rgba(255, 255, 255, 0.22)',
          text: '#f5f7ff',
          textMuted: '#c0c5d8',
          primary: '#8ba1ff',
          primaryText: '#111827',
          activeBg: 'rgba(139, 161, 255, 0.18)',
          hoverBg: 'rgba(139, 161, 255, 0.12)',
          tableHeaderBg: 'rgba(255, 255, 255, 0.10)',
          tableHeaderText: '#f5f7ff',
          shadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 18px 48px rgba(0, 0, 0, 0.28)',
          softShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 8px 18px rgba(0, 0, 0, 0.18)',
          radius: '18px',
          accent: '#ffb86b',
        })}`,
      },
    },
  },
  {
    id: 'cupertino-minimal',
    label: {
      'zh-CN': '库比蒂诺极简',
      'en-US': 'Cupertino Minimal',
    },
    swatches: ['#0071e3', '#1d1d1f', '#f5f5f7'],
    tokens: {
      name: 'Cupertino Minimal',
      packageName: '@local/element-plus-theme-cupertino-minimal',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#1d1d1f',
        primary: '#0071e3',
        success: '#34c759',
        warning: '#ff9f0a',
        danger: '#ff3b30',
        error: '#ff3b30',
        info: '#8e8e93',
      },
      radius: {
        base: '12px',
        small: '8px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#1d1d1f',
        regular: '#424245',
        secondary: '#6e6e73',
        placeholder: '#86868b',
        disabled: '#c7c7cc',
      },
      border: {
        base: '#d2d2d7',
        light: '#e5e5ea',
        lighter: '#f2f2f7',
        extraLight: '#fbfbfd',
        dark: '#b8b8be',
        darker: '#86868b',
        width: '1px',
        style: 'solid',
        hover: '#0071e3',
      },
      fill: {
        base: '#f5f5f7',
        light: '#fbfbfd',
        lighter: '#ffffff',
        extraLight: '#ffffff',
        dark: '#e5e5ea',
        darker: '#d2d2d7',
        blank: '#ffffff',
      },
      background: {
        page: '#f5f5f7',
        base: '#ffffff',
        overlay: '#ffffff',
      },
      shadow: {
        base: '0 12px 30px rgba(0, 0, 0, 0.04)',
        light: '0 8px 20px rgba(0, 0, 0, 0.04)',
        lighter: '0 2px 8px rgba(0, 0, 0, 0.04)',
        dark: '0 18px 44px rgba(0, 0, 0, 0.08)',
      },
      typography: {
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
        extraLarge: '21px',
        large: '18px',
        medium: '16px',
        base: '14px',
        small: '13px',
        extraSmall: '12px',
      },
      componentSize: {
        large: '42px',
        default: '34px',
        small: '26px',
      },
      overlay: {
        base: 'rgba(0, 0, 0, 0.72)',
        light: 'rgba(0, 0, 0, 0.54)',
        lighter: 'rgba(0, 0, 0, 0.32)',
      },
      mask: {
        base: 'rgba(245, 245, 247, 0.82)',
        extraLight: 'rgba(245, 245, 247, 0.32)',
      },
      cssOverrides: {
        light: `${cupertinoMinimalLightCss}\n${createComponentCoverageCss({
          surface: '#fbfbfd',
          surfaceAlt: '#ffffff',
          surfaceMuted: '#f5f5f7',
          border: 'rgba(0, 0, 0, 0.08)',
          text: '#1d1d1f',
          textMuted: '#6e6e73',
          primary: '#0071e3',
          primaryText: '#ffffff',
          activeBg: '#e8f2ff',
          hoverBg: '#f5f5f7',
          tableHeaderBg: '#f5f5f7',
          tableHeaderText: '#1d1d1f',
          shadow: '0 12px 30px rgba(0, 0, 0, 0.04)',
          softShadow: 'none',
          radius: '14px',
          accent: '#34c759',
        })}`,
        dark: `${cupertinoMinimalDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: '#2c2c2e',
          surfaceAlt: '#1d1d1f',
          surfaceMuted: '#252527',
          border: 'rgba(255, 255, 255, 0.14)',
          text: '#f5f5f7',
          textMuted: '#a1a1a6',
          primary: '#2997ff',
          primaryText: '#000000',
          activeBg: '#0b2d4d',
          hoverBg: '#2c2c2e',
          tableHeaderBg: '#2c2c2e',
          tableHeaderText: '#f5f5f7',
          shadow: '0 18px 44px rgba(0, 0, 0, 0.36)',
          softShadow: 'none',
          radius: '14px',
          accent: '#30d158',
        })}`,
      },
    },
  },
  {
    id: 'data-wall',
    label: {
      'zh-CN': '数据大屏',
      'en-US': 'Data Wall',
    },
    swatches: ['#22d3ee', '#a78bfa', '#fbbf24'],
    tokens: {
      name: 'Data Wall',
      packageName: '@local/element-plus-theme-data-wall',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#020617',
        primary: '#22d3ee',
        success: '#34d399',
        warning: '#fbbf24',
        danger: '#fb7185',
        error: '#fb7185',
        info: '#a78bfa',
      },
      radius: {
        base: '2px',
        small: '2px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#e0f2fe',
        regular: '#bae6fd',
        secondary: '#67e8f9',
        placeholder: '#64748b',
        disabled: '#475569',
      },
      border: {
        base: '#155e75',
        light: '#1e7490',
        lighter: '#0e3a4b',
        extraLight: '#0a2b3d',
        dark: '#22d3ee',
        darker: '#67e8f9',
        width: '1px',
        style: 'solid',
        hover: '#38bdf8',
      },
      fill: {
        base: '#082f49',
        light: '#0c4a6e',
        lighter: '#12324f',
        extraLight: '#061b2e',
        dark: '#164e63',
        darker: '#155e75',
        blank: '#071a2c',
      },
      background: {
        page: '#05131f',
        base: '#0b2138',
        overlay: '#0f2f4f',
      },
      shadow: {
        base: '0 18px 48px rgba(0, 0, 0, 0.34), 0 0 28px rgba(34, 211, 238, 0.08)',
        light: '0 0 18px rgba(34, 211, 238, 0.18)',
        lighter: '0 0 8px rgba(34, 211, 238, 0.16)',
        dark: '0 24px 72px rgba(0, 0, 0, 0.46), 0 0 36px rgba(34, 211, 238, 0.12)',
      },
      typography: {
        fontFamily:
          "'Inter', 'DIN Alternate', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif",
        extraLarge: '22px',
        large: '18px',
        medium: '16px',
        base: '14px',
        small: '13px',
        extraSmall: '12px',
      },
      componentSize: {
        large: '42px',
        default: '34px',
        small: '26px',
      },
      overlay: {
        base: 'rgba(2, 6, 23, 0.84)',
        light: 'rgba(2, 6, 23, 0.72)',
        lighter: 'rgba(2, 6, 23, 0.52)',
      },
      mask: {
        base: 'rgba(2, 6, 23, 0.74)',
        extraLight: 'rgba(2, 6, 23, 0.32)',
      },
      cssOverrides: {
        light: `${dataWallLightCss}\n${createComponentCoverageCss({
          surface: 'rgba(6, 24, 38, 0.78)',
          surfaceAlt: 'rgba(8, 29, 48, 0.88)',
          surfaceMuted: 'rgba(8, 47, 73, 0.62)',
          border: 'rgba(34, 211, 238, 0.26)',
          text: '#e0f2fe',
          textMuted: '#bae6fd',
          primary: '#22d3ee',
          primaryText: '#03131f',
          activeBg: 'rgba(34, 211, 238, 0.14)',
          hoverBg: 'rgba(34, 211, 238, 0.08)',
          tableHeaderBg: 'rgba(8, 47, 73, 0.78)',
          tableHeaderText: '#67e8f9',
          shadow: 'inset 0 1px 0 rgba(125, 211, 252, 0.14), 0 18px 48px rgba(0, 0, 0, 0.34), 0 0 28px rgba(34, 211, 238, 0.08)',
          softShadow: '0 0 0 1px rgba(34, 211, 238, 0.18) inset, 0 0 18px rgba(34, 211, 238, 0.10)',
          radius: '2px',
          accent: '#a78bfa',
        })}`,
        dark: `${dataWallDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: 'rgba(3, 14, 26, 0.78)',
          surfaceAlt: 'rgba(3, 14, 26, 0.88)',
          surfaceMuted: 'rgba(8, 47, 73, 0.56)',
          border: 'rgba(34, 211, 238, 0.22)',
          text: '#e0f2fe',
          textMuted: '#bae6fd',
          primary: '#22d3ee',
          primaryText: '#03131f',
          activeBg: 'rgba(34, 211, 238, 0.14)',
          hoverBg: 'rgba(34, 211, 238, 0.08)',
          tableHeaderBg: 'rgba(8, 47, 73, 0.68)',
          tableHeaderText: '#67e8f9',
          shadow: 'inset 0 1px 0 rgba(125, 211, 252, 0.12), 0 22px 56px rgba(0, 0, 0, 0.42), 0 0 32px rgba(34, 211, 238, 0.08)',
          softShadow: '0 0 0 1px rgba(34, 211, 238, 0.16) inset, 0 0 18px rgba(34, 211, 238, 0.08)',
          radius: '2px',
          accent: '#a78bfa',
        })}`,
      },
    },
  },
  {
    id: 'neo-brutal',
    label: {
      'zh-CN': '新野兽派',
      'en-US': 'Neo Brutal',
    },
    swatches: ['#7c3aed', '#fde047', '#111827'],
    tokens: {
      name: 'Neo Brutal',
      packageName: '@local/element-plus-theme-neo-brutal',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#111827',
        primary: '#7c3aed',
        success: '#16a34a',
        warning: '#eab308',
        danger: '#ef4444',
        error: '#ef4444',
        info: '#0891b2',
      },
      radius: {
        base: '2px',
        small: '0',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#111827',
        regular: '#1f2937',
        secondary: '#4b5563',
        placeholder: '#6b7280',
        disabled: '#9ca3af',
      },
      border: {
        base: '#111827',
        light: '#374151',
        lighter: '#6b7280',
        extraLight: '#fde68a',
        dark: '#000000',
        darker: '#000000',
        width: '2px',
        style: 'solid',
        hover: '#7c3aed',
      },
      fill: {
        base: '#fef3c7',
        light: '#fff7d6',
        lighter: '#fffdf2',
        extraLight: '#ffffff',
        dark: '#fde047',
        darker: '#facc15',
        blank: '#ffffff',
      },
      background: {
        page: '#fff7d6',
        base: '#fffdf2',
        overlay: '#ffffff',
      },
      shadow: {
        base: '6px 6px 0 #111827',
        light: '4px 4px 0 #111827',
        lighter: '2px 2px 0 #111827',
        dark: '8px 8px 0 #111827',
      },
      typography: {
        fontFamily:
          "'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
        extraLarge: '22px',
        large: '18px',
        medium: '16px',
        base: '14px',
        small: '13px',
        extraSmall: '12px',
      },
      componentSize: {
        large: '42px',
        default: '34px',
        small: '28px',
      },
      overlay: {
        base: 'rgba(17, 24, 39, 0.86)',
        light: 'rgba(17, 24, 39, 0.74)',
        lighter: 'rgba(17, 24, 39, 0.54)',
      },
      mask: {
        base: 'rgba(255, 247, 214, 0.88)',
        extraLight: 'rgba(255, 247, 214, 0.34)',
      },
      cssOverrides: {
        light: `${neoBrutalLightCss}\n${createComponentCoverageCss({
          surface: '#ffffff',
          surfaceAlt: '#fffdf2',
          surfaceMuted: '#fff7d6',
          border: '#111827',
          text: '#111827',
          textMuted: '#374151',
          primary: '#7c3aed',
          primaryText: '#ffffff',
          activeBg: '#ede9fe',
          hoverBg: '#fef3c7',
          tableHeaderBg: '#fde047',
          tableHeaderText: '#111827',
          shadow: '6px 6px 0 #111827',
          softShadow: '3px 3px 0 #111827',
          radius: '2px',
          accent: '#fde047',
          fontWeight: '700',
        })}`,
        dark: `${neoBrutalDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: '#21192e',
          surfaceAlt: '#1f1830',
          surfaceMuted: '#2b2140',
          border: '#fef08a',
          text: '#fefce8',
          textMuted: '#e9d5ff',
          primary: '#fef08a',
          primaryText: '#141019',
          activeBg: '#3b255f',
          hoverBg: '#322348',
          tableHeaderBg: '#3b255f',
          tableHeaderText: '#fef08a',
          shadow: '6px 6px 0 #fef08a',
          softShadow: '3px 3px 0 #fef08a',
          radius: '2px',
          accent: '#c084fc',
          fontWeight: '700',
        })}`,
      },
    },
  },
  {
    id: 'clay-pop',
    label: {
      'zh-CN': '软陶彩块',
      'en-US': 'Clay Pop',
    },
    swatches: ['#f97316', '#14b8a6', '#6366f1'],
    tokens: {
      name: 'Clay Pop',
      packageName: '@local/element-plus-theme-clay-pop',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#1f2937',
        primary: '#f97316',
        success: '#14b8a6',
        warning: '#eab308',
        danger: '#f43f5e',
        error: '#e11d48',
        info: '#6366f1',
      },
      radius: {
        base: '16px',
        small: '12px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#3a2418',
        regular: '#5f3d2a',
        secondary: '#8a5f45',
        placeholder: '#b48667',
        disabled: '#d6b79f',
      },
      border: {
        base: '#fed7aa',
        light: '#ffedd5',
        lighter: '#fff1e4',
        extraLight: '#fff7ed',
        dark: '#fdba74',
        darker: '#fb923c',
        width: '1px',
        style: 'solid',
        hover: '#f97316',
      },
      fill: {
        base: '#ffedd5',
        light: '#fff3e8',
        lighter: '#fff8f1',
        extraLight: '#fffaf4',
        dark: '#fed7aa',
        darker: '#fdba74',
        blank: '#fffaf4',
      },
      background: {
        page: '#fff7ed',
        base: '#fffaf4',
        overlay: '#fffaf4',
      },
      shadow: {
        base: '0 14px 0 rgba(251, 146, 60, 0.10), 0 22px 44px rgba(124, 45, 18, 0.08)',
        light: '0 8px 18px rgba(124, 45, 18, 0.08)',
        lighter: '0 4px 10px rgba(124, 45, 18, 0.06)',
        dark: '0 18px 0 rgba(251, 146, 60, 0.12), 0 28px 56px rgba(124, 45, 18, 0.12)',
      },
      typography: {
        fontFamily:
          "'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
        extraLarge: '21px',
        large: '18px',
        medium: '16px',
        base: '14px',
        small: '13px',
        extraSmall: '12px',
      },
      componentSize: {
        large: '42px',
        default: '34px',
        small: '26px',
      },
      overlay: {
        base: 'rgba(31, 41, 55, 0.78)',
        light: 'rgba(31, 41, 55, 0.64)',
        lighter: 'rgba(31, 41, 55, 0.42)',
      },
      mask: {
        base: 'rgba(255, 250, 244, 0.90)',
        extraLight: 'rgba(255, 250, 244, 0.34)',
      },
      cssOverrides: {
        light: `${clayPopLightCss}\n${createComponentCoverageCss({
          surface: '#fffaf4',
          surfaceAlt: '#fffaf4',
          surfaceMuted: '#fff3e8',
          border: 'rgba(251, 146, 60, 0.28)',
          text: '#3a2418',
          textMuted: '#8a5f45',
          primary: '#f97316',
          primaryText: '#ffffff',
          activeBg: '#ffedd5',
          hoverBg: '#fff3e8',
          tableHeaderBg: '#ffedd5',
          tableHeaderText: '#7c2d12',
          shadow: '0 14px 0 rgba(251, 146, 60, 0.10), 0 22px 44px rgba(124, 45, 18, 0.08)',
          softShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.82), 0 8px 18px rgba(124, 45, 18, 0.08)',
          radius: '16px',
          accent: '#14b8a6',
        })}`,
        dark: `${clayPopDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: '#2a2230',
          surfaceAlt: '#2a2230',
          surfaceMuted: '#3d2b24',
          border: 'rgba(251, 146, 60, 0.22)',
          text: '#ffedd5',
          textMuted: '#fed7aa',
          primary: '#fb923c',
          primaryText: '#1f1b24',
          activeBg: '#3d2b24',
          hoverBg: '#332735',
          tableHeaderBg: '#3d2b24',
          tableHeaderText: '#fed7aa',
          shadow: '0 14px 0 rgba(251, 146, 60, 0.10), 0 24px 48px rgba(0, 0, 0, 0.26)',
          softShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 8px 20px rgba(0, 0, 0, 0.24)',
          radius: '16px',
          accent: '#2dd4bf',
        })}`,
      },
    },
  },
  {
    id: 'soft-neumorph',
    label: {
      'zh-CN': '柔和拟物',
      'en-US': 'Soft Neumorph',
    },
    swatches: ['#2563eb', '#e8eef5', '#0f766e'],
    tokens: {
      name: 'Soft Neumorph',
      packageName: '@local/element-plus-theme-soft-neumorph',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#0f172a',
        primary: '#2563eb',
        success: '#0f766e',
        warning: '#b45309',
        danger: '#be123c',
        error: '#be123c',
        info: '#475569',
      },
      radius: {
        base: '12px',
        small: '8px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#102033',
        regular: '#334155',
        secondary: '#64748b',
        placeholder: '#94a3b8',
        disabled: '#b7c3d0',
      },
      border: {
        base: '#c8d3df',
        light: '#d5dee8',
        lighter: '#e3eaf1',
        extraLight: '#edf2f7',
        dark: '#9aaabd',
        darker: '#74859a',
        width: '1px',
        style: 'solid',
        hover: '#2563eb',
      },
      fill: {
        base: '#e8eef5',
        light: '#eef3f8',
        lighter: '#f4f7fb',
        extraLight: '#f8fbff',
        dark: '#d5dee8',
        darker: '#c8d3df',
        blank: '#eef3f8',
      },
      background: {
        page: '#e8eef5',
        base: '#eef3f8',
        overlay: '#f6f9fc',
      },
      shadow: {
        base: '10px 10px 24px rgba(148, 163, 184, 0.42), -10px -10px 24px rgba(255, 255, 255, 0.88)',
        light: '7px 7px 16px rgba(148, 163, 184, 0.36), -7px -7px 16px rgba(255, 255, 255, 0.88)',
        lighter: '4px 4px 10px rgba(148, 163, 184, 0.30), -4px -4px 10px rgba(255, 255, 255, 0.82)',
        dark: '14px 14px 32px rgba(148, 163, 184, 0.46), -14px -14px 32px rgba(255, 255, 255, 0.90)',
      },
      typography: {
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
        base: 'rgba(15, 23, 42, 0.78)',
        light: 'rgba(15, 23, 42, 0.64)',
        lighter: 'rgba(15, 23, 42, 0.44)',
      },
      mask: {
        base: 'rgba(232, 238, 245, 0.86)',
        extraLight: 'rgba(232, 238, 245, 0.32)',
      },
      cssOverrides: {
        light: `${softNeumorphLightCss}\n${createComponentCoverageCss({
          surface: '#e8eef5',
          surfaceAlt: '#eef3f8',
          surfaceMuted: '#dfe7f0',
          border: 'rgba(148, 163, 184, 0.24)',
          text: '#102033',
          textMuted: '#64748b',
          primary: '#2563eb',
          primaryText: '#ffffff',
          activeBg: '#dbeafe',
          hoverBg: '#e3eaf1',
          tableHeaderBg: '#dfe7f0',
          tableHeaderText: '#102033',
          shadow: '10px 10px 24px rgba(148, 163, 184, 0.42), -10px -10px 24px rgba(255, 255, 255, 0.88)',
          softShadow: '6px 6px 14px rgba(148, 163, 184, 0.30), -6px -6px 14px rgba(255, 255, 255, 0.82)',
          radius: '12px',
          accent: '#0f766e',
        })}`,
        dark: `${softNeumorphDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: '#111827',
          surfaceAlt: '#182235',
          surfaceMuted: '#1f2937',
          border: 'rgba(71, 85, 105, 0.42)',
          text: '#e5edf7',
          textMuted: '#cbd5e1',
          primary: '#60a5fa',
          primaryText: '#111827',
          activeBg: '#1e3a5f',
          hoverBg: '#1f2937',
          tableHeaderBg: '#1f2937',
          tableHeaderText: '#dbeafe',
          shadow: '10px 10px 24px rgba(0, 0, 0, 0.36), -10px -10px 24px rgba(51, 65, 85, 0.22)',
          softShadow: '6px 6px 14px rgba(0, 0, 0, 0.28), -6px -6px 14px rgba(51, 65, 85, 0.14)',
          radius: '12px',
          accent: '#5eead4',
        })}`,
      },
    },
  },
  {
    id: 'mono-editorial',
    label: {
      'zh-CN': '极简刊物',
      'en-US': 'Mono Editorial',
    },
    swatches: ['#111827', '#0f766e', '#f7f7f4'],
    tokens: {
      name: 'Mono Editorial',
      packageName: '@local/element-plus-theme-mono-editorial',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#111827',
        primary: '#111827',
        success: '#0f766e',
        warning: '#b45309',
        danger: '#be123c',
        error: '#be123c',
        info: '#4b5563',
      },
      radius: {
        base: '2px',
        small: '0',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#111827',
        regular: '#374151',
        secondary: '#6b7280',
        placeholder: '#9ca3af',
        disabled: '#d1d5db',
      },
      border: {
        base: '#111827',
        light: '#4b5563',
        lighter: '#d1d5db',
        extraLight: '#e5e7eb',
        dark: '#000000',
        darker: '#000000',
        width: '1px',
        style: 'solid',
        hover: '#111827',
      },
      fill: {
        base: '#f1f1ee',
        light: '#f7f7f4',
        lighter: '#fbfbf8',
        extraLight: '#ffffff',
        dark: '#e4e4df',
        darker: '#d4d4cd',
        blank: '#ffffff',
      },
      background: {
        page: '#f7f7f4',
        base: '#ffffff',
        overlay: '#ffffff',
      },
      shadow: {
        base: 'none',
        light: 'none',
        lighter: 'none',
        dark: 'none',
      },
      typography: {
        fontFamily:
          "'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
        extraLarge: '21px',
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
        base: 'rgba(17, 24, 39, 0.78)',
        light: 'rgba(17, 24, 39, 0.62)',
        lighter: 'rgba(17, 24, 39, 0.42)',
      },
      mask: {
        base: 'rgba(255, 255, 255, 0.88)',
        extraLight: 'rgba(255, 255, 255, 0.30)',
      },
      cssOverrides: {
        light: `${monoEditorialLightCss}\n${createComponentCoverageCss({
          surface: '#ffffff',
          surfaceAlt: '#ffffff',
          surfaceMuted: '#f1f1ee',
          border: '#111827',
          text: '#111827',
          textMuted: '#4b5563',
          primary: '#111827',
          primaryText: '#ffffff',
          activeBg: '#f1f1ee',
          hoverBg: '#f7f7f4',
          tableHeaderBg: '#f1f1ee',
          tableHeaderText: '#111827',
          shadow: 'none',
          softShadow: 'none',
          radius: '2px',
          accent: '#0f766e',
          fontWeight: '650',
        })}`,
        dark: `${monoEditorialDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: '#151821',
          surfaceAlt: '#151821',
          surfaceMuted: '#1c202b',
          border: '#596173',
          text: '#f5f7ff',
          textMuted: '#d9dde7',
          primary: '#f5f7ff',
          primaryText: '#0f1115',
          activeBg: '#242936',
          hoverBg: '#1c202b',
          tableHeaderBg: '#1c202b',
          tableHeaderText: '#f5f7ff',
          shadow: 'none',
          softShadow: 'none',
          radius: '2px',
          accent: '#5eead4',
          fontWeight: '650',
        })}`,
      },
    },
  },
  {
    id: 'bento-mint',
    label: {
      'zh-CN': 'Bento 薄荷',
      'en-US': 'Bento Mint',
    },
    swatches: ['#0d9488', '#38bdf8', '#f59e0b'],
    tokens: {
      name: 'Bento Mint',
      packageName: '@local/element-plus-theme-bento-mint',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#10201f',
        primary: '#0d9488',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#e11d48',
        error: '#e11d48',
        info: '#0284c7',
      },
      radius: {
        base: '14px',
        small: '10px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#12312f',
        regular: '#31514e',
        secondary: '#5f7974',
        placeholder: '#91a6a0',
        disabled: '#c6d5d0',
      },
      border: {
        base: '#b7e4dd',
        light: '#ccfbf1',
        lighter: '#e5fbf7',
        extraLight: '#f4fffc',
        dark: '#5eead4',
        darker: '#2dd4bf',
        width: '1px',
        style: 'solid',
        hover: '#0d9488',
      },
      fill: {
        base: '#ccfbf1',
        light: '#ecfdf5',
        lighter: '#f0fdfa',
        extraLight: '#fbfffd',
        dark: '#99f6e4',
        darker: '#5eead4',
        blank: '#ffffff',
      },
      background: {
        page: '#edf8f4',
        base: '#fbfffd',
        overlay: '#ffffff',
      },
      shadow: {
        base: '0 12px 30px rgba(15, 118, 110, 0.08)',
        light: '0 8px 18px rgba(15, 118, 110, 0.07)',
        lighter: '0 4px 12px rgba(15, 118, 110, 0.06)',
        dark: '0 18px 44px rgba(15, 118, 110, 0.14)',
      },
      typography: {
        fontFamily:
          "'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
        extraLarge: '21px',
        large: '18px',
        medium: '16px',
        base: '14px',
        small: '13px',
        extraSmall: '12px',
      },
      componentSize: {
        large: '42px',
        default: '34px',
        small: '26px',
      },
      overlay: {
        base: 'rgba(16, 32, 31, 0.78)',
        light: 'rgba(16, 32, 31, 0.62)',
        lighter: 'rgba(16, 32, 31, 0.40)',
      },
      mask: {
        base: 'rgba(237, 248, 244, 0.88)',
        extraLight: 'rgba(237, 248, 244, 0.30)',
      },
      cssOverrides: {
        light: `${bentoMintLightCss}\n${createComponentCoverageCss({
          surface: '#fbfffd',
          surfaceAlt: '#fbfffd',
          surfaceMuted: '#f0fdfa',
          border: 'rgba(13, 148, 136, 0.18)',
          text: '#12312f',
          textMuted: '#5f7974',
          primary: '#0d9488',
          primaryText: '#ffffff',
          activeBg: '#ccfbf1',
          hoverBg: '#ecfdf5',
          tableHeaderBg: '#ccfbf1',
          tableHeaderText: '#12312f',
          shadow: '0 12px 30px rgba(15, 118, 110, 0.08)',
          softShadow: '0 6px 16px rgba(15, 118, 110, 0.06)',
          radius: '14px',
          accent: '#38bdf8',
        })}`,
        dark: `${bentoMintDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: '#142224',
          surfaceAlt: '#142224',
          surfaceMuted: '#122b29',
          border: 'rgba(45, 212, 191, 0.16)',
          text: '#ccfbf1',
          textMuted: '#99f6e4',
          primary: '#2dd4bf',
          primaryText: '#10191a',
          activeBg: '#123532',
          hoverBg: '#122b29',
          tableHeaderBg: '#123532',
          tableHeaderText: '#ccfbf1',
          shadow: '0 16px 38px rgba(0, 0, 0, 0.28)',
          softShadow: '0 8px 18px rgba(0, 0, 0, 0.18)',
          radius: '14px',
          accent: '#38bdf8',
        })}`,
      },
    },
  },
  {
    id: 'flat-candy',
    label: {
      'zh-CN': '扁平糖果',
      'en-US': 'Flat Candy',
    },
    swatches: ['#0ea5e9', '#f43f5e', '#22c55e'],
    tokens: {
      name: 'Flat Candy',
      packageName: '@local/element-plus-theme-flat-candy',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#111827',
        primary: '#0ea5e9',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#f43f5e',
        error: '#f43f5e',
        info: '#8b5cf6',
      },
      radius: {
        base: '10px',
        small: '8px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#172033',
        regular: '#475569',
        secondary: '#64748b',
        placeholder: '#94a3b8',
        disabled: '#cbd5e1',
      },
      border: {
        base: '#d8e3f0',
        light: '#e6edf6',
        lighter: '#f0f5fb',
        extraLight: '#f7fbff',
        dark: '#b7c9dc',
        darker: '#90a8c2',
        width: '1px',
        style: 'solid',
        hover: '#0ea5e9',
      },
      fill: {
        base: '#e0f2fe',
        light: '#f0f9ff',
        lighter: '#f7fbff',
        extraLight: '#ffffff',
        dark: '#bae6fd',
        darker: '#7dd3fc',
        blank: '#ffffff',
      },
      background: {
        page: '#f7fbff',
        base: '#ffffff',
        overlay: '#ffffff',
      },
      shadow: {
        base: 'none',
        light: 'none',
        lighter: 'none',
        dark: 'none',
      },
      typography: {
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
        base: 'rgba(17, 24, 39, 0.78)',
        light: 'rgba(17, 24, 39, 0.62)',
        lighter: 'rgba(17, 24, 39, 0.42)',
      },
      mask: {
        base: 'rgba(247, 251, 255, 0.88)',
        extraLight: 'rgba(247, 251, 255, 0.30)',
      },
      cssOverrides: {
        light: `${flatCandyLightCss}\n${createComponentCoverageCss({
          surface: '#f7fbff',
          surfaceAlt: '#ffffff',
          surfaceMuted: '#f0f9ff',
          border: '#d8e3f0',
          text: '#172033',
          textMuted: '#64748b',
          primary: '#0ea5e9',
          primaryText: '#ffffff',
          activeBg: '#e0f2fe',
          hoverBg: '#f0f9ff',
          tableHeaderBg: '#e0f2fe',
          tableHeaderText: '#172033',
          shadow: 'none',
          softShadow: 'none',
          radius: '10px',
          accent: '#f43f5e',
        })}`,
        dark: `${flatCandyDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: '#171420',
          surfaceAlt: '#1d1a29',
          surfaceMuted: '#242033',
          border: '#3b3651',
          text: '#f7eaff',
          textMuted: '#d8c7ef',
          primary: '#38bdf8',
          primaryText: '#15131d',
          activeBg: '#2a2540',
          hoverBg: '#242033',
          tableHeaderBg: '#2a2540',
          tableHeaderText: '#f7eaff',
          shadow: 'none',
          softShadow: 'none',
          radius: '10px',
          accent: '#fb7185',
        })}`,
      },
    },
  },
  {
    id: 'midnight-neon',
    label: {
      'zh-CN': '暗夜霓虹',
      'en-US': 'Midnight Neon',
    },
    swatches: ['#22d3ee', '#f472b6', '#facc15'],
    tokens: {
      name: 'Midnight Neon',
      packageName: '@local/element-plus-theme-midnight-neon',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#05070d',
        primary: '#22d3ee',
        success: '#4ade80',
        warning: '#facc15',
        danger: '#f472b6',
        error: '#f472b6',
        info: '#a78bfa',
      },
      radius: {
        base: '8px',
        small: '6px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#e5f3ff',
        regular: '#c7d7e5',
        secondary: '#9db7c7',
        placeholder: '#638091',
        disabled: '#415667',
      },
      border: {
        base: '#164e63',
        light: '#1f6678',
        lighter: '#193641',
        extraLight: '#101b22',
        dark: '#22d3ee',
        darker: '#67e8f9',
        width: '1px',
        style: 'solid',
        hover: '#22d3ee',
      },
      fill: {
        base: '#11131b',
        light: '#171820',
        lighter: '#1c1e2a',
        extraLight: '#101014',
        dark: '#202435',
        darker: '#2b3044',
        blank: '#101014',
      },
      background: {
        page: '#101014',
        base: '#171820',
        overlay: '#1d2130',
      },
      shadow: {
        base: '0 0 0 1px rgba(34, 211, 238, 0.08), 0 18px 48px rgba(0, 0, 0, 0.32)',
        light: '0 0 0 1px rgba(34, 211, 238, 0.08), 0 10px 24px rgba(0, 0, 0, 0.24)',
        lighter: '0 0 0 1px rgba(34, 211, 238, 0.08)',
        dark: '0 0 0 1px rgba(34, 211, 238, 0.18), 0 22px 56px rgba(0, 0, 0, 0.42)',
      },
      typography: {
        fontFamily:
          "'Inter', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
        extraLarge: '21px',
        large: '18px',
        medium: '16px',
        base: '14px',
        small: '13px',
        extraSmall: '12px',
      },
      componentSize: {
        large: '42px',
        default: '34px',
        small: '26px',
      },
      overlay: {
        base: 'rgba(2, 6, 23, 0.86)',
        light: 'rgba(2, 6, 23, 0.70)',
        lighter: 'rgba(2, 6, 23, 0.50)',
      },
      mask: {
        base: 'rgba(8, 9, 15, 0.88)',
        extraLight: 'rgba(8, 9, 15, 0.34)',
      },
      cssOverrides: {
        light: `${midnightNeonLightCss}\n${createComponentCoverageCss({
          surface: '#11131b',
          surfaceAlt: '#171820',
          surfaceMuted: '#1c1e2a',
          border: 'rgba(34, 211, 238, 0.22)',
          text: '#e5f3ff',
          textMuted: '#b7e7f5',
          primary: '#22d3ee',
          primaryText: '#101014',
          activeBg: 'rgba(34, 211, 238, 0.14)',
          hoverBg: 'rgba(34, 211, 238, 0.08)',
          tableHeaderBg: '#111b24',
          tableHeaderText: '#67e8f9',
          shadow: '0 0 0 1px rgba(34, 211, 238, 0.08), 0 18px 48px rgba(0, 0, 0, 0.32)',
          softShadow: '0 0 0 1px rgba(34, 211, 238, 0.08)',
          radius: '8px',
          accent: '#f472b6',
        })}`,
        dark: `${midnightNeonDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: '#0f1119',
          surfaceAlt: '#101119',
          surfaceMuted: '#171820',
          border: 'rgba(34, 211, 238, 0.20)',
          text: '#e5f3ff',
          textMuted: '#b7e7f5',
          primary: '#22d3ee',
          primaryText: '#08090f',
          activeBg: 'rgba(34, 211, 238, 0.16)',
          hoverBg: 'rgba(34, 211, 238, 0.10)',
          tableHeaderBg: '#111b24',
          tableHeaderText: '#67e8f9',
          shadow: '0 0 0 1px rgba(34, 211, 238, 0.08), 0 20px 52px rgba(0, 0, 0, 0.42)',
          softShadow: '0 0 0 1px rgba(34, 211, 238, 0.08)',
          radius: '8px',
          accent: '#f472b6',
        })}`,
      },
    },
  },
  {
    id: 'phantom-red',
    label: {
      'zh-CN': '怪盗红',
      'en-US': 'Phantom Red',
    },
    swatches: ['#e60012', '#111111', '#fffaf2'],
    tokens: {
      name: 'Phantom Red',
      packageName: '@local/element-plus-theme-phantom-red',
      elementPlusVersion: 'latest',
      colors: {
        white: '#fffaf2',
        black: '#111111',
        primary: '#e60012',
        success: '#00a86b',
        warning: '#ffd400',
        danger: '#c50018',
        error: '#c50018',
        info: '#111111',
      },
      radius: {
        base: '2px',
        small: '0',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#111111',
        regular: '#2a2a2a',
        secondary: '#565656',
        placeholder: '#8a8a8a',
        disabled: '#c9c4bb',
      },
      border: {
        base: '#111111',
        light: '#2a2a2a',
        lighter: '#e7ddd2',
        extraLight: '#fff2e3',
        dark: '#000000',
        darker: '#000000',
        width: '2px',
        style: 'solid',
        hover: '#e60012',
      },
      fill: {
        base: '#fff0df',
        light: '#fff5ea',
        lighter: '#fffaf2',
        extraLight: '#ffffff',
        dark: '#e7ddd2',
        darker: '#d7c9ba',
        blank: '#fffaf2',
      },
      background: {
        page: '#111111',
        base: '#fffaf2',
        overlay: '#fffaf2',
      },
      shadow: {
        base: '8px 8px 0 #111111, 12px 12px 0 rgba(230, 0, 18, 0.88)',
        light: '5px 5px 0 #111111',
        lighter: '3px 3px 0 #111111',
        dark: '10px 10px 0 #111111, 15px 15px 0 rgba(230, 0, 18, 0.92)',
      },
      typography: {
        fontFamily:
          "'Oswald', 'Impact', 'Arial Narrow', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif",
        extraLarge: '22px',
        large: '19px',
        medium: '16px',
        base: '14px',
        small: '13px',
        extraSmall: '12px',
      },
      componentSize: {
        large: '42px',
        default: '34px',
        small: '26px',
      },
      overlay: {
        base: 'rgba(0, 0, 0, 0.86)',
        light: 'rgba(0, 0, 0, 0.70)',
        lighter: 'rgba(0, 0, 0, 0.50)',
      },
      mask: {
        base: 'rgba(255, 250, 242, 0.88)',
        extraLight: 'rgba(255, 250, 242, 0.34)',
      },
      cssOverrides: {
        light: `${phantomRedLightCss}\n${createComponentCoverageCss({
          surface: '#ffffff',
          surfaceAlt: '#fffaf2',
          surfaceMuted: '#fff0df',
          border: '#111111',
          text: '#111111',
          textMuted: '#2a2a2a',
          primary: '#e60012',
          primaryText: '#ffffff',
          activeBg: '#ffe4e7',
          hoverBg: '#fff0df',
          tableHeaderBg: '#111111',
          tableHeaderText: '#ffffff',
          shadow: '8px 8px 0 #111111, 12px 12px 0 rgba(230, 0, 18, 0.88)',
          softShadow: '4px 4px 0 #111111',
          radius: '2px',
          accent: '#ffd400',
          fontFamily: "'Oswald', 'Impact', 'Arial Narrow', 'PingFang SC', 'Microsoft YaHei', sans-serif",
          fontWeight: '800',
          textTransform: 'uppercase',
          clipPath: 'polygon(6px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
        })}`,
        dark: `${phantomRedDarkCss}\n${createComponentCoverageCss({
          scope: '.dark',
          surface: '#171717',
          surfaceAlt: '#101010',
          surfaceMuted: '#220b0d',
          border: '#fffaf2',
          text: '#fffaf2',
          textMuted: '#f3d8d8',
          primary: '#e60012',
          primaryText: '#ffffff',
          activeBg: '#32080d',
          hoverBg: '#220b0d',
          tableHeaderBg: '#fffaf2',
          tableHeaderText: '#111111',
          shadow: '8px 8px 0 #e60012, 12px 12px 0 rgba(0, 0, 0, 0.76)',
          softShadow: '4px 4px 0 #e60012',
          radius: '2px',
          accent: '#ffd400',
          fontFamily: "'Oswald', 'Impact', 'Arial Narrow', 'PingFang SC', 'Microsoft YaHei', sans-serif",
          fontWeight: '800',
          textTransform: 'uppercase',
          clipPath: 'polygon(6px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
        })}`,
      },
    },
  },
  {
    id: 'vben-admin',
    label: {
      'zh-CN': 'Vben Admin',
      'en-US': 'Vben Admin',
    },
    swatches: ['#006be6', '#ff3860', '#f1f3f6'],
    tokens: vbenAdminTokens,
  },
  {
    id: 'emerald-console',
    label: {
      'zh-CN': '翡翠控制台',
      'en-US': 'Emerald Console',
    },
    swatches: ['#059669', '#0f766e', '#f0fdfa'],
    tokens: {
      name: 'Emerald Console',
      packageName: '@local/element-plus-theme-emerald-console',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#020617',
        primary: '#059669',
        success: '#16a34a',
        warning: '#ca8a04',
        danger: '#dc2626',
        error: '#dc2626',
        info: '#475569',
      },
      radius: {
        base: '8px',
        small: '5px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#0f172a',
        regular: '#334155',
        secondary: '#64748b',
        placeholder: '#94a3b8',
        disabled: '#cbd5e1',
      },
      border: {
        base: '#cbd5e1',
        light: '#dbe4ea',
        lighter: '#e7eef2',
        extraLight: '#f1f7f4',
        dark: '#94a3b8',
        darker: '#64748b',
        width: '1px',
        style: 'solid',
        hover: '#10b981',
      },
      fill: {
        base: '#edf7f2',
        light: '#f4fbf8',
        lighter: '#f8fdfb',
        extraLight: '#ffffff',
        dark: '#d9eee5',
        darker: '#c7e5d6',
        blank: '#ffffff',
      },
      background: {
        page: '#eef7f2',
        base: '#ffffff',
        overlay: '#ffffff',
      },
      shadow: {
        base: '0 12px 32px 4px rgba(15, 118, 110, 0.07), 0 8px 20px rgba(15, 23, 42, 0.07)',
        light: '0 0 12px rgba(15, 118, 110, 0.10)',
        lighter: '0 0 6px rgba(15, 118, 110, 0.10)',
        dark: '0 16px 48px 16px rgba(15, 118, 110, 0.10), 0 12px 32px rgba(15, 23, 42, 0.12)',
      },
      typography: {
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
        base: 'rgba(15, 23, 42, 0.76)',
        light: 'rgba(15, 23, 42, 0.62)',
        lighter: 'rgba(15, 23, 42, 0.42)',
      },
      mask: {
        base: 'rgba(255, 255, 255, 0.88)',
        extraLight: 'rgba(255, 255, 255, 0.32)',
      },
      cssOverrides: {
        light: createComponentCoverageCss({
          surface: '#ffffff',
          surfaceAlt: '#ffffff',
          surfaceMuted: '#f4fbf8',
          border: '#cbd5e1',
          text: '#0f172a',
          textMuted: '#475569',
          primary: '#059669',
          primaryText: '#ffffff',
          activeBg: '#d9eee5',
          hoverBg: '#edf7f2',
          tableHeaderBg: '#edf7f2',
          tableHeaderText: '#0f172a',
          shadow: '0 12px 32px 4px rgba(15, 118, 110, 0.07), 0 8px 20px rgba(15, 23, 42, 0.07)',
          softShadow: '0 0 12px rgba(15, 118, 110, 0.10)',
          radius: '8px',
          accent: '#10b981',
        }),
        dark: createComponentCoverageCss({
          scope: '.dark',
          surface: '#10231d',
          surfaceAlt: '#142820',
          surfaceMuted: '#19362c',
          border: '#2f5c4d',
          text: '#ecfdf5',
          textMuted: '#a7f3d0',
          primary: '#34d399',
          primaryText: '#052e24',
          activeBg: '#174336',
          hoverBg: '#19362c',
          tableHeaderBg: '#174336',
          tableHeaderText: '#ecfdf5',
          shadow: '0 16px 42px rgba(0, 0, 0, 0.28)',
          softShadow: '0 0 12px rgba(52, 211, 153, 0.12)',
          radius: '8px',
          accent: '#22d3ee',
        }),
      },
    },
  },
  {
    id: 'rose-quartz',
    label: {
      'zh-CN': '蔷薇石英',
      'en-US': 'Rose Quartz',
    },
    swatches: ['#e11d48', '#f97316', '#fff1f2'],
    tokens: {
      name: 'Rose Quartz',
      packageName: '@local/element-plus-theme-rose-quartz',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#111827',
        primary: '#e11d48',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#dc2626',
        error: '#dc2626',
        info: '#64748b',
      },
      radius: {
        base: '10px',
        small: '6px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#1f2937',
        regular: '#4b5563',
        secondary: '#6b7280',
        placeholder: '#9ca3af',
        disabled: '#d1d5db',
      },
      border: {
        base: '#f4cdd6',
        light: '#f8dfe6',
        lighter: '#fbeaf0',
        extraLight: '#fff5f7',
        dark: '#e9a9ba',
        darker: '#d37b94',
        width: '1px',
        style: 'solid',
        hover: '#fb7185',
      },
      fill: {
        base: '#fff1f2',
        light: '#fff7f8',
        lighter: '#fffafb',
        extraLight: '#ffffff',
        dark: '#ffe4e9',
        darker: '#ffd4de',
        blank: '#ffffff',
      },
      background: {
        page: '#fff7f8',
        base: '#ffffff',
        overlay: '#ffffff',
      },
      shadow: {
        base: '0 12px 32px 4px rgba(225, 29, 72, 0.06), 0 8px 20px rgba(15, 23, 42, 0.07)',
        light: '0 0 12px rgba(225, 29, 72, 0.11)',
        lighter: '0 0 6px rgba(225, 29, 72, 0.10)',
        dark: '0 16px 48px 16px rgba(225, 29, 72, 0.10), 0 12px 32px rgba(15, 23, 42, 0.12)',
      },
      cssOverrides: {
        light: createComponentCoverageCss({
          surface: '#ffffff',
          surfaceAlt: '#ffffff',
          surfaceMuted: '#fff7f8',
          border: '#f4cdd6',
          text: '#1f2937',
          textMuted: '#6b7280',
          primary: '#e11d48',
          primaryText: '#ffffff',
          activeBg: '#ffe4e9',
          hoverBg: '#fff1f2',
          tableHeaderBg: '#fff1f2',
          tableHeaderText: '#881337',
          shadow: '0 12px 32px 4px rgba(225, 29, 72, 0.06), 0 8px 20px rgba(15, 23, 42, 0.07)',
          softShadow: '0 0 12px rgba(225, 29, 72, 0.11)',
          radius: '10px',
          accent: '#f97316',
        }),
        dark: createComponentCoverageCss({
          scope: '.dark',
          surface: '#25141c',
          surfaceAlt: '#2a1720',
          surfaceMuted: '#351c27',
          border: '#643044',
          text: '#fff1f2',
          textMuted: '#fecdd3',
          primary: '#fb7185',
          primaryText: '#2a1720',
          activeBg: '#4a1f30',
          hoverBg: '#351c27',
          tableHeaderBg: '#4a1f30',
          tableHeaderText: '#fff1f2',
          shadow: '0 16px 42px rgba(0, 0, 0, 0.30)',
          softShadow: '0 0 12px rgba(251, 113, 133, 0.12)',
          radius: '10px',
          accent: '#fdba74',
        }),
      },
    },
  },
  {
    id: 'graphite-pro',
    label: {
      'zh-CN': '石墨专业版',
      'en-US': 'Graphite Pro',
    },
    swatches: ['#334155', '#0f766e', '#f1f5f9'],
    tokens: {
      name: 'Graphite Pro',
      packageName: '@local/element-plus-theme-graphite-pro',
      elementPlusVersion: 'latest',
      colors: {
        white: '#ffffff',
        black: '#020617',
        primary: '#334155',
        success: '#0f766e',
        warning: '#b45309',
        danger: '#be123c',
        error: '#be123c',
        info: '#64748b',
      },
      radius: {
        base: '4px',
        small: '2px',
        round: '9999px',
        circle: '100%',
      },
      text: {
        primary: '#0f172a',
        regular: '#334155',
        secondary: '#64748b',
        placeholder: '#94a3b8',
        disabled: '#cbd5e1',
      },
      border: {
        base: '#cbd5e1',
        light: '#dbe3ea',
        lighter: '#e9eef4',
        extraLight: '#f4f7fb',
        dark: '#94a3b8',
        darker: '#64748b',
        width: '1px',
        style: 'solid',
        hover: '#64748b',
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
        page: '#f1f5f9',
        base: '#ffffff',
        overlay: '#ffffff',
      },
      shadow: {
        base: '0 10px 28px rgba(15, 23, 42, 0.08)',
        light: '0 0 12px rgba(15, 23, 42, 0.10)',
        lighter: '0 0 6px rgba(15, 23, 42, 0.08)',
        dark: '0 18px 44px rgba(15, 23, 42, 0.16)',
      },
      cssOverrides: {
        light: createComponentCoverageCss({
          surface: '#ffffff',
          surfaceAlt: '#ffffff',
          surfaceMuted: '#f8fafc',
          border: '#cbd5e1',
          text: '#0f172a',
          textMuted: '#475569',
          primary: '#334155',
          primaryText: '#ffffff',
          activeBg: '#e2e8f0',
          hoverBg: '#f1f5f9',
          tableHeaderBg: '#f1f5f9',
          tableHeaderText: '#0f172a',
          shadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
          softShadow: '0 0 12px rgba(15, 23, 42, 0.10)',
          radius: '4px',
          accent: '#0f766e',
        }),
        dark: createComponentCoverageCss({
          scope: '.dark',
          surface: '#111827',
          surfaceAlt: '#182030',
          surfaceMuted: '#1f2937',
          border: '#334155',
          text: '#f8fafc',
          textMuted: '#cbd5e1',
          primary: '#94a3b8',
          primaryText: '#0f172a',
          activeBg: '#263244',
          hoverBg: '#1f2937',
          tableHeaderBg: '#263244',
          tableHeaderText: '#f8fafc',
          shadow: '0 18px 44px rgba(0, 0, 0, 0.32)',
          softShadow: '0 0 12px rgba(148, 163, 184, 0.12)',
          radius: '4px',
          accent: '#2dd4bf',
        }),
      },
    },
  },
].map(applyPresetHtmlFontSize)

export const defaultPresetId = themePresets[0]?.id ?? 'aura-blue'
