import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("header GitHub CTA is an accessible new-tab icon button", () => {
  const header = readFileSync("src/components/SiteHeader.tsx", "utf8");

  assert.match(
    header,
    /<Button className="size-11 md:size-7" variant="outline" size="icon-sm" render={<a href="https:\/\/github\.com\/monolabsdev\/poly-ui" target="_blank" rel="noopener noreferrer" aria-label="GitHub" \/>} nativeButton={false}>/
  );
  assert.match(header, /<GithubIcon size=\{14\} \/>/);
  assert.doesNotMatch(header, /<span className="max-sm:hidden">GitHub<\/span>/);
  assert.match(header, /className="flex min-h-11[^"]*md:hidden"/);
  assert.match(header, /className="h-11 md:h-7" size="sm"/);
});
