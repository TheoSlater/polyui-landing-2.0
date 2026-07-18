import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("hero uses Manrope with Newsreader as its deliberate font pair", () => {
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");
  const css = readFileSync("src/index.css", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.ok(pkg.dependencies["@fontsource-variable/manrope"]);
  assert.ok(pkg.dependencies["@fontsource-variable/newsreader"]);
  assert.equal(pkg.dependencies["@fontsource/instrument-serif"], undefined);
  assert.match(css, /@fontsource-variable\/manrope/);
  assert.match(css, /@fontsource-variable\/newsreader\/wght-italic\.css/);
  assert.match(css, /--font-heading:\s*"Manrope Variable"/);
  assert.match(css, /--font-accent:\s*"Newsreader Variable"/);
  assert.match(hero, /font-accent/);
  assert.doesNotMatch(hero, /font-serif/);
});
