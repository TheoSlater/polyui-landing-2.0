# Demo Model Names Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show the requested GPT 5.6 variants in the hero demo selector.

**Architecture:** Keep the existing selector state and rendering. Replace only its static model data and protect names, order, and default with one source test.

**Tech Stack:** React, TypeScript, Node test runner

## Global Constraints

- Default and first option: `GPT 5.6-Sol`
- Then `GPT 5.6 Terra`, then `GPT 5.6 Luna`
- Preserve existing selector behavior and styling.

---

### Task 1: Replace demo models

**Files:**
- Modify: `src/components/demo/DemoModelSelector.tsx`
- Test: `tests/demoModelSelector.test.mjs`

**Interfaces:**
- Consumes: existing `DemoModelSelector` component
- Produces: unchanged component API with new static model names

- [ ] **Step 1: Write failing source test**

Assert exact model strings appear in order and `MODELS[0].name` remains the initial state.

- [ ] **Step 2: Verify failure**

Run `node --test tests/demoModelSelector.test.mjs`; expect failure on missing `GPT 5.6-Sol`.

- [ ] **Step 3: Replace static model entries**

Use `GPT 5.6-Sol`, `GPT 5.6 Terra`, and `GPT 5.6 Luna`, each with existing OpenAI-compatible metadata.

- [ ] **Step 4: Verify**

Run focused test, full test suite, lint, typecheck, and production build; expect passes except known `button.tsx` lint warning.

- [ ] **Step 5: Commit**

Commit code and test as `feat: update demo model choices`.
