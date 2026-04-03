# DOCX 导出：踩过的坑和做对的事

> 2026-04-03 开发记录

## 做对的事

### 选 `docx` npm 包，不选 Pandoc

Pandoc 功能强大，但对 VS Code 扩展来说有两个硬伤：一是用户必须自己装 Pandoc，二是它会往 `styles.xml` 里塞进约 30 个语法高亮的样式（AlertTok、AnnotationTok 之类），哪怕文档里一行代码都没有。`docx` 包只输出你亲手定义的样式，干净利落。

### 核心转换做成纯函数

`ast-to-docx.ts` 不引入任何 VS Code API——拿到语法树和图片 buffer，直接出 Word 文档对象。好处是 Jest 直接测，不用启动 Extension Development Host。VS Code 扩展里凡是能抽成纯函数的逻辑，都该抽出来。

### 图片尺寸自己读，不装额外的包

PNG 的宽高藏在 IHDR chunk 里（byte 16-23），JPEG 的藏在 SOF marker 里。手写几十行解析代码，就省掉了 `sharp` 或 `image-size` 这类 native 依赖。VS Code 扩展跨平台跑，native 包越少越安心。

### 字体常量按字体本身命名

最初写成 `FONT_HEADING_H1`、`FONT_HEADING_H2`，后来发现不对——一种字体可能用在好几个地方，按标题级别命名就绑死了。改成 `HeiTi`、`KaiTi`、`FangSong`、`SongTi`、`XiaoBiaoSong`，一眼就知道是什么字体。

中间还试过中文变量名（`黑体`、`楷体`），TypeScript 语法上没问题，但工具链兼容性和团队协作是隐患，最终用了拼音 PascalCase。

---

## 踩过的坑

### Word 样式重复——`w:name` 才是命门

用 `paragraphStyles` 定义样式时，写了 `id: "Heading1"` 和 `name: "一级标题"`。结果 Word 里同时冒出来"标题 1"和"一级标题"两个样式。

原因：Word 不看 `w:styleId`，它看 `w:name`。`w:name` 写的是"一级标题"，Word 不认为它是内建样式，就当作新样式处理了。而内建的"标题 1"（`w:name="heading 1"`）照常存在。

改用 `styles.default.heading1` API 就好了——这个 API 保留 `w:name="heading 1"` 不变，只覆盖字体、字号等格式属性。中文版 Word 自动把"heading 1"显示为"标题 1"。

一句话总结：**`w:styleId` 是文档内部的引用键，`w:name` 才是 Word 识别内建样式的依据。**

### 公文标题继承了全局缩进

在 `styles.default.document`（相当于 Normal 样式）里设了全局首行缩进 2 字符。Title 样式本该居中，结果居中之后还带着缩进，整个标题偏了。

Word 的样式继承规则：子样式只有显式设定的属性才会覆盖父级。你不写 `indent: { firstLine: 0 }`，它就老老实实继承父级的 640 twip。

### 页码的一字线不是英文短横线

GB/T 9704 说"数字左右各放一条一字线"。一字线是占一个汉字宽度的横线，对应 Unicode 的 Em Dash `—`（U+2014），不是键盘上的短横线 `-`（U+002D）。

### `docx` 库的单位换算

字号用半磅——16pt 写成 32。行距和缩进用 twip（一磅的二十分之一）——28pt 写成 560。毫米转 twip 有现成的 `convertMillimetersToTwip()` 函数。这套单位体系很容易出错，全靠命名常量兜底。

### macOS 没有仿宋

Windows 上 `FangSong` 是系统字体，macOS 上不存在。但不用在代码里做平台判断——Word 自有一套字体回退机制，会自动找到 `STFangsong`（华文仿宋）。黑体回退到 Heiti SC，楷体回退到 Kaiti SC，都是 Word 自己处理的。

### 不需要拆分 bundle

本来打算把 `docx` 包构建成独立 chunk 做延迟加载。后来想明白了：esbuild 的 CJS 输出里，每个模块都是惰性初始化的，只有在首次 `require()` 时才执行。`docx` 模块只在用户点击导出按钮后才会被触发，单 bundle 已经自带延迟效果。拆分只增加了构建复杂度，没有实际收益。

---

## 决策一览

| 事项 | 选了什么 | 没选什么 | 为什么 |
|------|---------|---------|--------|
| DOCX 生成 | `docx` npm | Pandoc | 零依赖、样式干净 |
| 样式覆盖 | `styles.default.headingN` | `paragraphStyles` + 自定义 name | 避免样式重复 |
| 字体编码 | 现代字体名 | `_GB2312` 后缀 | 用户要求 |
| 公文标题 | 方正小标宋简体 | 华文中宋 | 国标指定字体 |
| 强调样式 | 楷体，不加粗 | 黑体 / CSS bold | 楷体更柔和，公文不靠粗细区分 |
| 图片尺寸 | 手写 PNG/JPEG 解析 | `image-size` 包 | 避免 native 依赖 |
| Bundle | 单 bundle | 分离 chunk | 复杂度不值得 |
| 变量命名 | 拼音 PascalCase | 中文变量名 / 按标题级别命名 | 兼顾可读性和工具链兼容 |
