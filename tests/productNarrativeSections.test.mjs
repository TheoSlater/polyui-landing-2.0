import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("product narrative renders approved sections in order", () => {
  const sections = readFileSync("src/components/ProductNarrativeSections.tsx", "utf8");
  const ids = ["providers", "features", "agents", "browser", "open-source", "downloads"];

  for (const id of ids) assert.match(sections, new RegExp(`id="${id}"`));
  for (let index = 1; index < ids.length; index += 1) {
    assert.ok(sections.indexOf(`id="${ids[index - 1]}"`) < sections.indexOf(`id="${ids[index]}"`));
  }

  assert.match(sections, /pt-30/);
  assert.match(sections, /sm:pt-48/);
  assert.match(sections, /md:grid-cols-2/);
  assert.match(sections, /Use the right model for the moment\./);
  assert.match(sections, /Delegate the work\. Stay in control\./);
  assert.match(sections, /The web, inside the workspace\./);
  assert.match(sections, /https:\/\/github\.com\/monolabsdev\/poly-ui/);
  assert.match(sections, /target="_blank"\s+rel="noopener noreferrer"/);
});
