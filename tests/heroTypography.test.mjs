import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("hero uses Inter with Redaction 35 in a fixed two-line composition", () => {
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");
  const css = readFileSync("src/index.css", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.ok(pkg.dependencies["@fontsource-variable/inter"]);
  assert.ok(pkg.dependencies["@fontsource/redaction-35"]);
  assert.equal(pkg.dependencies["@fontsource-variable/manrope"], undefined);
  assert.equal(pkg.dependencies["@fontsource-variable/newsreader"], undefined);
  assert.equal(pkg.dependencies["@fontsource/instrument-serif"], undefined);
  assert.doesNotMatch(css, /api\.fontshare\.com/);
  assert.match(css, /@fontsource-variable\/inter/);
  assert.match(css, /@fontsource\/redaction-35/);
  assert.match(css, /--font-heading:\s*"Inter Variable"/);
  assert.match(css, /--font-accent:\s*"Redaction 35"/);
  assert.match(css, /--font-sans:\s*"Inter Variable"/);
  assert.match(hero, /font-accent/);
  assert.doesNotMatch(hero, /font-normal italic/);
  assert.doesNotMatch(hero, /font-serif/);
  assert.match(hero, /leading-\[0\.92\]/);
  assert.match(hero, /tracking-\[-0\.055em\]/);
  assert.match(hero, /tracking-\[-0\.035em\]/);
  assert.match(hero, /text-\[0\.9em\]/);
  assert.match(hero, /<span className="block">One interface for<\/span>/);
  assert.match(hero, /<span className="block">/g);
});
