# Production Polish Design

## Goal

Prepare the existing Poly UI landing page for deployment without redesigning it or adding product-demo features that do not already exist.

## Scope

- Preserve the dark editorial layout, current content order, General Sans/Manrope pairing, brand palette, and existing demo states.
- Audit the single page at 375, 768, 1024, 1440, and 1920 pixels once the in-app browser is available.
- Fix only demonstrated visual, responsive, accessibility, performance, metadata, deployment, and code-quality defects.
- Do not add replay, pause, Agent Mode, reasoning, tool-call, or timed demo states; the current demo has no such behavior.
- Add no dependencies, sections, invented production domain, analytics ID, release URL, legal copy, or light theme.

## Approach

Use a targeted production pass. Start with browser evidence and baseline checks, then make the smallest shared fixes that resolve each confirmed defect. Reuse current components, Tailwind tokens, Base UI buttons, Motion, and browser-native semantics. Keep changes in existing files unless a deployment asset such as `robots.txt` or `sitemap.xml` is independently required and can be correct without an invented domain.

## Page and Component Changes

### Navigation and structure

- Add a keyboard skip link and a stable main-content target.
- Replace dead header `#` links with existing section anchors.
- Confirm sticky-header offsets and mobile navigation behavior.
- Keep footer links limited to working destinations already represented on the page.

### Visual and responsive polish

- Review spacing, heading wraps, button sizing, demo readability, image framing, and overflow at every target width.
- Adjust existing utility classes and tokens only where screenshots show a defect.
- Preserve current max width, visual direction, typography, glow, and section order.

### Interactive demo

- Test model selection and viewport open/close with pointer and keyboard input.
- Correct focus, naming, dismissal, reduced-motion, and responsive drawer behavior where needed.
- Treat static mock controls as decorative unless they already perform an action.

### Accessibility

- Use native landmarks and controls, visible `:focus-visible` states, accessible names, decorative-icon hiding, correct heading order, and sufficient touch targets.
- Disable or remove nonessential motion under `prefers-reduced-motion`.
- Preserve zoom and avoid global transforms.

### Performance and assets

- Give images intrinsic dimensions, lazy-load below-fold imagery, and keep above-fold assets eager only when useful.
- Remove confirmed duplicate or unused assets and debug artifacts.
- Avoid speculative micro-optimizations or dependency changes.

### Metadata and deployment

- Complete title, description, Open Graph, Twitter card, favicon, Apple touch icon, theme color, language, and social-image metadata using existing assets.
- Add canonical, robots, or sitemap data only when a real configured production URL exists; otherwise report the missing URL as a deployment blocker.
- Verify external repository, release, installer, and provider-asset URLs.

## Error Handling and State

Keep the existing GitHub release fallback. Preserve abort handling for release fetches. Ensure temporary copy feedback cannot update after unmount. Avoid suppressed errors, empty catches, and longer arbitrary timeouts.

## Validation

- Run tests before each behavior fix, add one focused failing regression test, then implement the smallest passing change.
- Run formatter if configured, lint, TypeScript build, unit tests, production build, and production preview.
- In the in-app browser, inspect every target width, console, failed network requests, keyboard navigation, reduced motion, interactive demo states, links, and horizontal overflow.
- Capture final desktop, tablet, and mobile screenshots.

## Known Blocker

The in-app browser currently exposes no browser target. Implementation requiring visual judgment and final visual validation must wait until that target is available; source inspection and baseline test/build results are not substitutes.
