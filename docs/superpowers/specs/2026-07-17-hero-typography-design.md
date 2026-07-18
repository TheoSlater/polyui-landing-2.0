# Hero Typography Design

## Goal

Replace the hero's mixed-font treatment with one consistent General Sans headline while moving all supporting interface copy to Manrope.

## Typography

- Hero and headings use General Sans, loaded through Fontshare.
- Body copy, navigation, buttons, and UI labels use Manrope, bundled with Fontsource.
- JetBrains Mono remains available for code-only content.
- Remove Space Grotesk and Departure Mono from the landing page typography system.

## Hero Composition

Keep the existing left-aligned, two-line wording:

```text
One interface for
every AI model.
```

Use General Sans at weight 500, line-height `0.92`, and letter-spacing `-0.055em`. Preserve the current responsive scale and two explicit block lines. Remove the accent element, italic styling, font switching, relative positioning, and custom inter-word spacing.

## Scope

Change only font dependencies, global typography tokens, body font, hero markup, and the focused typography regression test. Preserve layout, motion, colors, demo behavior, and content.

## Verification

The regression test must confirm General Sans and Manrope usage, absence of the previous display and pixel fonts, exact two-line hero markup, and absence of decorative hero typography. Run the focused tests, linter, TypeScript build, and production build.
