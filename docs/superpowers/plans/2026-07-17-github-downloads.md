# GitHub Release Downloads Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the disabled download note with a live, OS-aware download CTA backed by the latest GitHub release.

**Architecture:** Keep GitHub parsing and platform matching in a small pure utility, then render one client-side `DownloadRelease` leaf that fetches the public latest-release endpoint. Integrate that leaf into the existing product narrative without changing the surrounding section structure.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, native `fetch`, GitHub REST API, Bun tests

## Global Constraints

- Use no new dependency or backend.
- Detect macOS, Windows, Linux, and unsupported mobile platforms.
- Default assets: macOS universal DMG, Windows x64 setup EXE excluding Ollama, Linux x64 AppImage.
- Always provide a working GitHub latest-release fallback.
- Preserve the existing monochrome, editorial visual system.

---

### Task 1: Release matching utility

**Files:**
- Create: `src/lib/githubRelease.ts`
- Create: `tests/githubRelease.test.ts`

**Interfaces:**
- Produces: `detectPlatform(navigatorData)`, `pickDownload(release, platform)`, `formatBytes(bytes)`, and release/asset/platform types.

- [ ] **Step 1: Write failing unit tests**

Cover Windows, macOS, Linux, Android/iOS, preferred asset selection, Ollama exclusion, missing asset, and byte formatting.

- [ ] **Step 2: Verify failure**

Run `bun test tests/githubRelease.test.ts`; expect module-not-found failure.

- [ ] **Step 3: Add minimal pure utility**

Implement lowercase substring matching with mobile checks before desktop Linux checks. Return `null` when no preferred asset exists.

- [ ] **Step 4: Verify utility**

Run `bun test tests/githubRelease.test.ts`; expect all tests to pass.

### Task 2: Download rail

**Files:**
- Create: `src/components/DownloadRelease.tsx`
- Modify: `src/components/ProductNarrativeSections.tsx`
- Create: `tests/downloadRelease.test.mjs`
- Modify: `tests/productNarrativeSections.test.mjs`

**Interfaces:**
- Consumes: GitHub release utility from Task 1.
- Produces: `DownloadRelease` with loading, success, and fallback states.

- [ ] **Step 1: Write failing source integration tests**

Assert latest-release API URL, `Download for` copy, `All installers` fallback, and `<DownloadRelease />` replacing the disabled control.

- [ ] **Step 2: Verify failure**

Run `node --test tests/downloadRelease.test.mjs tests/productNarrativeSections.test.mjs`; expect missing component/integration failures.

- [ ] **Step 3: Build minimal download rail**

Fetch once in `useEffect` with `AbortController`. Render a reserved loading state, OS-specific asset link on success, and GitHub latest-release link on every fallback. Use the existing button component and icon family.

- [ ] **Step 4: Verify all work**

Run `bun test tests/githubRelease.test.ts`, all Node tests, lint, TypeScript build, Vite production build, and `git diff --check`.

- [ ] **Step 5: Commit**

Commit implementation and tests as `feat: add OS-aware release downloads`.
