import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const component = readFileSync("src/components/demo/PolyDemoWindow.tsx", "utf8");
const css = readFileSync("src/index.css", "utf8");
const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");
const demoParts = ["DemoSidebar", "DemoConversation", "DemoBrowserViewport"]
  .map((name) => readFileSync(`src/components/demo/${name}.tsx`, "utf8"))
  .join("\n");

test("demo sweeps its border before revealing content", () => {
  assert.match(component, /demo-entrance/);
  assert.match(component, /demo-chat-glint/);
  assert.match(component, /demo-entrance-content/);
  assert.match(css, /@keyframes demo-border-glint/);
  assert.match(css, /--demo-border-angle:\s*286deg/);
  assert.match(css, /@keyframes demo-content-reveal/);
  assert.doesNotMatch(css, /radial-gradient/);
  assert.doesNotMatch(component, /demo-border-glint/);
  assert.match(css, /conic-gradient/);
  assert.match(css, /mask-composite:\s*exclude/);
  assert.match(css, /transparent 350deg/);
  assert.doesNotMatch(css, /oklch\(0\.98 0\.01 295\)/);
  assert.match(css, /padding:\s*0\.5px/);
  assert.match(css, /oklch\(0\.6 0 0 \/ 45%\) 3deg/);
  assert.match(css, /oklch\(0\.48 0 0 \/ 25%\) 7deg/);
  assert.doesNotMatch(css, /offset-path/);
  assert.match(css, /animation:\s*demo-border-glint 1\.5s linear/);
  assert.doesNotMatch(css, /@keyframes demo-glint-right/);
  assert.doesNotMatch(css, /conic-gradient\(from var\(--demo-sweep-angle\)/);
  assert.match(component, /demo-reveal-title/);
  assert.match(demoParts, /demo-reveal-sidebar/);
  assert.match(demoParts, /demo-reveal-conversation/);
  assert.match(demoParts, /demo-reveal-viewport/);
  assert.match(css, /\.demo-reveal-title[^}]*animation:[^;]*0\.35s[^;]*1\.72s/s);
  assert.match(css, /\.demo-reveal-sidebar[^}]*animation:[^;]*0\.65s[^;]*1\.82s/s);
  assert.match(css, /\.demo-reveal-conversation[^}]*animation:[^;]*0\.5s[^;]*1\.94s/s);
  assert.match(css, /\.demo-reveal-viewport[^}]*animation:[^;]*0\.8s[^;]*2\.06s/s);
  assert.doesNotMatch(hero, /<BlurIn delay=\{0\.3\}/);
  assert.match(hero, /<BlurIn delay=\{2\.9\} className="flex flex-col/);
});
