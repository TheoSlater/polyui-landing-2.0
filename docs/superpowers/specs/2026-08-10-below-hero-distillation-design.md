# Below-Hero Distillation Design

## Goal

Reduce repetition and visual clutter below the existing hero while preserving the landing page's dark editorial identity and all working actions.

## Approved Direction

- Leave the hero's content and styling unchanged. Size only its outer section so the header and hero fill the first viewport and below-hero content begins after scrolling.
- Combine providers and core features into one concise section.
- Combine Agent and Browser messaging around the existing product screenshot.
- Keep one open-source and download close.
- Replace the repeated multi-column footer navigation and decorative wordmark with a compact footer row.
- Preserve existing destinations, download behavior, keyboard access, responsive behavior, typography, palette, and restrained reveal motion.

## Implementation

Reuse the existing components, content, tokens, Tailwind utilities, and Motion dependency. Prefer deletion and consolidation inside the current files; add no dependencies or speculative abstractions.

## Verification

Update the focused static checks for the consolidated structure, then run tests, lint, build, and `git diff --check`. Inspect desktop and mobile screenshots, including the first-viewport boundary.
