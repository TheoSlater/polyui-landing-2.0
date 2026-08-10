import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("table of contents keeps the docs route while linking within a page", () => {
  const docsPage = readFileSync("src/components/DocsPage.tsx", "utf8");
  const route = readFileSync("src/lib/docsRoute.ts", "utf8");

  assert.match(route, /\.split\("#"\)\[0\]/);
  assert.match(docsPage, /docsRoute\(page\.slug\) \+ "#docs-content"/);
  assert.match(docsPage, /docsRoute\(page\.slug\) \+ "#" \+ heading\.id/);
});
