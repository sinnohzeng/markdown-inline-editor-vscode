---
title: Markdown Example Document - UAT Checklist
date: YYYY-MM-DD
---

# Markdown Example - UAT Checklist 

## Syntax Shadowing System - Testing Guide

The extension uses a 3-state model for markdown syntax visibility:

### States:
- **Rendered (default)**: Syntax markers are hidden, only formatted content is visible 
UAT-CHECK( )
- **Ghost**: When cursor is on a line with markdown syntax but NOT inside the construct - markers show at configurable opacity (default: 30%) 
UAT-CHECK( )
- **Raw**: When cursor/selection is inside or at boundaries of a construct - markers show fully visible 
UAT-CHECK( )

### Testing Checklist for Each Example:

For each example below, verify the following behaviors:

- [ ] **Rendered state**: When cursor is away from the construct, syntax markers are hidden 
UAT-CHECK( )
- [ ] **Ghost state**: When cursor is on the same line but outside the construct, markers show faintly (ghost opacity) 
UAT-CHECK( )
- [ ] **Raw state**: When cursor is inside the construct or at its boundaries (start/end), markers show fully visible 
UAT-CHECK( )
- [ ] **Raw state with selection**: When text is selected covering the construct, markers show fully visible 
UAT-CHECK( )
- [ ] **Semantic styling preserved**: Formatting (bold, italic, etc.) remains visible in all states 
UAT-CHECK( )
- [ ] **Boundary detection**: Cursor right after closing marker shows raw state (not ghost) 
UAT-CHECK( )
- [ ] **Boundary detection**: Cursor at opening marker shows raw state (not ghost) 
UAT-CHECK( )

---

## Font Styles

**Bold text with asterisks** 
UAT-CHECK( )
__Bold text with underscores__ 
UAT-CHECK( )

*Italic text with asterisk* 
UAT-CHECK( )
_Italic text with underscore_ 
UAT-CHECK( )

***Bold-italic text with asterisks*** 
UAT-CHECK( )
___Bold-italic text with underscores___ 
UAT-CHECK( )

~~Strikethrough text~~ 
UAT-CHECK( )

---

## Headings

# Heading 1
UAT-CHECK( )

## Heading 2
UAT-CHECK( )

### Heading 3
UAT-CHECK( )

#### Heading 4
UAT-CHECK( )

##### Heading 5
UAT-CHECK( )

###### Heading 6
UAT-CHECK( )

---

## Code

`Inline code` 
UAT-CHECK( )

`` Code with `backticks` inside `` 
UAT-CHECK( )

```language
Code block
with multiple lines
```
UAT-CHECK( )

---

## Links and Images

[Link text](https://example.com) 
UAT-CHECK( )

![Image alt text](image.png) 
UAT-CHECK( )

---

## Lists

- Unordered list item
UAT-CHECK( )
- Another item
UAT-CHECK( )

1. Ordered list item
UAT-CHECK( )
2. Another item
UAT-CHECK( )

- [ ] Unchecked task
UAT-CHECK( )
- [x] Checked task
UAT-CHECK( )

---

## Blockquotes

> Blockquote text
UAT-CHECK( )

> Nested blockquote
> > Second level
UAT-CHECK( )

---

## Horizontal Rules

---
UAT-CHECK( )

***
UAT-CHECK( )

___
UAT-CHECK( )

---

## Edge Cases

~not strikethrough~ (single tilde, not valid) 
UAT-CHECK( )

~~GFM strikethrough~~ (valid) 
UAT-CHECK( )

Mixed formatting: **bold** and *italic* and `code` 
UAT-CHECK( )

---

## Notes

- Use `UAT-CHECK(x)` to mark completed tests
- Use `UAT-CHECK( )` for pending tests
- Test each example in all three states (Rendered, Ghost, Raw)
- Verify semantic styling is preserved in all states
- Check boundary conditions (cursor at start/end of constructs)
