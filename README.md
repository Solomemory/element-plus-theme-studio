# element-plus-theme-studio

[![CI](https://github.com/Solomemory/element-plus-theme-studio/actions/workflows/ci.yml/badge.svg)](https://github.com/Solomemory/element-plus-theme-studio/actions/workflows/ci.yml)
![Vue 3](https://img.shields.io/badge/Vue-3-42b883)
![Vite](https://img.shields.io/badge/Vite-8-646cff)
![Element Plus](https://img.shields.io/badge/Element%20Plus-latest-409eff)
![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

Element Plus Theme Studio 是一个本地运行的 Element Plus 主题编辑器和主题包生成工具。

它面向 Vue 3 + Vite + Element Plus 项目，提供可视化 Token 编辑、组件实时预览、明暗主题切换、预设主题、随机主题，以及一键生成可安装主题包 ZIP 的完整工作流。

> 基于 Element Plus 官方 `theme-chalk` SCSS 变量覆盖方式构建，不使用 Vue2 Element UI 时代的 `element-theme` / `element-theme-chalk` 工具链。

## Preview

![element-plus-theme-studio preview](./docs/images/studio-preview.png)

## Features

- 可视化编辑 Element Plus 主题 Token，包括颜色、文字、边框、背景、圆角、阴影、尺寸、Sass 变量和 CSS 覆盖
- 左侧 Token 表单按 Tab 分类展示，编辑面板和预览区域独立滚动
- 实时预览常用 Element Plus 组件，覆盖表单、操作、反馈、导航、数据展示和弹窗类组件
- 支持亮色 / 暗黑主题切换，并生成独立的 `dark.css`
- 支持中文 / English 界面切换
- 内置多套主题预设，包括 Aura Blue、Emerald、Rose、Slate、Vben Admin 等
- 支持一键生成随机主题，快速探索配色方向
- 支持导入 / 导出 `tokens.json`
- 支持选择目标 Element Plus 版本，并按对应版本解析 `theme-chalk` 变量结构
- 支持从页面或 CLI 生成完整主题包 ZIP
- 生成的主题包可直接在 Vue 3 + Vite + Element Plus 项目中安装和引入

## Tech Stack

| Layer | Stack |
| --- | --- |
| Web app | Vue 3, Vite, TypeScript, Element Plus |
| Theme builder | Node.js, TypeScript, Sass |
| Package output | CSS, SCSS, JSON, README, ZIP |
| Workspace | pnpm workspace |
| ZIP generation | archiver |

## Quick Start

```bash
pnpm install
pnpm dev
```

启动后打开终端输出的本地地址，通常是：

```txt
http://localhost:5173/
```

## How To Use

1. 在顶部选择一个预设主题，或点击“随机主题”快速生成一套新主题。
2. 在左侧 Token 面板中编辑颜色、圆角、背景、文字、边框、Sass 变量和 CSS 覆盖。
3. 在右侧预览区检查 Button、Form、Table、Dialog、Message、Notification、Menu、Tabs 等组件效果。
4. 点击顶部暗黑按钮，在亮色和暗黑预览之间切换。
5. 点击“导出 JSON”保存当前主题源配置。
6. 点击“生成 ZIP”下载完整主题包。

## JSON And ZIP

`tokens.json` 是主题的源配置文件，适合保存、审查、协作和二次生成；它不是业务项目直接引入的最终样式文件。

网页中：

- “导入 JSON”：恢复之前导出的主题配置
- “导出 JSON”：保存当前主题 Token、Sass 覆盖、CSS 覆盖和兼容开关
- “生成 ZIP”：编译 Element Plus SCSS，并导出可安装的完整主题包

命令行中：

```bash
pnpm theme:build --tokens examples/aura-blue.json
pnpm theme:build --tokens examples/vben-admin.json
pnpm theme:build --tokens examples/aura-blue.json --element-plus-version 2.13.3
```

生成结果会输出到 `generated/`。

## Theme Package Usage

页面生成的 ZIP 解压后结构类似：

```txt
element-plus-theme-custom/
  dist/
    index.css
    dark.css
    tokens.json
    variables.scss
  src/
    index.scss
  package.json
  README.md
```

在业务项目中安装解压后的主题包：

```bash
pnpm add ./path/to/element-plus-theme-custom
```

在 Vue 3 + Vite 入口文件中引入：

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@your-scope/element-plus-theme-custom/dist/index.css'
import '@your-scope/element-plus-theme-custom/dist/dark.css'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
```

`dist/index.css` 已经是基于 Element Plus `theme-chalk` 编译后的完整样式。一般不需要再额外引入 `element-plus/dist/index.css`，避免样式顺序互相覆盖。

## Dark Mode

业务项目中建议先引入 Element Plus 官方暗黑变量，再引入主题包暗黑覆盖：

```ts
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@your-scope/element-plus-theme-custom/dist/dark.css'
```

然后给 `html` 添加 `dark` 类：

```html
<html class="dark">
```

## Element Plus Version Compatibility

编辑器默认使用当前安装的 Element Plus latest。你也可以在页面“Element Plus 版本”里填写：

```txt
latest
installed
2.14.2
2.13.3
```

生成器会解析目标版本的 `theme-chalk` SCSS 文件，并根据该版本实际存在的 Sass 变量生成主题包。这样可以降低不同 Element Plus 版本之间变量差异带来的构建风险。

## Vben Admin Preset

选择 `Vben Admin` 预设时：

- Vben design tokens 会注入实时预览和生成包
- Vben 色阶按源码逻辑生成
- Element Plus runtime vars 按 Vben `useElementPlusDesignTokens` 映射
- `CSS` Tab 中的两个大文本框是额外自定义覆盖入口，留空是正常状态

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
pnpm theme:build
pnpm theme:build --tokens examples/aura-blue.json
pnpm theme:zip --tokens examples/aura-blue.json
```

`pnpm dev` 会启动 Web 编辑器，并提供 `/api/theme/build` 生成接口。

## Project Structure

```txt
element-plus-theme-studio/
  apps/
    web/                  # Vue 3 + Vite web editor
  packages/
    theme-builder/         # Node theme builder and ZIP generator
  examples/                # Example theme token files
  docs/
    images/                # README screenshots and documentation assets
  generated/               # Local generated theme packages, ignored by Git
  .github/
    workflows/             # GitHub Actions CI
```

## Generated Files

- `dist/index.css`：亮色主题完整 CSS
- `dist/dark.css`：暗黑主题覆盖 CSS
- `dist/tokens.json`：主题源配置，可重新导入编辑器
- `dist/variables.scss`：生成时使用的 Element Plus SCSS 变量覆盖
- `src/index.scss`：主题源码入口
- `README.md`：主题包使用教程
- `package.json`：主题包元信息和导出入口

## CI

GitHub Actions 会在 `main` 分支的 push 和 pull request 时运行：

- `pnpm install --frozen-lockfile`
- `pnpm build`
- `pnpm theme:build --tokens examples/aura-blue.json`
- `pnpm theme:build --tokens examples/vben-admin.json`

## License

[MIT](./LICENSE) © 2026 Solomemory
