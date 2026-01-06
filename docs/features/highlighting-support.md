# Highlighting Support

**Status:** ❌ Remove  
**Priority:** N/A

## Overview

Support for `==text==` highlighting syntax with background color styling.

## Reason for Removal

Non-standard feature that breaks "works everywhere" principle.

## Details

- **Feasibility:** High
- **Usefulness:** Low
- **Risk:** Low
- **Effort:** 1 week

## Implementation (Not Recommended)

Detect `==text==` syntax, style with background color, hide markers.

## Concerns

- Non-standard Markdown extension (not core GFM)
- Breaks "works everywhere" principle
- Markless doesn't have it (not competitive requirement)
- Limited adoption (not widely supported)

## Recommendation

Remove from roadmap. Only implement if very high user demand emerges.

## Alternative

Consider removing entirely or only implementing if there's overwhelming user demand.
