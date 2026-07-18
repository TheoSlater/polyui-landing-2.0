import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("footer contains only useful navigation and decorative wordmark", () => {
  const footer = readFileSync("src/components/SiteFooter.tsx", "utf8");
  const app = readFileSync("src/App.tsx", "utf8");

  for (const href of ["#providers", "#agents", "#browser"]) {
    assert.match(footer, new RegExp(`"${href}"`));
  }
  assert.match(footer, /https:\/\/github\.com\/monolabsdev\/poly-ui/);
  assert.match(footer, /target="_blank"\s+rel="noopener noreferrer"/);
  assert.match(footer, /aria-hidden="true"/);
  assert.match(footer, />Poly UI<\/div>/);
  assert.doesNotMatch(footer, /Careers|Legal|Privacy|Terms|LinkedIn|Discord/);
  assert.doesNotMatch(footer, /—|–/);
  assert.match(app, /<SiteFooter \/>/);
});
