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
  assert.match(css, /api\.fontshare\.com\/v2\/css\?f\[\]=general-sans@500/);
  assert.match(css, /@fontsource-variable\/manrope/);
  assert.doesNotMatch(css, /Departure Mono|space-grotesk/);
  assert.match(css, /--font-heading:\s*"General Sans"/);
  assert.match(css, /--font-sans:\s*"Manrope Variable"/);
  assert.match(css, /font-family:\s*"Manrope Variable"/);
  assert.match(hero, /font-heading/);
  assert.match(hero, /font-medium/);
  assert.match(hero, /leading-\[0\.92\]/);
  assert.match(hero, /tracking-\[-0\.055em\]/);
  assert.match(hero, /<span className="block">One interface for<\/span>/);
  assert.match(hero, /<span className="block"><em className="italic">every<\/em> AI model\.<\/span>/);
  assert.equal((hero.match(/<span className="block">/g) ?? []).length, 2);
  assert.doesNotMatch(hero, /font-accent|font-serif|text-shadow|drop-shadow|bg-clip-text/);
});

test("GitHub CTA opens Poly UI repository in a new tab", () => {
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");

  assert.match(
    hero,
    /<Button variant="outline" size="lg" render={<a href="https:\/\/github\.com\/monolabsdev\/poly-ui" target="_blank" rel="noopener noreferrer" \/>} nativeButton={false}>/
  );
});

test("hero fills the first viewport and centers its content", () => {
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");

  assert.match(hero, /min-h-\[calc\(100svh-3\.25rem\)\]/);
  assert.match(hero, /relative flex[^"]*items-center/);
  assert.match(hero, /mx-auto w-full[^"]*py-16[^"]*sm:py-24/);
  assert.doesNotMatch(hero, /delay=\{3\.55\}/);
});

test("one subtle glow belongs only to the hero demo", () => {
  const app = readFileSync("src/App.tsx", "utf8");
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");
  const footer = readFileSync("src/components/SiteFooter.tsx", "utf8");

  assert.doesNotMatch(app, /GlowEffect|PAGE_GLOW_COLORS/);
  assert.match(app, /min-h-dvh overflow-x-clip/);
  assert.match(hero, /<GlowEffect/);
  assert.match(hero, /scale=\{1\.18\}/);
  assert.match(hero, /rounded-3xl opacity-50 blur-\[70px\]/);
  assert.doesNotMatch(hero, /overflow-hidden/);
  assert.doesNotMatch(footer, /bg-background/);
});
