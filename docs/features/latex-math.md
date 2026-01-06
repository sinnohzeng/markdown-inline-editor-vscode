# LaTeX/Math

**Status:** ✅ Implement / Improve  
**Priority:** High  
**Category:** Core GFM - Must Have

## Overview

Hover preview for rendered LaTeX/math formulas using inline and block math syntax.

## Details

- **Feasibility:** Moderate
- **Usefulness:** High
- **Risk:** Medium (rendering complexity)
- **Effort:** 2-3 weeks

## Implementation

Detect `$...$` (inline) and `$$...$$` (block) math, render on hover using hover provider (better than markless inline approach).

## Dependencies

Math rendering solution required (to be determined)

## Notes

- Essential for academic/technical users
- Competitive requirement (markless has it but buggy)
- Hover approach avoids markless bugs
- Better performance than inline rendering
- Simpler and more reliable than inline approach

## Examples

- Inline math: `$E = mc^2$` → Hover to see rendered formula
- Block math: `$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$` → Hover to see rendered formula
