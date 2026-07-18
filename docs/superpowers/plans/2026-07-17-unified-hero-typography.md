# Unified Hero Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Use General Sans for the complete two-line hero headline and Manrope for all supporting website UI typography.

**Architecture:** Keep the existing Tailwind font tokens and explicit two-line hero structure. Replace the display and UI font sources at the global CSS boundary, then simplify the hero markup so every headline word inherits one heading font.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Fontshare, Fontsource, Node test runner, Bun, Vite

## Global Constraints

- Hero and headings use General Sans at weight 500.
- Body copy, navigation, buttons, and UI labels use Manrope.
- Hero remains exactly two lines with line-height `0.92` and letter-spacing `-0.055em`.
- Italicize only “every”; use no serif, pixel, gradient, shadow, or decorative font switching in the hero.
- Preserve layout, motion, colors, demo behavior, and copy.

---

### Task 1: Unify Landing Page Typography

**Files:**
- Modify: `tests/heroTypography.test.mjs`
- Modify: `package.json`
- Modify: `bun.lock`
- Modify: `src/index.css`
- Modify: `src/components/HeroWireframe.tsx`

**Interfaces:**
- Consumes: Tailwind `font-heading` and `font-sans` utilities defined by `@theme inline` in `src/index.css`.
- Produces: General Sans heading token, Manrope UI token, and fixed two-line hero markup without an accent element.

- [ ] **Step 1: Replace the typography regression test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("hero uses only General Sans while website UI uses Manrope", () => {
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");
  const css = readFileSync("src/index.css", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.ok(pkg.dependencies["@fontsource-variable/manrope"]);
  assert.equal(pkg.dependencies["@fontsource-variable/inter"], undefined);
  assert.equal(pkg.dependencies["@fontsource-variable/space-grotesk"], undefined);
  assert.match(css, /api\.fontshare\.com\/v2\/css\?f\[\]=general-sans@500/);
  assert.match(css, /@fontsource-variable\/manrope/);
  assert.doesNotMatch(css, /Departure Mono|space-grotesk/);
  assert.match(css, /--font-heading:\s*"General Sans"/);
  assert.match(css, /--font-sans:\s*"Manrope Variable"/);
  assert.match(css, /font-family:\s*"Manrope Variable"/);
  assert.match(hero, /font-heading/);
  assert.match(hero, /font-medium/);
  assert.match(hero, /leading-\[0\.92\]/);
  assert.match(hero, /tracking-\[-0\.055em\]/);
  assert.match(hero, /<span className="block">One interface for<\/span>/);
  assert.match(hero, /<span className="block">every AI model\.<\/span>/);
  assert.equal((hero.match(/<span className="block">/g) ?? []).length, 2);
  assert.doesNotMatch(hero, /<em|font-accent|italic|font-serif|text-shadow|drop-shadow|bg-clip-text/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/heroTypography.test.mjs`

Expected: FAIL because Manrope is absent and the hero still uses Space Grotesk plus Departure Mono.

- [ ] **Step 3: Replace font dependencies**

Run:

```bash
bun add @fontsource-variable/manrope
bun remove @fontsource-variable/inter @fontsource-variable/space-grotesk
```

Expected: `package.json` and `bun.lock` contain Manrope and no longer contain Inter or Space Grotesk.

- [ ] **Step 4: Replace global font imports and tokens**

Set the top of `src/index.css` to:

```css
@import url("https://api.fontshare.com/v2/css?f[]=general-sans@500&display=swap");
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/manrope";
@import "@fontsource-variable/jetbrains-mono";
```

Remove the Departure Mono `@font-face`. Set typography tokens and body font to:

```css
--font-heading: "General Sans", sans-serif;
--font-sans: "Manrope Variable", sans-serif;
--font-mono: "JetBrains Mono Variable", monospace;
```

```css
body {
  background: var(--page);
  color: var(--foreground);
  font-family: "Manrope Variable", system-ui, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 5: Simplify the hero headline markup**

Replace the heading in `src/components/HeroWireframe.tsx` with:

```tsx
<h1 className="text-left font-heading text-5xl font-medium leading-[0.92] tracking-[-0.055em] pb-1 sm:text-6xl xl:text-7xl">
  <span className="block">One interface for</span>
  <span className="block">every AI model.</span>
</h1>
```

- [ ] **Step 6: Run focused and regression tests**

Run: `node --test tests/heroTypography.test.mjs tests/demoEntrance.test.mjs`

Expected: 2 tests pass, 0 fail.

- [ ] **Step 7: Run static and production checks**

Run: `bun run lint`

Expected: exit 0; the pre-existing `react(only-export-components)` warning in `src/components/ui/button.tsx` may remain.

Run: `bunx tsc -b --force`

Expected: exit 0.

Run: `bunx vite build`

Expected: production build completes successfully.

Run: `git diff --check`

Expected: exit 0 with no whitespace errors.

- [ ] **Step 8: Commit implementation**

```bash
git add package.json bun.lock src/index.css src/components/HeroWireframe.tsx tests/heroTypography.test.mjs
git commit -m "feat: unify hero typography"
```
