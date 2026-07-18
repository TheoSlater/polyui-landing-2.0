# Recommended Install Command Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the official README install script the recommended download path and add Linux distro-specific direct downloads.

**Architecture:** Extend the existing pure GitHub release utility with install-command and Linux package selection. Keep copy feedback and distro choice local to the existing `DownloadRelease` leaf.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Clipboard API, GitHub REST API, Bun tests

## Global Constraints

- No new dependency or backend.
- Use README commands verbatim.
- Linux selector has `Ubuntu / Debian` and `Other distro` only.
- Keep GitHub fallback and all-installer access.
- Preserve current monochrome editorial rail.

---

### Task 1: Command and package selection

**Files:**
- Modify: `src/lib/githubRelease.ts`
- Modify: `tests/githubRelease.test.ts`

**Interfaces:**
- Add: `installCommand(platform)` and Linux package choice support in `pickDownload`.

- [ ] Write failing tests for shell/PowerShell commands and DEB/AppImage selection.
- [ ] Run `bun test tests/githubRelease.test.ts`; expect failures on missing behavior.
- [ ] Add minimal command mapping and optional Linux package argument.
- [ ] Re-run utility tests; expect pass.

### Task 2: Recommended command rail

**Files:**
- Modify: `src/components/DownloadRelease.tsx`
- Modify: `tests/downloadRelease.test.mjs`

**Interfaces:**
- Consume: command and package selection from Task 1.
- Preserve: `DownloadRelease` public API.

- [ ] Write failing source assertions for `Recommended`, clipboard copy/error handling, and both distro choices.
- [ ] Run `node --test tests/downloadRelease.test.mjs`; expect failure.
- [ ] Add copyable command, brief copied feedback, Linux segmented selector, and subordinate direct-download CTA.
- [ ] Run utility tests, all Node tests, lint, typecheck, production build, real-release smoke test, and `git diff --check`.
- [ ] Commit as `feat: recommend scripted install`.
