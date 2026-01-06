# Links

**Status:** ✅ Implemented  
**Priority:** Core Feature

## Overview

Clickable links with hidden URL and syntax markers.

## Implementation

- Syntax: `[text](url)`
- Link text is displayed, URL is hidden
- Links are Ctrl+Clickable (via link provider)
- Supports nested formatting in link text

## Examples

- `[Link Text](https://example.com)` → **Link Text** (URL hidden, clickable)
- `[**Bold** Link](https://example.com)` → **Bold** Link (supports formatting)
