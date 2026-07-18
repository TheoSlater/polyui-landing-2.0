# Download anchor scroll

- Change hero `Download Poly UI` and header `Download` CTAs to `href="#downloads"`.
- Keep native anchor behavior and force smooth CSS scrolling.
- Inside `prefers-reduced-motion: reduce`, explicitly retain `scroll-behavior: smooth !important` per product requirement.
- Add scroll margin to the download target so the sticky header does not cover it.
- Do not change direct installer links inside the download section.
- Source-test both CTA targets, forced reduced-motion override, and target offset.
