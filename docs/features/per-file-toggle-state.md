# Per-File Toggle State

**Status:** ✅ Implement / Improve  
**Priority:** Medium  
**Category:** Extended Features

## Overview

Enable/disable decorations per file instead of globally, allowing fine-grained control over decoration state.

## Details

- **Feasibility:** High
- **Usefulness:** High
- **Risk:** Low
- **Effort:** 1 week

## Implementation

Store toggle state per file URI, add UI control, persist state across sessions.

## Dependencies

State persistence mechanism (to be determined)

## Notes

- Competitive advantage (markless doesn't have it)
- Better UX - users may want different settings per file
- Low complexity
- Promoted from Low Priority due to high value

## Examples

- File A: Decorations enabled
- File B: Decorations disabled
- State persists across VS Code sessions
