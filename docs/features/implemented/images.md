# Images

**Status:** ✅ Implemented  
**Priority:** Core Feature

## Overview

Image alt text styling with hidden syntax markers.

## Implementation

- Syntax: `![alt](img.png)`
- Alt text is styled, image path is hidden
- Markers (`![` and `](...)`) are hidden
- Handles empty alt text gracefully

## Examples

- `![Alt Text](image.png)` → **Alt Text** (styled, path hidden)
- `![](image.png)` → (empty alt text handled gracefully)
