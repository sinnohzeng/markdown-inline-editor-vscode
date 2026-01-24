---
status: TODO
updateDate: 2026-01-24
priority: Low
---

# HTML Tags

## Overview

Handle inline HTML in Markdown (e.g. `<br>`, `<sup>`, `<details>`, `<kbd>`) in a way that fits the “hide syntax, focus on content” approach.

## Implementation

- Detect HTML nodes produced by the Markdown parser (remark emits `html` nodes for raw HTML)
- Decide on a safe rendering strategy:
  - Prefer **styling and selective hiding** of tags rather than executing/rendering arbitrary HTML
  - Keep content readable while preserving editability (raw should be revealed on cursor/selection)
- Integrate with the 3‑state visibility model:
  - Rendered: hide or de-emphasize tag syntax (as appropriate per tag type)
  - Raw: reveal the original HTML for editing
- Scope handling must avoid interfering with code spans/blocks and fenced code

## Acceptance Criteria

```gherkin
Feature: HTML tag handling

  Scenario: Inline line break tag
    When I type "Hello<br>World"
    Then the "<br>" syntax is handled gracefully
    And the content remains readable

  Scenario: HTML inside code is not modified
    When I type "`<br>`" in inline code
    And I type "<br>" inside a fenced code block
    Then the HTML is not modified

  Scenario: Reveal HTML on selection
    Given "<kbd>Ctrl</kbd>" is in my file
    When I select inside the HTML region
    Then the raw HTML is shown
    When I deselect
    Then the rendered view is restored
```

## Notes

- HTML in Markdown is common in GitHub READMEs and docs, but rendering it “WYSIWYG” can be risky
- Scope/selection behavior is critical for editability
- Consider making this optional via configuration

## Examples

- `Hello<br>World` → visually reads as a line break (or at minimum de-emphasizes `<br>`)
- `<kbd>Ctrl</kbd>+<kbd>C</kbd>` → preserves readable key labels while hiding tag noise
