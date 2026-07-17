# Demo Border Sweep

## Goal

On initial page load, keep the Poly UI demo content hidden while a subtle highlight sweeps around its border, matching the supplied Linear reference. After the sweep, reveal the demo UI from a soft blur.

## Design

- Keep the demo frame and dark background visible from first paint.
- Run one border sweep for about 1.2 seconds using a CSS pseudo-element and masked conic gradient.
- Fade the border highlight away as the sweep ends.
- Reveal the existing demo content over about 0.5 seconds with opacity and blur.
- Start immediately on page load and run once.
- Keep headline, copy, buttons, ambient glow, and demo interaction unchanged.
- Intentionally play the sequence even when `prefers-reduced-motion` is enabled, per product direction.

## Implementation

Add one wrapper/class split inside `PolyDemoWindow`: outer frame owns the sweep; inner content owns the delayed reveal. Define both keyframes in the existing global stylesheet. No new component, state, timer, or dependency.

## Verification

- Add a minimal source-level regression check for sweep and reveal hooks before implementation.
- Run the check, build, and lint.
- Load the page and visually confirm: frame first, border sweep second, content reveal last.
