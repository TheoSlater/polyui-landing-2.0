# Taste Pass and Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove generic AI-built section patterns and add a sparse, reference-inspired Poly UI footer.

**Architecture:** Keep section IDs and narrative order while replacing repeated cards and fake UI with asymmetric editorial layouts, real provider marks, and one real product screenshot. Add a separate static `SiteFooter` component and compose it after `main` in `App.tsx`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Motion, Simple Icons CDN, Node test runner, Bun, Vite

## Global Constraints

- Preserve current dark theme, typography, section IDs, GitHub URL, and viewport reveals.
- Remove numbered eyebrows, equal three-card row, and div-built Agent/Browser mock interfaces.
- Use the real Poly UI screenshot at `/polyui-demo.png` and real monochrome provider logos.
- Footer includes only useful internal section links and GitHub; no invented Company, Legal, Careers, social, or documentation destinations.
- Footer ends with an oversized low-contrast General Sans `Poly UI` wordmark marked `aria-hidden="true"`.
- Mobile layouts collapse below `md` and retain generous spacing.

---

### Task 1: Taste Pass on Product Narrative

**Files:**
- Modify: `tests/productNarrativeSections.test.mjs`
- Modify: `src/components/ProductNarrativeSections.tsx`
- Create: `public/polyui-demo.png` by copying `/home/squeegee/Documents/code/poly/poly-ui/public/PolyUI_Demo.png`

**Interfaces:**
- Consumes: existing section IDs and Motion reveal behavior.
- Produces: refined `ProductNarrativeSections` using real logo images and one product screenshot.

- [ ] **Step 1: Add failing taste assertions**

Append to the existing narrative test:

```js
assert.doesNotMatch(sections, /\d{2}\s*·/);
assert.doesNotMatch(sections, /md:grid-cols-3/);
assert.doesNotMatch(sections, /AgentPanel|BrowserPanel/);
assert.match(sections, /cdn\.simpleicons\.org\/openai/);
assert.match(sections, /cdn\.simpleicons\.org\/anthropic/);
assert.match(sections, /cdn\.simpleicons\.org\/googlegemini/);
assert.match(sections, /cdn\.simpleicons\.org\/ollama/);
assert.match(sections, /src="\/polyui-demo\.png"/);
assert.match(sections, /alt="Poly UI desktop app with chat and browser panels"/);
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/productNarrativeSections.test.mjs`

Expected: FAIL on numbered labels, equal feature cards, fake panel functions, and absent real assets.

- [ ] **Step 3: Copy the real screenshot**

Run:

```bash
cp /home/squeegee/Documents/code/poly/poly-ui/public/PolyUI_Demo.png public/polyui-demo.png
```

- [ ] **Step 4: Refactor section composition**

In `ProductNarrativeSections.tsx`:

```tsx
const providers = [
  { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/ffffff" },
  { name: "Anthropic", logo: "https://cdn.simpleicons.org/anthropic/ffffff" },
  { name: "Google Gemini", logo: "https://cdn.simpleicons.org/googlegemini/ffffff" },
  { name: "Ollama", logo: "https://cdn.simpleicons.org/ollama/ffffff" },
];
```

Render providers as logo-only marks with accessible `alt` text. Replace the three equal cards with a two-column layout: a large unboxed Context statement on the left, then Files and Search as two restrained rows on the right. Remove `AgentPanel` and `BrowserPanel`; render one full-width screenshot between the Agent Mode statement and a narrow Browser continuation block. Replace Open Source and Downloads cards with one border-top editorial close containing the repository CTA and a muted disabled download note.

- [ ] **Step 5: Verify GREEN**

Run: `node --test tests/productNarrativeSections.test.mjs`

Expected: narrative tests pass.

- [ ] **Step 6: Commit taste pass**

```bash
git add public/polyui-demo.png src/components/ProductNarrativeSections.tsx tests/productNarrativeSections.test.mjs
git commit -m "refactor: sharpen landing section design"
```

### Task 2: Reference-Inspired Footer

**Files:**
- Create: `tests/siteFooter.test.mjs`
- Create: `src/components/SiteFooter.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `SiteFooter(): JSX.Element` with internal Product links and external GitHub.
- Consumes: existing `GithubIcon`, `polyui-icon.png`, section IDs, and typography tokens.

- [ ] **Step 1: Write failing footer test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("footer contains only useful navigation and decorative wordmark", () => {
  const footer = readFileSync("src/components/SiteFooter.tsx", "utf8");
  const app = readFileSync("src/App.tsx", "utf8");

  for (const href of ["#providers", "#agents", "#browser"]) assert.match(footer, new RegExp(`href="${href}"`));
  assert.match(footer, /https:\/\/github\.com\/monolabsdev\/poly-ui/);
  assert.match(footer, /target="_blank"\s+rel="noopener noreferrer"/);
  assert.match(footer, /aria-hidden="true"/);
  assert.match(footer, />Poly UI<\/div>/);
  assert.doesNotMatch(footer, /Careers|Legal|Privacy|Terms|LinkedIn|Discord/);
  assert.match(app, /<SiteFooter \/>/);
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/siteFooter.test.mjs`

Expected: FAIL with `ENOENT` because `SiteFooter.tsx` does not exist.

- [ ] **Step 3: Implement footer and compose it**

Create `SiteFooter.tsx` with a `max-w-6xl` frame, `pt-28 sm:pt-40`, brand block, Product links, GitHub link, divider, current-year copyright, and bottom wordmark using `text-[clamp(5rem,18vw,14rem)]`, `font-heading`, tight line-height, and low foreground opacity. Import and render `<SiteFooter />` after `</main>` in `App.tsx`.

- [ ] **Step 4: Run full verification**

Run:

```bash
node --test tests/heroTypography.test.mjs tests/demoEntrance.test.mjs tests/siteHeader.test.mjs tests/productNarrativeSections.test.mjs tests/siteFooter.test.mjs
bun run lint
bunx tsc -b --force
bunx vite build
git diff --check
```

Expected: all tests pass, lint exits 0 with only the existing Button fast-refresh warning, TypeScript and build exit 0, and no whitespace errors are reported.

- [ ] **Step 5: Commit footer**

```bash
git add src/App.tsx src/components/SiteFooter.tsx tests/siteFooter.test.mjs
git commit -m "feat: add sparse landing footer"
```
