---
status: TODO
updateDate: 2026-01-24
priority: Medium
---

# Set Default Feature Activation

## Overview

Allow users to configure which Markdown features are decorated/enabled by default (e.g., enable headings and links, but disable tables or emoji rendering).

## Implementation

- Introduce per-feature (or per-category) enable/disable configuration under `markdownInlineEditor.*`
- Apply config at decoration application time (so parsing/scoping can remain consistent)
- Ensure the 3‑state visibility model (Rendered/Ghost/Raw) still works correctly when a feature is disabled:
  - Disabled feature should render as raw markdown by default
  - Cursor/selection reveal behavior should continue to work for other enabled features
- Prefer grouping by feature category (e.g. `headings`, `links`, `lists`, `code`, `emoji`, `tables`) to avoid an unbounded settings surface

## Acceptance Criteria

```gherkin
Feature: Default feature activation

  Scenario: Disable a single feature
    Given headings decorations are disabled in settings
    When I open a markdown file with "# Title"
    Then the raw "# Title" markdown is shown
    And other enabled features still render

  Scenario: Enable a feature
    Given headings decorations are enabled in settings
    When I open a markdown file with "# Title"
    Then the heading is rendered

  Scenario: Changing settings updates editor
    Given a markdown file is open
    When I toggle a feature setting
    Then decorations update without reloading the editor
```

## Notes

- Needs careful UX: too many toggles can overwhelm users
- Should avoid expensive re-parsing on selection changes; prefer applying config at decoration layer
- Must stay consistent with diff-view policy (raw-by-default in diffs)

## Examples

- Disable emoji rendering globally while keeping core Markdown decorations enabled
- Disable table rendering until table support is implemented/performance-tuned
