import type { ThemeTokens } from './tokens.js'

export interface ReadmeOptions {
  elementPlusVersion: string
  supportsDarkCssVars?: boolean
}

export function generateReadme(tokens: ThemeTokens, options: ReadmeOptions): string {
  const packageLeaf = tokens.packageName.split('/').pop() || 'element-plus-theme-custom'
  const darkImports = options.supportsDarkCssVars
    ? `import 'element-plus/theme-chalk/dark/css-vars.css'\nimport '${tokens.packageName}/dist/dark.css'`
    : `import '${tokens.packageName}/dist/dark.css'`

  return `# ${tokens.name}

这是由 \`element-plus-theme-studio\` 生成的 Element Plus 主题包。

## 适用范围

- Vue 3
- Vite
- Element Plus ${options.elementPlusVersion}

## ZIP 解压后有什么

\`\`\`txt
${packageLeaf}/
  dist/
    index.css
    dark.css
    tokens.json
    variables.scss
  src/
    index.scss
  package.json
  README.md
\`\`\`

- \`dist/index.css\`：亮色主题完整 CSS。
- \`dist/dark.css\`：暗黑模式覆盖 CSS。
- \`dist/tokens.json\`：主题源配置，可重新导入 element-plus-theme-studio。
- \`dist/variables.scss\`：生成时使用的 Element Plus SCSS 变量覆盖。
- \`src/index.scss\`：主题源码入口。

## 本地安装

如果这个主题包还没有发布到 npm，先解压 ZIP，然后在业务项目里安装解压后的目录：

\`\`\`bash
pnpm add ./path/to/${packageLeaf}
\`\`\`

如果你已经把主题包发布到 npm，可以直接安装包名：

\`\`\`bash
pnpm add ${tokens.packageName} element-plus
\`\`\`

## Vue 3 + Vite 使用方式

在业务项目入口文件中引入主题 CSS：

\`\`\`ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '${tokens.packageName}/dist/index.css'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
\`\`\`

\`dist/index.css\` 已经包含基于 Element Plus theme-chalk 编译后的完整组件样式。通常不要再额外引入 \`element-plus/dist/index.css\`，避免样式顺序互相覆盖。

## 暗黑模式

${options.supportsDarkCssVars ? '建议先引入 Element Plus 官方暗黑 CSS 变量，再引入当前主题包的暗黑覆盖：' : '当前 Element Plus 版本没有暴露 `element-plus/theme-chalk/dark/css-vars.css`，只引入当前主题包的暗黑覆盖，并自行切换 `dark` class：'}

\`\`\`ts
${darkImports}
\`\`\`

然后给 \`html\` 添加 \`dark\` 类：

\`\`\`html
<html class="dark">
\`\`\`

## tokens.json 怎么用

\`dist/tokens.json\` 是主题源配置，不是业务项目直接 import 的 CSS。

它适合用来：

- 重新导入 element-plus-theme-studio 继续编辑
- 提交到 Git 做主题版本管理
- 给设计或前端同事共享主题配置
- 使用 CLI 重新生成 ZIP

CLI 示例：

\`\`\`bash
pnpm theme:build --tokens ./dist/tokens.json
\`\`\`

如果要在主题编辑器网页中继续编辑，点击“导入 JSON”，选择这个 \`tokens.json\` 即可。

\`typography.htmlFontSize\` 会生成 \`html\` 根字号，并同步写入 \`--studio-root-font-size\` / \`--studio-html-font-size\`。typography 字号建议使用 \`rem\`，\`--studio-font-size-base\` / \`--font-size-base\` 会对应 \`typography.base\`。

建议把 \`htmlFontSize\` 当成页面级密度基准：后台系统通常保持 \`16px\`，展示型主题可以使用 \`17px\`，数据大屏可以使用 \`18px\`。页面布局、自定义内容和 typography 字号适合跟随 \`rem\` 缩放；Element Plus 控件高度、边框、图标和细线细节通常继续保留 \`px\`，避免表单、表格和弹窗难以对齐。

## 自定义 CSS 覆盖

当 \`tokens.json\` 中存在 \`cssOverrides.light\` 或 \`cssOverrides.dark\` 时，它们会被追加到 \`dist/index.css\` 和 \`dist/dark.css\`。这适合处理 Element Plus Sass 变量没有暴露的组件细节。

${tokens.compatibility.vben ? '## Vben Admin Compatibility\n\nThis package includes the Vben Admin design-token CSS, generated Vben color scales, Element Plus runtime variable mappings, source-matched Element Plus adapter styles for cards, form validation, and loading masks, plus a popup visual bridge for dialog-like components.\n' : ''}

## SCSS Source

\`src/index.scss\` 和 \`dist/variables.scss\` 使用 Element Plus 官方 SCSS module 覆盖方式：

\`\`\`scss
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': ('base': ${tokens.colors.primary}),
  )
);

@use 'element-plus/theme-chalk/src/index.scss' as *;

:root {
  --studio-root-font-size: ${tokens.typography.htmlFontSize};
  --studio-html-font-size: ${tokens.typography.htmlFontSize};
  --studio-font-size-base: ${tokens.typography.base};
  --font-size-base: ${tokens.typography.base};
}

html {
  font-size: var(--studio-root-font-size);
}
\`\`\`
`
}
