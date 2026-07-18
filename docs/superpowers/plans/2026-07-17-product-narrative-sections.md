# Product Narrative Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace below-hero temporary sections with a clean, spacious six-part Poly UI product narrative.

**Architecture:** Create one self-contained static marketing component that owns the section copy, layout, and small interface mockups. `App.tsx` only composes the header, hero, and this new component; no data fetching or new dependencies are required.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, lucide-react, Node test runner, Bun, Vite

## Global Constraints

- Keep the order: Providers, Core features, Agent Mode, Browser viewport, Open source, Downloads.
- Use `max-w-6xl`, desktop vertical section gaps of `7.5rem` to `12rem`, and responsive stacked layouts below `md`.
- One headline thought and short supporting sentence per section; no testimonial carousel, repeated bento grids, or repeated decorative gradients.
- Use General Sans for headings and Manrope for UI text through existing tokens.
- Open source links to `https://github.com/monolabsdev/poly-ui` in a new tab with `rel="noopener noreferrer"`.
- Downloads remain visually present and nonfunctional until a release URL exists.

---

### Task 1: Build Static Product Narrative Sections

**Files:**
- Create: `src/components/ProductNarrativeSections.tsx`
- Create: `tests/productNarrativeSections.test.mjs`

**Interfaces:**
- Consumes: `Button` from `@/components/ui/button`, `GithubIcon` from `@/components/GithubIcon`, Lucide icons, existing color/font Tailwind tokens.
- Produces: `ProductNarrativeSections(): JSX.Element`, rendering the approved six sections in order.

- [ ] **Step 1: Write the failing section-content test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("product narrative renders approved sections without temporary stand-ins", () => {
  const sections = readFileSync("src/components/ProductNarrativeSections.tsx", "utf8");

  for (const id of ["providers", "features", "agents", "browser", "open-source", "downloads"]) {
    assert.match(sections, new RegExp(`id="${id}"`));
  }
  assert.ok(sections.indexOf('id="providers"') < sections.indexOf('id="features"'));
  assert.ok(sections.indexOf('id="features"') < sections.indexOf('id="agents"'));
  assert.ok(sections.indexOf('id="agents"') < sections.indexOf('id="browser"'));
  assert.ok(sections.indexOf('id="browser"') < sections.indexOf('id="open-source"'));
  assert.ok(sections.indexOf('id="open-source"') < sections.indexOf('id="downloads"'));
  assert.match(sections, /py-30/);
  assert.match(sections, /py-48/);
  assert.match(sections, /md:grid-cols-2/);
  assert.match(sections, /https:\/\/github\.com\/monolabsdev\/poly-ui/);
  assert.match(sections, /target="_blank" rel="noopener noreferrer"/);
  assert.doesNotMatch(sections, new RegExp("Section" + "Placeholder", "i"));
});
```

- [ ] **Step 2: Run test to verify RED**

Run: `node --test tests/productNarrativeSections.test.mjs`

Expected: FAIL with `ENOENT` because `ProductNarrativeSections.tsx` does not exist.

- [ ] **Step 3: Implement the static narrative component**

Create `src/components/ProductNarrativeSections.tsx` with these exact section markers, structure, and copy:

```tsx
import { ArrowUpRight, Bot, FileText, Globe2, Search, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { Button } from "@/components/ui/button";

const providers = ["OpenAI", "Anthropic", "Google", "Ollama"];

const features = [
  { icon: Sparkles, label: "Context", title: "Everything within reach.", copy: "Conversations, files, and instructions stay connected." },
  { icon: FileText, label: "Files", title: "From question to artifact.", copy: "Bring documents into the work without breaking focus." },
  { icon: Search, label: "Search", title: "Fresh context, on demand.", copy: "Search the web and keep evidence close to the answer." },
];

export function ProductNarrativeSections() {
  return (
    <div className="pb-30 sm:pb-48">
      <section id="providers" className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48">
        <div className="grid items-end gap-10 md:grid-cols-2">
          <div><p className="font-mono text-xs text-muted-foreground">01 · PROVIDERS</p><h2 className="mt-4 max-w-xl font-heading text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl">Use the right model for the moment.</h2></div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:justify-self-end">Bring cloud and local models into one focused conversation.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4">{providers.map((provider) => <div key={provider} className="rounded-xl border border-border/70 bg-background/40 px-5 py-4 text-sm font-medium">{provider}</div>)}</div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48">{/* headline plus exactly three compact feature cards from `features` */}</section>
      <section id="agents" className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48">{/* Agent Mode heading beside one dark task-run mockup */}</section>
      <section id="browser" className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48">{/* browser mockup first on desktop, heading second */}</section>
      <section id="open-source" className="mx-auto max-w-6xl px-4 pt-30 sm:px-6 sm:pt-48">{/* GitHub trust card */}</section>
      <section id="downloads" className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">{/* final download card with disabled-looking no-op link */}</section>
    </div>
  );
}
```

Replace every JSX comment in the skeleton with the approved copy and static mockup UI. Keep Agent Mode and Browser each as one `rounded-2xl border border-border/70 bg-background/40` panel; use `hidden md:block` only for decorative mockup sidebars.

- [ ] **Step 4: Run the focused test to verify GREEN**

Run: `node --test tests/productNarrativeSections.test.mjs`

Expected: 1 test passes, 0 fail.

- [ ] **Step 5: Commit the component task**

```bash
git add src/components/ProductNarrativeSections.tsx tests/productNarrativeSections.test.mjs
git commit -m "feat: add product narrative sections"
```

### Task 2: Replace Placeholder Composition

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/components/SectionPlaceholder.tsx`
- Modify: `tests/productNarrativeSections.test.mjs`

**Interfaces:**
- Consumes: `ProductNarrativeSections` from `@/components/ProductNarrativeSections`.
- Produces: App composition with no `SectionPlaceholder` references.

- [ ] **Step 1: Extend failing integration assertion**

Append to `tests/productNarrativeSections.test.mjs`:

```js
test("app replaces temporary section map with product narrative sections", () => {
  const app = readFileSync("src/App.tsx", "utf8");

  assert.match(app, /import \{ ProductNarrativeSections \} from "@\/components\/ProductNarrativeSections"/);
  assert.match(app, /<ProductNarrativeSections \/>/);
  assert.doesNotMatch(app, new RegExp("Section" + "Placeholder|PLACEHOLDER_SECTIONS"));
});
```

- [ ] **Step 2: Run test to verify RED**

Run: `node --test tests/productNarrativeSections.test.mjs`

Expected: FAIL because `App.tsx` still imports and maps `SectionPlaceholder`.

- [ ] **Step 3: Simplify app composition and remove temporary section component**

Replace `src/App.tsx` with:

```tsx
import { HeroWireframe } from "@/components/HeroWireframe";
import { ProductNarrativeSections } from "@/components/ProductNarrativeSections";
import { SiteHeader } from "@/components/SiteHeader";

function App() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        <HeroWireframe />
        <ProductNarrativeSections />
      </main>
    </div>
  );
}

export default App;
```

Delete `src/components/SectionPlaceholder.tsx` with `apply_patch`.

- [ ] **Step 4: Run complete static tests to verify GREEN**

Run: `node --test tests/heroTypography.test.mjs tests/demoEntrance.test.mjs tests/siteHeader.test.mjs tests/productNarrativeSections.test.mjs`

Expected: 5 tests pass, 0 fail.

- [ ] **Step 5: Run static and production checks**

Run: `bun run lint`

Expected: exit 0; existing `react(only-export-components)` warning in `src/components/ui/button.tsx` may remain.

Run: `bunx tsc -b --force && bunx vite build`

Expected: exit 0 and production assets emitted.

Run: `git diff --check`

Expected: exit 0 with no whitespace errors.

- [ ] **Step 6: Commit integration**

```bash
git add src/App.tsx src/components/SectionPlaceholder.tsx tests/productNarrativeSections.test.mjs
git commit -m "feat: add landing product narrative"
```
