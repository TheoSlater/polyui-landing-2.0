# Download Anchor Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Smoothly scroll download CTAs to the downloads section.

**Architecture:** Use native hash anchors and CSS smooth scrolling. No JavaScript handler or dependency.

**Tech Stack:** React, CSS, Node test runner

## Global Constraints

- Force smooth scrolling despite reduced-motion preference.
- Preserve direct release download links.

---

### Task 1: Download anchor behavior

**Files:**
- Modify: `src/components/HeroWireframe.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/ProductNarrativeSections.tsx`
- Modify: `src/index.css`
- Create: `tests/downloadAnchorScroll.test.mjs`

- [ ] Write failing assertions for both anchors, scroll margin, and reduced-motion override.
- [ ] Run focused test and confirm failure.
- [ ] Apply native anchor and CSS changes.
- [ ] Run full tests, lint, typecheck, build, and `git diff --check`.
- [ ] Commit as `feat: scroll download CTAs to releases`.
