import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const component = readFileSync("src/components/demo/PolyDemoWindow.tsx", "utf8");
const css = readFileSync("src/index.css", "utf8");
const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");

test("demo sweeps its border before revealing content", () => {
  assert.match(component, /demo-entrance/);
  assert.match(component, /demo-chat-glint/);
  assert.match(component, /demo-entrance-content/);
  assert.match(css, /@keyframes demo-border-glint/);
  assert.match(css, /@keyframes demo-content-reveal/);
  assert.doesNotMatch(css, /radial-gradient/);
  assert.match(component, /demo-border-glint/);
  assert.match(component, /radius=\{14\}/);
  assert.match(component, /radius=\{10\}/);
  assert.match(css, /stroke-dasharray/);
  assert.doesNotMatch(css, /offset-path/);
  assert.match(css, /animation:\s*demo-border-glint 1\.5s linear/);
  assert.doesNotMatch(css, /@keyframes demo-glint-right/);
  assert.doesNotMatch(css, /conic-gradient\(from var\(--demo-sweep-angle\)/);
  assert.match(css, /animation:\s*demo-content-reveal[^;]*1\.75s/);
  assert.doesNotMatch(hero, /<BlurIn delay=\{0\.3\}/);
});
