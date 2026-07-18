import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("hero uses only General Sans while website UI uses Manrope", () => {
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");
  const css = readFileSync("src/index.css", "utf8");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));

  assert.ok(pkg.dependencies["@fontsource-variable/manrope"]);
  assert.equal(pkg.dependencies["@fontsource-variable/inter"], undefined);
  assert.equal(pkg.dependencies["@fontsource-variable/space-grotesk"], undefined);
  assert.equal(pkg.dependencies["@fontsource-variable/newsreader"], undefined);
  assert.equal(pkg.dependencies["@fontsource/instrument-serif"], undefined);
  assert.match(css, /api\.fontshare\.com\/v2\/css\?f\[\]=general-sans@600/);
  assert.match(css, /@fontsource-variable\/manrope/);
  assert.doesNotMatch(css, /Departure Mono|space-grotesk/);
  assert.match(css, /--font-heading:\s*"General Sans"/);
  assert.match(css, /--font-sans:\s*"Manrope Variable"/);
  assert.match(css, /font-family:\s*"Manrope Variable"/);
  assert.match(hero, /font-heading/);
  assert.match(hero, /font-semibold/);
  assert.match(hero, /leading-\[0\.92\]/);
  assert.match(hero, /tracking-\[-0\.055em\]/);
  assert.match(hero, /<span className="block">One interface for<\/span>/);
  assert.match(hero, /<span className="block">every AI model\.<\/span>/);
  assert.equal((hero.match(/<span className="block">/g) ?? []).length, 2);
  assert.doesNotMatch(hero, /<em|font-accent|italic|font-serif|text-shadow|drop-shadow|bg-clip-text/);
});
