import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("hero uses Instrument Serif as its deliberate accent face", () => {
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");
  const css = readFileSync("src/index.css", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.ok(pkg.dependencies["@fontsource/instrument-serif"]);
  assert.match(css, /@fontsource\/instrument-serif\/400-italic\.css/);
  assert.match(css, /--font-heading:\s*"Geist Variable"/);
  assert.match(css, /--font-accent:\s*"Instrument Serif"/);
  assert.match(hero, /font-accent/);
  assert.doesNotMatch(hero, /font-serif/);
});
