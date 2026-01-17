---
status: TODO
updateDate: 2026-01-17
priority: Core Feature
---

# Syntax Shadowing — Milestone 3: Stability improvements + refinements

## Overview

This milestone is about reducing layout instability and extending the interaction model in layout-sensitive and high-friction contexts (starting with tables).

Deep-dive background and design variants: [docs/plans/syntax-shadowing-rework-analysis.plan.md](../../plans/syntax-shadowing-rework-analysis.plan.md).

## Goal

Improve stability (less visual drift/jump) and refine interaction rules once the Milestone 2 model is in place.

## Scope (initial)

- **Stable table alignment**: provide a mode that reduces alignment breakage in tables when markup is hidden, aligned with [table-column-alignment.md](table-column-alignment.md).
- **Context-sensitive stability**: prefer layout-stable hiding (e.g. transparent) in layout-sensitive contexts (tables, maybe code-ish grids) while keeping compact hiding elsewhere.
- **Expanded "smart click" rules**: extend checkbox-like interaction handling to other constructs (e.g. link click intent vs edit intent).

## Acceptance Criteria

```gherkin
Feature: Stable layout in tables with markup

  Scenario: Table columns remain aligned with inline code
    Given a markdown table with `inline code` in a cell
    When decorations are applied
    Then table columns remain aligned
```
