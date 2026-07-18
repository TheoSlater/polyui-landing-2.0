import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("hero uses General Sans with a weighted Redaction 35 pixel accent", () => {
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");
  const css = readFileSync("src/index.css", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.ok(pkg.dependencies["@fontsource-variable/inter"]);
  assert.ok(pkg.dependencies["@fontsource/redaction-35"]);
  assert.equal(pkg.dependencies["@fontsource-variable/manrope"], undefined);
  assert.equal(pkg.dependencies["@fontsource-variable/newsreader"], undefined);
  assert.equal(pkg.dependencies["@fontsource/instrument-serif"], undefined);
  assert.match(css, /api\.fontshare\.com\/v2\/css\?f\[\]=general-sans@600/);
  assert.match(css, /@fontsource-variable\/inter/);
  assert.match(css, /@fontsource\/redaction-35\/700\.css/);
  assert.match(css, /--font-heading:\s*"General Sans"/);
  assert.match(css, /--font-accent:\s*"Redaction 35"/);
  assert.match(css, /--font-sans:\s*"Inter Variable"/);
  assert.match(hero, /font-accent/);
  assert.match(hero, /text-\[0\.82em\]/);
  assert.match(hero, /font-bold/);
  assert.match(hero, /-top-\[0\.05em\]/);
  assert.match(hero, /ml-\[0\.06em\]/);
  const accentClass = hero.match(/<em className="([^"]+)">every/)?.[1] ?? "";
  assert.doesNotMatch(accentClass, /text-shadow|drop-shadow|blur-/);
  assert.doesNotMatch(hero, /font-serif/);
  assert.match(hero, /leading-\[0\.92\]/);
  assert.match(hero, /tracking-\[-0\.055em\]/);
  assert.match(hero, /tracking-\[-0\.035em\]/);
  assert.match(hero, /<span className="block">One interface for<\/span>/);
  assert.match(hero, /<span className="block">/g);
});
