---
status: TODO
priority: Enhancement
updateDate: 2026-01-19
---

# Image UX Improvements

## Current Implementation

- ✅ Image alt text is styled (with inline formatting support: bold, italic, etc.)
- ✅ Image URL is hidden (like links)
- ✅ Hover shows image preview
- ✅ Image icon (📷) appears after alt text

## Recommended UX Enhancements

### 1. **Clickable Images** (High Priority)
**Make images clickable like links** - Clicking the image alt text should open the image file.

**Implementation:**
- Extend `MarkdownLinkProvider` or create similar `DocumentLinkProvider` for images
- Clicking image alt text opens the image in VS Code's image viewer
- Use `vscode.commands.executeCommand('vscode.open', imageUri)` or similar

**Benefits:**
- Consistent with link behavior
- Quick access to view full image
- Familiar interaction pattern

### 2. **Enhanced Hover Experience** (Medium Priority)
**Improve the hover preview with metadata and actions.**

**Features:**
- Show image dimensions (width × height) if available
- Show file size
- Show file path/name
- Add "Open Image" action button in hover
- Constrain image size in hover (max-width: 400px) to prevent overflow

**Example hover content:**
```
[Image Preview - constrained size]

📷 image.png
Size: 1.2 MB | Dimensions: 1920×1080
[Open Image] button
```

### 3. **Visual Distinction** (Low Priority)
**Make images more visually distinct from links.**

**Options:**
- Different color scheme (e.g., slightly different shade)
- Background highlight (subtle, like code blocks but lighter)
- Border or underline style difference
- Icon positioning (before vs after)

### 4. **Inline Thumbnail Preview** (Future - Complex)
**Show small thumbnail inline instead of just icon.**

**Challenges:**
- Performance (loading many images)
- Layout complexity
- File system access
- Caching strategy

**Alternative:** Show thumbnail only on hover or when image is "expanded"

### 5. **Image Status Indicators** (Low Priority)
**Show visual feedback for image states.**

- ✅ Valid image (exists, loadable)
- ⚠️ Missing image (file not found)
- 🔒 External image (requires network)
- 📦 Large image (file size warning)

### 6. **Keyboard Navigation** (Low Priority)
**Support keyboard shortcuts for images.**

- `Ctrl+Click` / `Cmd+Click`: Open in new tab
- `Alt+Click`: Copy image path
- `F12` / `Go to Definition`: Jump to image file

## Recommended Implementation Order

1. **Phase 1 (Quick Win):** Make images clickable (#1)
2. **Phase 2 (Enhanced UX):** Improve hover with metadata (#2)
3. **Phase 3 (Polish):** Visual distinction (#3)
4. **Phase 4 (Advanced):** Status indicators (#5)
5. **Phase 5 (Future):** Inline thumbnails (#4) - if user demand

## Icon Recommendations

### Current: 📷 (Camera - U+1F4F7)
**Pros:** Most recognizable, universal meaning
**Cons:** None significant

### Alternatives:
- **🖼️ (Frame - U+1F5BC)** - Represents framed image, current choice
- **📸 (Camera with Flash - U+1F4F8)** - Modern, action-oriented
- **⬜ (White Square - U+2B1C)** - Minimal, clean, less distracting
- **▦ (Grid Square - U+25A6)** - Technical, represents image data

**Recommendation:** Keep 📷 (camera) - it's the most universally understood icon for images.

## Configuration Options (Future)

Allow users to configure:
- Icon choice (camera, frame, square, etc.)
- Icon position (before, after, or none)
- Hover behavior (preview size, metadata display)
- Click behavior (open in editor, external viewer, etc.)
- Thumbnail display (enabled/disabled, size)
