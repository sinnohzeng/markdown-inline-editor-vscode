# Autolinks

**Status:** ✅ Implement / Improve  
**Priority:** High  
**Category:** Core GFM - Must Have

## Overview

Support for automatic link detection for URLs and email addresses in angle brackets.

## Details

- **Feasibility:** High
- **Usefulness:** High
- **Risk:** Low
- **Effort:** 1 week

## Implementation

Detect `<https://...>` and `<email@example.com>`, style as links, hide brackets.

## Dependencies

None (parser enhancement)

## Notes

- Core GFM feature
- Competitive requirement (markless has it)
- Quick win
- Low complexity, high value

## Examples

- `<https://example.com>` → Rendered as clickable link, brackets hidden
- `<user@example.com>` → Rendered as clickable email link, brackets hidden
