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
.preview-section,
.preview-card,
.el-card,
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
  backdrop-filter: blur(18px) saturate(130%);
  -webkit-backdrop-filter: blur(18px) saturate(130%);
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
  backdrop-filter: blur(20px) saturate(125%);
  -webkit-backdrop-filter: blur(20px) saturate(125%);
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
  backdrop-filter: blur(18px) saturate(125%);
  -webkit-backdrop-filter: blur(18px) saturate(125%);
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

.el-alert,
.el-tag,
.el-tabs__nav-wrap::after,
.el-menu,
.sample-menu {
  backdrop-filter: blur(18px) saturate(125%);
  -webkit-backdrop-filter: blur(18px) saturate(125%);
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
  backdrop-filter: blur(16px) saturate(125%);
  -webkit-backdrop-filter: blur(16px) saturate(125%);
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
.dark .preview-section,
.dark .preview-card,
.dark .el-card,
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
  backdrop-filter: blur(20px) saturate(130%);
  -webkit-backdrop-filter: blur(20px) saturate(130%);
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
  backdrop-filter: blur(22px) saturate(125%);
  -webkit-backdrop-filter: blur(22px) saturate(125%);
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
  backdrop-filter: blur(20px) saturate(125%);
  -webkit-backdrop-filter: blur(20px) saturate(125%);
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
        light: glassAuroraLightCss,
        dark: glassAuroraDarkCss,
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
        light: dataWallLightCss,
        dark: dataWallDarkCss,
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
        light: neoBrutalLightCss,
        dark: neoBrutalDarkCss,
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
        light: clayPopLightCss,
        dark: clayPopDarkCss,
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
        light: softNeumorphLightCss,
        dark: softNeumorphDarkCss,
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
    },
  },
]

export const defaultPresetId = themePresets[0]?.id ?? 'aura-blue'
