---
status: TODO
updateDate: 2026-01-17
priority: Core Feature
---

# Syntax Shadowing Rework

## Overview

Rework "syntax shadowing" (hiding markdown markers) to keep the editor readable while improving editing experience and reducing layout jumps.

This feature is milestone-based:

- **Milestone 1 (Variant A1)**: Keep semantic styling while editing (small, low-risk UX win)
- **Milestone 2 (Variant B)**: True 3-state shadowing (Rendered / Ghost / Raw) with open sub-variant decisions
- **Milestone 3 (Future)**: Stability improvements (e.g. tables/alignment) and follow-on refinements

Deep-dive background and design variants live in [docs/plans/syntax-shadowing-rework-analysis.plan.md](../../../plans/syntax-shadowing-rework-analysis.plan.md).

## Implementation

### Milestone 1 — Variant A1: Keep styling while editing (minimum change)

**Goal:** When the cursor is on a line (or when a selection overlaps), show raw syntax *only for syntax/marker decorations*, but keep semantic styling for the content.

**Desired behavior:**

- Keep semantic decorations active on the active line (e.g. bold/italic/link/heading styling).
- Disable only the decorations that hide/replace raw syntax markers (today mainly `hide`, and any future "replacement" decorators).
- Preserve existing "smart click" behavior for checkboxes (clicking the checkbox should still work without forcing raw reveal of the whole line).

**Non-goals (M1):**

- No new "Ghost cues" (that's M2).
- No change to the parsing model and no reclassification of hidden ranges (that's M2).

### Milestone 2 — Variant B: 3-state model (Rendered / Ghost / Raw)

**Goal:** Make focused editing feel premium and predictable with a formal state model and selective reveal.

**State model (target):**

- **Rendered**: syntax hidden; content styled
- **Ghost**: subtle edit cues, without fully restoring raw layout
- **Raw**: raw markdown visible for explicit editing intent

**Foundational work:**

- Split today's single "hidden" category into semantic buckets (markers vs metadata vs structural tokens) so Ghost/Raw can be selective.
- Define layering/priority rules for nested constructs (e.g. bold inside links, inline code inside emphasis).

#### Open questions (M2 sub-variants)

Keep these decisions *in this feature file* until chosen:

- **Ghost trigger**:
  - Cursor-on-line (current behavior), or
  - Only on explicit intent (e.g. selection), or
  - Hybrid: cursor-on-line for "cues only", selection for full Raw
- **Ghost representation**:
  - Show real syntax characters with a layout-stable style (e.g. `transparent` → faint ink), or
  - Keep real markers hidden and render synthetic cues (e.g. faint `**` via `before/after`, URL via hover), or
  - Mixed by category (markers get cues; metadata stays hidden)
- **Raw scope**:
  - Only reveal the overlapping construct, or
  - Reveal entire line (current behavior), or
  - Reveal only "marker buckets" while keeping metadata hidden
- **Settings vs defaults**:
  - Which parts become user settings vs fixed defaults
  - Whether any of this is per-file (align with the per-file toggle feature)

### Milestone 3 — Future improvements (stability + refinements)

- **Stable table alignment**: provide a mode that reduces alignment breakage in tables when markup is hidden, aligned with [table-column-alignment.md](table-column-alignment.md).
- **Context-sensitive stability**: prefer layout-stable hiding (e.g. transparent) in layout-sensitive contexts (tables, maybe code-ish grids) while keeping compact hiding elsewhere.
- **Expanded "smart click" rules**: extend checkbox-like interaction handling to other constructs (e.g. link click intent vs edit intent).

## Acceptance Criteria

### Milestone 1 — Keep styling while editing

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

### Milestone 2 — 3-state shadowing

```gherkin
Feature: Rendered, Ghost, Raw states

  Scenario: Rendered is readable
    Given a markdown file with mixed formatting
    When I am not editing a construct
    Then syntax markers are hidden
    And content formatting is visible

  Scenario: Ghost provides edit cues without full raw layout
    Given **bold text** is in my file
    When the line is in Ghost state
    Then I can visually locate the formatting boundaries
    And the layout does not jump significantly

  Scenario: Raw is reachable on explicit intent
    Given [label](https://example.com) is in my file
    When I select text overlapping the link
    Then raw markdown is shown for editing
    When I clear the selection
    Then the view returns to Rendered or Ghost appropriately
```

```gherkin
Feature: Nested formatting remains predictable

  Scenario: Bold inside a link does not produce conflicting cues
    Given [**label**](https://example.com) is in my file
    When I enter Ghost state on that line
    Then both link and bold cues are consistent
    And the label remains readable
```

### Milestone 3 — Stability improvements (tables)

```gherkin
Feature: Stable layout in tables with markup

  Scenario: Table columns remain aligned with inline code
    Given a markdown table with `inline code` in a cell
    When decorations are applied
    Then table columns remain aligned
```

## Notes

- Current "shadowing" behavior is effectively line-based raw reveal for *all* decorations; this rework aims to keep styling stable while editing and to formalize a 3-state model.
- VS Code decoration capabilities and nesting/overlap behavior constrain implementation; state and layering rules must be explicit to avoid surprises.

## Examples

- **Milestone 1 example**: Cursor on `**bold**` shows `**` markers for editing but keeps bold styling on the content.
- **Milestone 2 example**: Ghost state shows subtle cues to locate formatting boundaries without fully restoring raw layout.
- **Milestone 3 example**: In tables, prefer stability-oriented hiding so columns don't visually drift when markup is present.
