# Taste Pass and Footer Design

## Goal

Refine the below-hero page so it feels authored rather than template-generated, then add a sparse footer inspired by the supplied dark reference.

## Design Read

This is a dark desktop-software landing page for technical, design-conscious users. The visual language is calm, premium, and product-led. Use moderate asymmetry, restrained motion, and very low density.

## Section Refinements

- Remove numbered mono eyebrows from every section. Use at most one plain functional eyebrow across the entire below-hero narrative.
- Replace the four text provider cards with a quiet row of real monochrome provider marks for OpenAI, Anthropic, Google Gemini, and Ollama.
- Replace the equal three-card feature grid with an asymmetric editorial composition: one large feature statement and two smaller supporting rows. Do not wrap every item in a rounded card.
- Remove the div-built Agent and Browser mock interfaces. Use the real `PolyUI_Demo.png` product screenshot from the sibling Poly UI application as the page's single below-hero product image.
- Keep Agent Mode and Browser copy as two distinct narrative moments around that screenshot without creating consecutive mirrored zigzags.
- Replace the paired Open Source and Download cards with one full-width open-source statement and a restrained disabled download note.
- Keep section spacing generous at `7.5rem` to `12rem` on desktop and preserve the existing Motion viewport reveals.

## Footer

- Add one dark footer with large top padding and the same `max-w-6xl` page frame.
- Upper area: small Poly UI brand block plus only useful navigation. Include internal links to Models, Agent Mode, and Browser, and one external GitHub link.
- GitHub opens `https://github.com/monolabsdev/poly-ui` in a new tab with `rel="noopener noreferrer"`.
- Do not add invented Company, Legal, Careers, social, or documentation links.
- Add a thin divider, concise copyright line using the current year, and an oversized low-contrast `Poly UI` wordmark anchored to the bottom edge.
- The wordmark uses General Sans, not a new pixel font. Keep it decorative with `aria-hidden="true"`.

## Responsive and Accessibility

- Below `md`, stack all asymmetric layouts into one column and keep generous but reduced vertical spacing.
- Provider logos remain legible in a two-column mobile grid.
- Product screenshot uses descriptive alt text and retains its full aspect ratio.
- Footer navigation remains keyboard accessible and collapses into a compact two-column layout.
- Motion remains limited to transform, opacity, and blur through the existing Motion approach.

## Verification

Extend focused static tests to confirm numbered eyebrows, equal feature-card grid, and fake interface panels are removed; real provider logos and product screenshot are present; footer contains only approved links; GitHub is safe and opens a new tab; and the oversized decorative wordmark is accessible. Run all Node tests, lint, TypeScript, production build, and `git diff --check`.
