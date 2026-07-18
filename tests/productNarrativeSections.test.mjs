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
  assert.match(sections, /md:grid-cols-\[/);
  assert.match(sections, /Use the right model for the moment\./);
  assert.match(sections, /Delegate the work\. Stay in control\./);
  assert.match(sections, /The web, inside the workspace\./);
  assert.match(sections, /https:\/\/github\.com\/monolabsdev\/poly-ui/);
  assert.match(sections, /target="_blank"\s+rel="noopener noreferrer"/);
  assert.doesNotMatch(sections, /\d{2}\s*·/);
  assert.doesNotMatch(sections, /md:grid-cols-3/);
  assert.doesNotMatch(sections, /AgentPanel|BrowserPanel/);
  assert.match(sections, /logo: "\/openai-blossom\.svg"/);
  assert.doesNotMatch(sections, /cdn\.simpleicons\.org\/openai/);
  assert.match(sections, /cdn\.simpleicons\.org\/anthropic/);
  assert.match(sections, /cdn\.simpleicons\.org\/googlegemini/);
  assert.match(sections, /cdn\.simpleicons\.org\/ollama/);
  assert.match(sections, /src="\/polyui-demo\.png"/);
  assert.match(sections, /alt="Poly UI desktop app with chat and browser panels"/);
  assert.doesNotMatch(sections, /id="browser"[\s\S]*?ml-auto/);
});

test("app renders the product narrative instead of temporary sections", () => {
  const app = readFileSync("src/App.tsx", "utf8");

  assert.match(
    app,
    /import \{ ProductNarrativeSections \} from "@\/components\/ProductNarrativeSections"/,
  );
  assert.match(app, /<ProductNarrativeSections \/>/);
  assert.doesNotMatch(app, /SectionPlaceholder|PLACEHOLDER_SECTIONS/);
});
