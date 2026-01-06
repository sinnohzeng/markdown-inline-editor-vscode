# Blockquotes

**Status:** ✅ Implemented  
**Priority:** Core Feature

## Overview

Blockquotes with visual bar indicator and support for nested blockquotes.

## Implementation

- Syntax: `> quote`
- Blockquote marker (`>`) is replaced with visual bar (│)
- Supports nested blockquotes (`> > nested`)
- Visual bar indicates nesting level

## Examples

- `> Quote text` → │ Quote text (marker hidden)
- `> > Nested quote` → │ │ Nested quote (nested indicator)
