import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("download rail fetches latest release and always keeps a GitHub fallback", () => {
  const component = readFileSync("src/components/DownloadRelease.tsx", "utf8");

  assert.match(
    component,
    /https:\/\/api\.github\.com\/repos\/monolabsdev\/poly-ui\/releases\/latest/,
  );
  assert.match(component, /https:\/\/github\.com\/monolabsdev\/poly-ui\/releases\/latest/);
  assert.match(component, /new AbortController\(\)/);
  assert.match(component, /Download for \{target\.label\}/);
  assert.match(component, /All installers/);
  assert.match(component, /View latest release/);
  assert.match(component, /Recommended for most people/);
  assert.match(component, /Advanced: install from your terminal/);
  assert.match(component, /View script source/);
  assert.match(component, /whitespace-pre-wrap break-all/);
  assert.doesNotMatch(component, /whitespace-nowrap/);
  assert.ok(
    component.indexOf("Recommended for most people") <
      component.indexOf("Advanced: install from your terminal"),
  );
  assert.match(component, /navigator\.clipboard\.writeText\(command\)/);
  assert.match(component, /clearTimeout\(copyResetTimer\.current\)/);
  assert.match(component, /Copy failed/);
  assert.match(component, /Ubuntu \/ Debian/);
  assert.match(component, /Other distro/);
  assert.match(component, /setLinuxPackage\("deb"\)/);
  assert.match(component, /setLinuxPackage\("appimage"\)/);
});
