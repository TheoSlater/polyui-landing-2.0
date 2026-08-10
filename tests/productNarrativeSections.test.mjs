import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("product narrative consolidates the page into three clear sections", () => {
  const sections = readFileSync("src/components/ProductNarrativeSections.tsx", "utf8");
  const ids = ["features", "providers", "agents", "browser", "open-source", "downloads"];

  for (const id of ids) assert.match(sections, new RegExp(`id="${id}"`));
  for (let index = 1; index < ids.length; index += 1) {
    assert.ok(sections.indexOf(`id="${ids[index - 1]}"`) < sections.indexOf(`id="${ids[index]}"`));
  }

  assert.equal((sections.match(/<section/g) ?? []).length, 3);
  assert.match(sections, /pt-24/);
  assert.match(sections, /sm:pt-36/);
  assert.match(sections, /md:grid-cols-\[/);
  assert.match(sections, /Use the right local or cloud model/);
  assert.match(sections, /Delegate the work\. Stay in control\./);
  assert.match(sections, /source-linked evidence stay attached/);
  assert.match(sections, /https:\/\/github\.com\/monolabsdev\/poly-ui/);
  assert.match(sections, /target="_blank"\s+rel="noopener noreferrer"/);
  assert.doesNotMatch(sections, /\d{2}\s*·/);
  assert.doesNotMatch(sections, /md:grid-cols-3/);
  assert.doesNotMatch(sections, /AgentPanel|BrowserPanel/);
  assert.doesNotMatch(sections, /Sparkles|motion\.section/);
  assert.equal((sections.match(/<motion\.figure/g) ?? []).length, 1);
  assert.match(sections, /logo: "\/openai-blossom\.svg"/);
  assert.match(sections, /logo: "\/anthropic\.svg"/);
  assert.match(sections, /logo: "\/google-gemini\.svg"/);
  assert.match(sections, /logo: "\/ollama\.svg"/);
  assert.doesNotMatch(sections, /cdn\.simpleicons\.org/);
  for (const asset of ["anthropic.svg", "google-gemini.svg", "ollama.svg"]) {
    assert.ok(existsSync(`public/${asset}`));
  }
  assert.match(sections, /src="\/polyui-demo\.png"/);
  assert.match(sections, /alt="Poly UI desktop app with chat and browser panels"/);
  assert.match(sections, /import \{ DownloadRelease \}/);
  assert.match(sections, /<DownloadRelease \/>/);
  assert.doesNotMatch(sections, /Desktop downloads are coming soon|Download unavailable/);
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
