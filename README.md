# element-plus-theme-studio

本地运行的 Element Plus 最新版主题在线编辑器和完整主题包生成工具。

它解决两件事：

- 在网页里编辑 Element Plus 主题 Token，并实时预览常用组件。
- 一键生成可直接放进 Vue 3 + Vite + Element Plus 项目使用的主题包 ZIP。

## 功能

- 在线编辑主题色、状态色、圆角、文字、边框、背景、阴影、尺寸、Sass 变量、CSS 覆盖
- 右侧实时预览 Button、Form、Table、Dialog、Message、Notification、Menu、Tabs 等 Element Plus 组件
- 支持中文 / English 切换
- 支持预设主题，包括 Vben Admin 兼容预设
- 支持一键生成随机主题
- 支持按不同 Element Plus 版本生成主题包，并按目标版本过滤 Sass 变量差异
- 支持导入 / 导出 `tokens.json`
- 一键生成可安装主题包 ZIP
- 基于 Element Plus 官方 SCSS 变量覆盖方式，不使用 Vue2 Element UI 主题工具链

## 安装和启动

```bash
pnpm install
pnpm dev
```

启动后打开终端输出的本地地址，通常是：

```txt
http://localhost:5173/
```

## 页面怎么用

1. 在顶部选择一个预设主题，点击“随机主题”快速生成新方案，或点击“导入 JSON”恢复已有主题。
2. 在左侧 `颜色`、`形状`、`表面`、`排版`、`Sass`、`CSS` tab 中编辑 Token。
3. 在右侧预览区检查 Element Plus 组件效果。
4. 点击顶部暗黑按钮切换明暗主题预览。
5. 点击“导出 JSON”保存当前主题源配置。
6. 点击“生成 ZIP”下载完整主题包。

## JSON 怎么用

`tokens.json` 是编辑器的源配置，不是业务项目直接引入的样式文件。

它适合这些场景：

- 保存当前主题配置，后面继续导入编辑
- 提交到 Git，给团队协作审查
- 用 CLI 不打开网页直接重新生成主题包
- 作为主题版本的源文件备份

网页里：

- “导入 JSON”：读取之前导出的 `tokens.json`，恢复主题名称、包名、颜色、圆角、Sass 覆盖、CSS 覆盖和兼容开关。
- “导出 JSON”：只导出主题配置，不包含编译后的 CSS。

命令行里：

```bash
pnpm theme:build --tokens examples/aura-blue.json
pnpm theme:build --tokens examples/vben-admin.json
pnpm theme:build --tokens examples/aura-blue.json --element-plus-version 2.13.3
```

生成结果会输出到 `generated/`。

## ZIP 怎么用

点击“生成 ZIP”后会下载一个主题包，例如：

```txt
element-plus-theme-custom.zip
```

解压后结构类似：

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

在业务项目中，本地安装解压后的主题包：

```bash
pnpm add ./path/to/element-plus-theme-custom
```

然后在 Vue 3 + Vite 入口文件中引入：

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@your-scope/element-plus-theme-custom/dist/index.css'
import '@your-scope/element-plus-theme-custom/dist/dark.css'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
```

`dist/index.css` 已经是基于 Element Plus theme-chalk 编译后的全量样式，一般不需要再额外引入 `element-plus/dist/index.css`，避免样式顺序互相覆盖。

## 暗黑模式

业务项目中建议先引入 Element Plus 官方暗黑变量，再引入主题包暗黑覆盖：

```ts
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@your-scope/element-plus-theme-custom/dist/dark.css'
```

然后给 `html` 添加 `dark` 类：

```html
<html class="dark">
```

## 命令

```bash
pnpm install
pnpm dev
pnpm build
pnpm theme:build
pnpm theme:build --tokens examples/aura-blue.json
pnpm theme:zip --tokens examples/aura-blue.json
```

`pnpm dev` 会启动 Web 编辑器，并提供 `/api/theme/build` 生成接口。

## Element Plus 版本

编辑器默认使用当前安装的 Element Plus latest。也可以在页面“Element Plus 版本”里填：

```txt
latest
installed
2.14.2
2.13.3
```

生成器会解析对应版本的 `theme-chalk` SCSS 文件，并根据该版本实际存在的 Sass 变量生成主题包。

## Vben Admin 预设

选择 `Vben Admin` 预设时：

- Vben design tokens 会自动注入实时预览和生成包
- Vben 色阶会按源码逻辑生成
- Element Plus runtime vars 会按 Vben `useElementPlusDesignTokens` 映射
- `CSS` tab 里的两个大文本框仍然只是“额外自定义覆盖”，为空是正常的

## 产物说明

- `dist/index.css`：亮色主题完整 CSS
- `dist/dark.css`：暗色主题覆盖 CSS
- `dist/tokens.json`：主题源配置，可重新导入编辑器
- `dist/variables.scss`：生成时使用的 Element Plus SCSS 变量覆盖
- `src/index.scss`：主题源码入口
- `README.md`：主题包使用教程
- `package.json`：主题包元信息和导出入口

## License

[MIT](./LICENSE) © 2026 Solomemory
