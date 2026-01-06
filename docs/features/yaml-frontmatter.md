# YAML Frontmatter

**Status:** ✅ Implement / Improve  
**Priority:** Medium  
**Category:** Extended Features

## Overview

Detect, style, and hide YAML frontmatter delimiters at the start of Markdown documents.

## Details

- **Feasibility:** High
- **Usefulness:** Moderate
- **Risk:** Low
- **Effort:** 1 week

## Implementation

Detect `---` delimiters at document start, style frontmatter block, hide delimiters, reveal on selection.

## Dependencies

None (parser enhancement)

## Notes

- Not core GFM (frontmatter is YAML, not Markdown)
- Limited use case (Jekyll/Hugo/Obsidian workflows)
- Markless doesn't have it
- Polish feature
- Deferred from High Priority due to limited use case

## Examples

```markdown
---
title: My Document
author: John Doe
---

# Content starts here
```

→ Frontmatter styled distinctly, delimiters hidden, reveal on selection
