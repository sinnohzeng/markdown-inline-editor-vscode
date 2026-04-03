# 字体安装指南

本插件使用思源宋体（Source Han Serif SC / Noto Serif SC）作为默认字体。为获得最佳效果，请安装以下字体文件。

## 需要安装的字体

本仓库 `fonts/` 目录包含两套字体，共 6 个文件：

### 思源宋体（Adobe 版）

| 文件名 | CSS 字体名 | 字重 | 用途 |
|--------|-----------|------|------|
| `SourceHanSerifSC-Regular.otf` | Source Han Serif SC | Regular (400) | 正文、标题 |
| `SourceHanSerifSC-Light.otf` | Source Han Serif SC | Light (300) | 备用 |
| `SourceHanSerifSC-Bold.otf` | Source Han Serif SC | Bold (700) | 加粗文本、公文标题 |

### 思源宋体（Google 版）

| 文件名 | CSS 字体名 | 字重 | 用途 |
|--------|-----------|------|------|
| `NotoSerifSC-Regular.ttf` | Noto Serif SC | Regular (400) | 回退字体 |
| `NotoSerifSC-Light.ttf` | Noto Serif SC | Light (300) | 备用 |
| `NotoSerifSC-Bold.ttf` | Noto Serif SC | Bold (700) | 回退字体 |

> **说明**：Source Han Serif SC（Adobe 版）和 Noto Serif SC（Google 版）是同一字体的不同发行版本，字形完全一致。同时安装两套可确保最大兼容性。

## 安装方法

### macOS

1. 打开 `fonts/` 文件夹
2. 选中全部 6 个字体文件
3. 双击打开，点击 **"安装字体"**
4. 或直接拖拽到 **字体册**（Font Book）应用中

安装后字体位于 `~/Library/Fonts/`。

### Windows

1. 打开 `fonts/` 文件夹
2. 选中全部 6 个字体文件
3. 右键 → **"为所有用户安装"**（推荐）或 **"安装"**

安装后字体位于 `C:\Windows\Fonts\`。

### 验证安装

安装后重启 VS Code，打开任意 `.md` 文件，公文标题（`#`）和正文应显示为思源宋体。

## 字体优先级

插件的 CSS font-family 回退链：

```
"Source Han Serif SC" → "Noto Serif SC" → "Songti SC"(macOS) → "SimSun"(Windows) → serif
```

- 优先使用 Source Han Serif SC（如已安装）
- 未安装时回退到 Noto Serif SC（同一字体，Google 版）
- 都没装则使用系统自带宋体（macOS: Songti SC，Windows: SimSun）

## 字重说明

| 字重 | CSS font-weight | 使用场景 |
|------|----------------|---------|
| Light (300) | `font-weight: 300` | 目前未使用，预留 |
| Regular (400) | `font-weight: normal` | 正文、二三五级标题 |
| Bold (700) | `font-weight: bold` | 加粗文本、公文标题（H1）、三级标题（H4） |

三个字重（Regular、Light、Bold）已覆盖所有使用场景，无需额外字重。
