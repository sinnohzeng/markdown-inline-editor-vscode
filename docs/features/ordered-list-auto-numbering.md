# Ordered List Auto-Numbering

**Status:** ⚠️ Reconsider / Delay  
**Priority:** High (reconsidering)

## Overview

Hide list markers and show auto-numbered items (1, 2, 3...), including support for nested lists.

## Details

- **Feasibility:** Moderate
- **Usefulness:** High
- **Risk:** Medium (edge cases)
- **Effort:** 2-3 weeks

## Implementation

Hide markers (`1.`, `2.`, etc.), calculate numbers based on position, track nesting levels, support GFM parentheses (`1)` vs `1.`), handle out-of-order numbering.

## Dependencies

None (parser enhancement)

## Concerns

- Complex edge cases (nested lists, out-of-order numbering)
- Performance considerations (need to track list state)
- Moderate complexity for implementation

## Recommendation

Reassess after core features are complete, evaluate user demand.

## Notes

- Core GFM feature
- Competitive requirement (markless has it)
- Major UX improvement
- Complex implementation due to edge cases

## Examples

```markdown
1. First item
2. Second item
   1. Nested item
   2. Another nested item
3. Third item
```

→ Numbers auto-calculated, markers hidden
