import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("download CTAs always scroll smoothly to the unobscured section", () => {
  const hero = readFileSync("src/components/HeroWireframe.tsx", "utf8");
  const header = readFileSync("src/components/SiteHeader.tsx", "utf8");
  const sections = readFileSync(
    "src/components/ProductNarrativeSections.tsx",
    "utf8",
  );
  const css = readFileSync("src/index.css", "utf8");

  assert.match(hero, /render={<a href="#downloads" \/>}/);
  assert.match(header, /render={<a href="#downloads" \/>}/);
  assert.match(sections, /id="downloads"[\s\S]*?scroll-mt-20/);
  assert.match(css, /html\s*{[\s\S]*?scroll-behavior:\s*smooth;/);
});
