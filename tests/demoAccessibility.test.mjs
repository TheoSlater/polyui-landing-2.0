import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("closed viewport is inert and model menu supports Escape", () => {
  const viewport = readFileSync("src/components/demo/DemoBrowserViewport.tsx", "utf8");
  const selector = readFileSync("src/components/demo/DemoModelSelector.tsx", "utf8");

  assert.match(viewport, /inert=\{!open\}/);
  assert.match(selector, /event\.key === "Escape"/);
  assert.match(selector, /aria-controls="demo-model-listbox"/);
  assert.match(selector, /id="demo-model-listbox"/);
});

test("static demo sidebar does not expose dead controls", () => {
  const sidebar = readFileSync("src/components/demo/DemoSidebar.tsx", "utf8");

  assert.match(sidebar, /<aside aria-hidden="true"/);
  assert.doesNotMatch(sidebar, /<button/);
});
