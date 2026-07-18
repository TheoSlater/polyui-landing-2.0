# Product Narrative Sections Design

## Goal

Replace the six below-hero placeholders with a clean, spacious product narrative for Poly UI.

## Narrative Order

1. **Providers** — “Use the right model for the moment.” Four provider chips introduce cloud and local model choice.
2. **Core features** — “Everything you need. Nothing in the way.” Three concise proofs: unified context, files, and web search.
3. **Agent Mode** — “Delegate the work. Stay in control.” A single large product panel shows a traceable task run.
4. **Browser viewport** — “The web, inside the workspace.” A second large product panel shows a source-linked browser view.
5. **Open source** — “Built in the open.” A compact trust panel leads to GitHub.
6. **Downloads** — “Make one interface your AI home.” A compact final download panel closes the page.

## Layout and Visual Rules

- Use a `max-w-6xl` page frame with generous desktop vertical gaps of `7.5rem` to `12rem`; mobile gaps reduce without collapsing the hierarchy.
- Each section has one headline thought and a short supporting sentence.
- Providers use one sparse four-chip row. Core features use three short cards only.
- Agent Mode and Browser each use one large, realistic dark product mockup. Alternate media alignment between those sections.
- Open source and Downloads share the closing row. Do not create further bento grids, testimonials, carousels, or repeated decorative gradients.
- Preserve page colors, General Sans hero/heading typography, Manrope UI typography, border treatment, and motion direction.

## Components

- Remove `SectionPlaceholder` and its map from `src/App.tsx`.
- Add a focused section component for the static marketing content and small mockup subcomponents only where they remove repeated markup.
- Link Open source to `https://github.com/monolabsdev/poly-ui` in a new tab with `rel="noopener noreferrer"`.
- Keep Downloads visually present but nonfunctional until a release URL exists.

## Responsive Behavior

- Stack split layouts below the `md` breakpoint.
- Provider chips become a two-column grid on small screens.
- Product mockups retain readable controls and hide only purely decorative columns on narrow viewports.
- Buttons and links remain keyboard accessible with visible focus states inherited from the shared Button component.

## Verification

Add a small static-content test confirming placeholders are removed, all six narrative sections render in order, the GitHub link is safe and opens a new tab, and the layout includes the approved gap range. Run focused Node tests, lint, TypeScript check, production build, and `git diff --check`.
