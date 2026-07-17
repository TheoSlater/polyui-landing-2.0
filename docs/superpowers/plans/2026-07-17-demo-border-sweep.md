# Demo Border Sweep Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a one-shot border sweep before revealing the Poly UI demo on page load.

**Architecture:** Add semantic animation classes to the existing demo frame and content. Keep sequencing entirely in CSS: a masked conic-gradient pseudo-element draws the sweep while delayed opacity/blur keyframes reveal content.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, native CSS animations, Node test runner

## Global Constraints

- Start immediately on page load and run once.
- Keep headline, copy, buttons, ambient glow, and demo interaction unchanged.
- Play even when `prefers-reduced-motion` is enabled.
- Add no dependency, component, state, or timer.

---

### Task 1: Demo entrance sequence

**Files:**
- Create: `tests/demoEntrance.test.mjs`
- Modify: `src/components/demo/PolyDemoWindow.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: existing `PolyDemoWindow` JSX and global stylesheet
- Produces: `.demo-entrance` frame and `.demo-entrance-content` reveal hooks

- [ ] **Step 1: Write failing source regression test**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const component = readFileSync("src/components/demo/PolyDemoWindow.tsx", "utf8");
const css = readFileSync("src/index.css", "utf8");

test("demo sweeps its border before revealing content", () => {
  assert.match(component, /demo-entrance/);
  assert.match(component, /demo-entrance-content/);
  assert.match(css, /@keyframes demo-border-sweep/);
  assert.match(css, /@keyframes demo-content-reveal/);
  assert.match(css, /animation:\s*demo-content-reveal[^;]*1\.15s/);
});
```

- [ ] **Step 2: Verify red**

Run: `node --test tests/demoEntrance.test.mjs`
Expected: FAIL because `demo-entrance` is absent.

- [ ] **Step 3: Add minimal hooks and CSS**

Add `demo-entrance` to the outer frame and wrap existing children in `.demo-entrance-content`. Define a masked `::before` conic-gradient sweep lasting 1.2 seconds and a 0.5-second content reveal delayed 1.15 seconds. Do not place these rules inside the reduced-motion media query.

- [ ] **Step 4: Verify green and project health**

Run: `node --test tests/demoEntrance.test.mjs && bun run lint && bun run build`
Expected: one passing test, lint exit 0, build exit 0.

- [ ] **Step 5: Verify visually**

Run the Vite page and reload it. Confirm dark frame appears, border highlight circles once, then full demo resolves from blur without affecting hero copy.

- [ ] **Step 6: Commit**

```bash
git add tests/demoEntrance.test.mjs src/components/demo/PolyDemoWindow.tsx src/index.css
git commit -m "feat: reveal demo after border sweep"
```
