# Feature Requests

This directory contains detailed specifications for all upcoming features, organized by status and priority.

## Structure

Features are organized into individual markdown files, one per feature. Each file contains:
- Status (Implement/Reconsider/Remove)
- Priority
- Implementation details
- Dependencies
- Notes and concerns

## Feature Index

### ✅ Implement / Improve

#### High Priority (Core GFM - Must Have)
- [autolinks.md](autolinks.md) - Automatic link detection for URLs and emails
- [mermaid-diagrams.md](mermaid-diagrams.md) - Hover preview for Mermaid diagrams
- [latex-math.md](latex-math.md) - Hover preview for LaTeX/math formulas

#### Medium Priority (Extended Features)
- [per-file-toggle-state.md](per-file-toggle-state.md) - Per-file decoration toggle state
- [yaml-frontmatter.md](yaml-frontmatter.md) - YAML frontmatter detection and styling

#### Low Priority (Nice-to-Have)
- [emoji-support.md](emoji-support.md) - Emoji shortcode rendering

### ⚠️ Reconsider / Delay

- [ordered-list-auto-numbering.md](ordered-list-auto-numbering.md) - Auto-number ordered lists
- [footnotes.md](footnotes.md) - Footnote syntax support

### ❌ Remove

- [highlighting-support.md](highlighting-support.md) - `==text==` highlighting syntax

## Summary

| Category | Count | Total Effort |
|----------|-------|--------------|
| **✅ Implement / Improve** | 6 features | 7-9 weeks |
| **⚠️ Reconsider / Delay** | 2 features | 4-5 weeks |
| **❌ Remove** | 1 feature | - |

## Priority Breakdown

- **High Priority (Must Have):** 3 features (5-7 weeks)
- **Medium Priority (Extended):** 2 features (2 weeks)
- **Low Priority (Nice-to-Have):** 1 feature (1 week)

## Related Documents

- [Feature Implementation Table](../FEATURE_IMPLEMENTATION_TABLE.md) - Comprehensive feature table with all details
- [Feature Extraction from Markless](../FEATURE_EXTRACTION_MARKLESS.md) - Analysis of markless features
- [Competitive Analysis](../competitive_analysis.md) - Comparison with other extensions
