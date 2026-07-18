import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("hero uses General Sans with Newsreader in a fixed two-line composition", () => {
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");
  const css = readFileSync("src/index.css", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.ok(pkg.dependencies["@fontsource-variable/newsreader"]);
  assert.equal(pkg.dependencies["@fontsource-variable/manrope"], undefined);
  assert.equal(pkg.dependencies["@fontsource/instrument-serif"], undefined);
  assert.match(css, /api\.fontshare\.com\/v2\/css\?f\[\]=general-sans@600/);
  assert.match(css, /@fontsource-variable\/newsreader\/wght-italic\.css/);
  assert.match(css, /--font-heading:\s*"General Sans"/);
  assert.match(css, /--font-accent:\s*"Newsreader Variable"/);
  assert.match(hero, /font-accent/);
  assert.doesNotMatch(hero, /font-serif/);
  assert.match(hero, /leading-\[0\.92\]/);
  assert.match(hero, /tracking-\[-0\.055em\]/);
  assert.match(hero, /tracking-\[-0\.035em\]/);
  assert.match(hero, /text-\[0\.9em\]/);
  assert.match(hero, /<span className="block">One interface for<\/span>/);
  assert.match(hero, /<span className="block">/g);
});
