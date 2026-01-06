# Footnotes

**Status:** ⚠️ Reconsider / Delay  
**Priority:** Low (reconsidering)

## Overview

Support for footnote syntax `[^1]` with reference links and footnote definitions.

## Details

- **Feasibility:** Moderate
- **Usefulness:** Low
- **Risk:** Medium (complex linking)
- **Effort:** 2 weeks

## Implementation

Detect footnote syntax `[^1]`, link to footnote definitions, style footnotes distinctively, handle footnote definitions.

## Dependencies

None (parser enhancement)

## Concerns

- Complex linking between references and definitions
- Low frequency of use (most users don't use footnotes)
- Moderate complexity for limited value

## Recommendation

Reassess after core features are complete, evaluate user demand.

## Notes

- Core GFM feature but low frequency
- Useful for academic users
- Markless status unknown
- Complex implementation for limited use case

## Examples

```markdown
This is a sentence with a footnote[^1].

[^1]: This is the footnote definition.
```

→ Footnotes styled distinctively, links between references and definitions
