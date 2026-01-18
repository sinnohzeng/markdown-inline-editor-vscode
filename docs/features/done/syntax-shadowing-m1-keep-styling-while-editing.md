---
status: DONE
updateDate: 2026-01-17
priority: Core Feature
---

# Syntax Shadowing — Milestone 1: Keep styling while editing (Variant A1)

## Overview

This milestone is the minimum-change rework of “syntax shadowing” (hiding markdown markers): when editing a line, reveal raw syntax markers for editability **without losing semantic styling** on the content.

Deep-dive background and design variants: [docs/plans/syntax-shadowing-rework-analysis.plan.md](../../plans/syntax-shadowing-rework-analysis.plan.md).

## Implementation

- Marker/replacement decorations are categorized separately from semantic decorations via `isMarkerDecorationType()` helper
- When cursor is on a line or selection overlaps, only marker decorations are suppressed:
  - `hide` - syntax markers (**, #, etc.)
  - `transparent` - inline code backticks
  - `blockquote` - '>' replacement markers
  - `listItem` - list marker replacements
  - `checkboxUnchecked` / `checkboxChecked` - checkbox replacements
  - `horizontalRule` - horizontal rule replacements
- Semantic decorations (bold, italic, link, code, codeBlock, frontmatter, strikethrough, image, orderedListItem) remain active on active lines
- Heading styling is suppressed on the active line to expose raw `#` markers during edits
- Checkbox smart-click behavior preserved: checkbox decoration remains visible when cursor is inside checkbox range
- Implementation files:
  - `src/decorator/decoration-categories.ts` - Marker decoration categorization
  - `src/decorator.ts` - Updated filtering logic in `filterDecorations()` method (lines 614-622)
  - `src/decorator/__tests__/decorator-filtering.test.ts` - Test coverage

## Goal

When the cursor is on a line (or when a selection overlaps), show raw syntax *only for syntax/marker decorations*, but keep semantic styling for the content.

## Desired behavior

- Keep semantic decorations active on the active line (e.g. bold/italic/link/heading styling).
- Disable only the decorations that hide/replace raw syntax markers (today mainly `hide`, and any future "replacement" decorators).
- Preserve existing "smart click" behavior for checkboxes (clicking the checkbox should still work without forcing raw reveal of the whole line).

## Non-goals (Milestone 1)

- No new "Ghost cues" (that’s Milestone 2).
- No change to the parsing model and no reclassification of hidden ranges (that’s Milestone 2).

## Acceptance Criteria

```gherkin
Feature: Keep semantic styling on the active line

  Scenario: Cursor on a bold line keeps bold styling
    Given **bold text** is in my file
    When I place the cursor on the same line
    Then the text is displayed in bold
    And the bold markers are visible for editing

  Scenario: Cursor on a link keeps link styling
    Given [label](https://example.com) is in my file
    When I place the cursor on the same line
    Then the label keeps link styling
    And the raw link syntax is available for editing
```

```gherkin
Feature: Checkbox click does not break interaction

  Scenario: Clicking a checkbox still toggles
    Given - [ ] task is in my file
    When I click on the checkbox
    Then the checkbox toggles
    And the line does not unexpectedly lose semantic styling
```
