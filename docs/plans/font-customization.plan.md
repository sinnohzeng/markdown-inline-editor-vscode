---
name: font-customization
overview: >
  为 Markdown 各级标题、加粗文本和正文段落添加字体族（font-family）、字重（font-weight）
  和字号（font-size）的自定义功能。主要用例为中国大陆党政机关公文排版（GB/T 9704-2012）。
status: implemented
date: 2026-04-03
---

# 字体自定义功能计划

## 背景

插件原本仅支持颜色自定义（`markdownInlineEditor.colors.*`）。用户需要为不同级别的标题和正文设置不同的 **字体族** 、 **字重** 和 **字号** ，以符合中文排版习惯，尤其是党政公文格式标准（GB/T 9704-2012）。

### 技术发现

VS Code 的 `DecorationRenderOptions` 官方接口 **不支持** `fontFamily` 和 `fontSize` 属性。但本插件已通过 `textDecoration` CSS 注入技巧成功实现了 `font-size`：

```typescript
textDecoration: `none; font-size: ${config.size};`
```

我们扩展此模式以注入 `font-family`，已验证可行。

### 字体加载限制

VS Code 编辑器无法加载 `@font-face` 或远程 Google Fonts。字体必须 **安装在操作系统上** 才能被 `fontFamily` 引用。仓库中捆绑的思源宋体文件（约 69MB）已从插件包中排除，用户可通过命令打开字体目录手动安装。

---

## 党政公文排版参考（GB/T 9704-2012）

| Markdown 元素 | 字体族（英文优先，中文） | 字重 | 字号 |
|--------------|------------------------|------|------|
| H1（公文标题） | Arial, 黑体 | normal | 约 137%（二号 22pt） |
| H2（一级标题） | Arial, 楷体 | normal | 约 100%（三号 16pt） |
| H3（二级标题） | Times New Roman, 仿宋 | bold | 约 100%（三号） |
| H4（三级标题） | Times New Roman, 仿宋 | normal | 约 100%（三号） |
| H5/H6 | 使用默认值 | normal | 约 90%/80% |
| 正文 | Times New Roman, 思源宋体 | normal 或 300 | 100% |
| 加粗 | 继承 | bold | 继承 |

---

## 实现方案

### 新增设置（20 项）

在 `markdownInlineEditor.fonts.*` 命名空间下：

- `heading1~6.fontFamily`、`heading1~6.fontWeight`、`heading1~6.fontSize`（各 6 级标题 × 3 属性 = 18 项）
- `emphasis.fontFamily`、`emphasis.fontWeight`（2 项）
- `body.fontFamily`、`body.fontWeight`（2 项）

空值表示使用插件默认值。

### 修改的核心文件

| 文件 | 变更 |
|------|------|
| `package.json` | 新增 20 项字体设置 + 1 个字体安装命令 |
| `src/config.ts` | 新增 `fonts` 配置区域及验证逻辑 |
| `src/decorations.ts` | 扩展 CSS 注入以支持 fontFamily；新增 `BodyTextDecorationType` |
| `src/decorator/decoration-type-registry.ts` | 扩展 `RegistryOptions`，接入字体参数 |
| `src/parser.ts` | 新增 `"body"` 装饰类型，发射段落范围 |
| `src/decorator.ts` | 接入字体配置到 `RegistryOptions` |
| `src/extension.ts` | 新增字体配置变更监听 + 字体安装命令 |
| `.vscodeignore` | 将 `fonts/` 排除出插件包 |

### 分支兼容性

本仓库 fork 自 `SeardnaSchmid/markdown-inline-editor-vscode`。所有修改为纯增量式：

- 新增可选参数，保留默认值，不破坏现有 API（Application Programming Interface，应用程序编程接口）
- 配置命名空间 `fonts.*` 与上游 `colors.*` 隔离
- Parser 仅新增 `"body"` 到 `DecorationType` 联合类型

---

## 验证方式

1. `npm run compile` 编译通过
2. `npm test` 全部 53 个测试套件、751 项测试通过
3. 手动测试：在 VS Code 设置中配置字体参数，验证各级标题和正文的字体渲染效果
4. 验证设置变更后实时刷新装饰
5. 验证空设置回退到默认值
