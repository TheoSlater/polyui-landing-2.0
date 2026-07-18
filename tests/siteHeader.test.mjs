import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("header GitHub CTA is an accessible new-tab icon button", () => {
  const header = readFileSync("src/components/SiteHeader.tsx", "utf8");

  assert.match(
    header,
    /<Button variant="outline" size="icon-sm" render={<a href="https:\/\/github\.com\/monolabsdev\/poly-ui" target="_blank" rel="noopener noreferrer" aria-label="GitHub" \/>} nativeButton={false}>/
  );
  assert.match(header, /<GithubIcon size=\{14\} \/>/);
  assert.doesNotMatch(header, /<span className="max-sm:hidden">GitHub<\/span>/);
});
