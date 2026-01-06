# Task Lists

**Status:** ✅ Implemented  
**Priority:** Core Feature

## Overview

Task lists (checkboxes) with clickable toggles and support for all variants.

## Implementation

- Syntax: `- [ ]` (unchecked) or `- [x]` (checked)
- Checkboxes are rendered as ☐ (unchecked) or ☑ (checked)
- Clickable checkboxes - click inside checkbox to toggle
- Supports all variants:
  - Unordered lists: `- [ ]`, `* [ ]`, `+ [ ]`
  - Ordered lists: `1. [ ]`, `1) [ ]`
- Smart click behavior: raw markdown only shows when clicking behind checkbox, not on it
- Handles edge cases (missing spaces, invalid syntax)

## Examples

- `- [ ] Task` → ☐ Task (clickable)
- `- [x] Completed` → ☑ Completed (clickable)
- `1. [ ] Ordered task` → 1. ☐ Ordered task (clickable)
- `* [ ] Asterisk task` → • ☐ Asterisk task (clickable)
