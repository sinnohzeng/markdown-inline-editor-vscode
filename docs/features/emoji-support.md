# Emoji Support

**Status:** ✅ Implement / Improve  
**Priority:** Low  
**Category:** Nice-to-Have

## Overview

Render emoji shortcodes like `:smile:` and `:+1:` inline in Markdown documents.

## Details

- **Feasibility:** High
- **Usefulness:** Low
- **Risk:** Low
- **Effort:** 1 week

## Implementation

Detect emoji shortcodes (`:smile:`, `:+1:`), render or style, handle invalid shortcodes gracefully.

## Dependencies

Emoji handling solution (optional, to be determined)

## Notes

- Nice-to-have feature
- Easy to implement
- GitHub-specific (not core GFM)
- Competitive feature (markless has it)
- Should be optional/configurable

## Examples

- `:smile:` → 😄
- `:+1:` → 👍
- `:tada:` → 🎉
- Invalid shortcodes handled gracefully
