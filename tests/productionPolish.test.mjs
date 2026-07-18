import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("page has working navigation and a keyboard skip target", () => {
  const app = readFileSync("src/App.tsx", "utf8");
  const header = readFileSync("src/components/SiteHeader.tsx", "utf8");

  assert.match(app, /href="#main-content"/);
  assert.match(app, /<main id="main-content"/);
  assert.doesNotMatch(header, /href="#"/);
  assert.match(header, /href: "#features"/);
  assert.match(header, /href: "#providers"/);
  assert.match(header, /poly-ui#readme/);
});

test("site overrides reduced-motion preference for branded motion", () => {
  const main = readFileSync("src/main.tsx", "utf8");
  const css = readFileSync("src/index.css", "utf8");
  const glow = readFileSync("src/components/ui/glow-effect.tsx", "utf8");

  assert.match(main, /<MotionConfig reducedMotion="never">/);
  assert.doesNotMatch(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(glow, /useReducedMotion/);
  assert.match(glow, /animate=\{animations\[mode\]\}/);
});

test("metadata and crawler policy use real local assets", () => {
  const html = readFileSync("index.html", "utf8");

  assert.match(html, /rel="apple-touch-icon" href="\/polyui-icon\.png"/);
  assert.match(html, /name="theme-color"/);
  assert.match(
    html,
    /property="og:image" content="https:\/\/raw\.githubusercontent\.com\/TheoSlater\/polyui-landing-2\.0\/main\/public\/polyui-demo\.png"/,
  );
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.ok(existsSync("public/robots.txt"));
  assert.equal(readFileSync("public/robots.txt", "utf8"), "User-agent: *\nAllow: /\n");
});

test("below-fold images reserve space and load lazily", () => {
  const narrative = readFileSync("src/components/ProductNarrativeSections.tsx", "utf8");
  const footer = readFileSync("src/components/SiteFooter.tsx", "utf8");

  assert.match(narrative, /width=\{24\}[\s\S]*height=\{24\}[\s\S]*loading="lazy"/);
  assert.match(narrative, /width=\{1733\}[\s\S]*height=\{1122\}[\s\S]*loading="lazy"/);
  assert.match(footer, /width=\{28\}[\s\S]*height=\{28\}[\s\S]*loading="lazy"/);
});
