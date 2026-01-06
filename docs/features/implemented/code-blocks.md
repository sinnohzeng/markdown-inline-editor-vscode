# Code Blocks

**Status:** ✅ Implemented  
**Priority:** Core Feature

## Overview

Code blocks with background styling and hidden fence markers.

## Implementation

- Syntax: ` ```lang ` (fenced code blocks)
- Fence markers (triple backticks) are hidden
- Code block background is styled with theme colors
- Language identifier is preserved but not displayed
- Supports all languages

## Examples

````markdown
```javascript
function hello() {
  console.log("Hello");
}
```
````

→ Code block with background styling, fences hidden
