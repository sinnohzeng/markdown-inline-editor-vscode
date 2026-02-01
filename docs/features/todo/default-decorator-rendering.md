---
status: TODO
updateDate: 2026-02-02
priority: Medium
---

# Default Behavior for Rendering Markdown Decorators

## Overview

Provide a simple global toggle for the default behavior when opening markdown files: either render decorators by default (current behavior) or show raw markdown by default. Optionally, when "off by default," skip parsing documents until the user explicitly enables decorations (reduces CPU/memory when many markdown files are open).

## Implementation

- Add a setting under `markdownInlineEditor.defaultBehaviors`, e.g. `decorations.enabledByDefault` (boolean, default `true` to preserve current behavior).
- On activation / when a markdown document becomes active, read this setting and set the decorator's initial state (rendering on vs off) accordingly.
- The existing "Toggle Markdown Decorations" command continues to allow per-session override; the setting only affects the **initial** state when opening a file or when the extension activates.
- **Optional (stretch):** When `enabledByDefault` is `false`, consider skipping parse/cache work for markdown documents until the user runs the toggle command for that editor—reduces work when the user prefers raw markdown most of the time.

## Acceptance Criteria

```gherkin
Feature: Default decorator rendering

  Scenario: Decorations on by default
    Given "decorations enabled by default" is true in settings
    When I open a markdown file
    Then decorations are shown initially
    And I can still toggle them off with the command

  Scenario: Decorations off by default
    Given "decorations enabled by default" is false in settings
    When I open a markdown file
    Then raw markdown is shown initially
    And I can enable decorations with the toggle command

  Scenario: Setting change affects new editors only
    Given a markdown file is open with decorations on
    When I change the default to "off"
    Then the already-open file keeps its current state
    And the next opened markdown file starts with decorations off
```

### Optional: Skip parsing when off by default

```gherkin
Feature: Skip parsing when default is off

  Scenario: No parse until user enables
    Given "decorations enabled by default" is false
    And "skip parsing when off" is true
    When I open a markdown file
    Then the extension does not parse the document initially
    When I run "Toggle Markdown Decorations"
    Then the document is parsed and decorations are applied
```

## Notes

- Keeps UX simple: one setting for "start with decorations on or off."
- Aligns with existing `defaultBehaviors.diffView.applyDecorations` naming under `markdownInlineEditor`.
- Skip-parsing optimization is optional and should be clearly documented; ensure toggle command still works and first parse is fast (e.g. use existing cache on first enable).
- Per-file toggle state (see `per-file-toggle-state.md`) could later override this default when implemented.

## Examples

- User prefers writing in raw markdown: set default to off, open files without decoration overhead; enable via command when previewing.
- Large workspace with many `.md` files: default off + skip parsing reduces activation cost until user opts in per editor.
