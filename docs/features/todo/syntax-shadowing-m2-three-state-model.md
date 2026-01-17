---
status: TODO
updateDate: 2026-01-17
priority: Core Feature
---

# Syntax Shadowing — Milestone 2: 3-state model (Rendered / Ghost / Raw)

## Overview

This milestone formalizes focused editing with a predictable 3-state model and selective reveal rules.

Deep-dive background and design variants: [docs/plans/syntax-shadowing-rework-analysis.plan.md](../../plans/syntax-shadowing-rework-analysis.plan.md).

## Goal

Make focused editing feel premium and predictable with a formal state model and selective reveal.

## State model (target)

- **Rendered**: syntax hidden; content styled
- **Ghost**: subtle edit cues, without fully restoring raw layout
- **Raw**: raw markdown visible for explicit editing intent

## Foundational work

- Split today’s single "hidden" category into semantic buckets (markers vs metadata vs structural tokens) so Ghost/Raw can be selective.
- Define layering/priority rules for nested constructs (e.g. bold inside links, inline code inside emphasis).

## Open questions (Milestone 2 sub-variants)

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

## Acceptance Criteria

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
