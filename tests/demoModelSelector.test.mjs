import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("demo selector lists requested GPT 5.6 models in order", () => {
  const selector = readFileSync(
    "src/components/demo/DemoModelSelector.tsx",
    "utf8",
  );
  const models = ["GPT 5.6-Sol", "GPT 5.6 Terra", "GPT 5.6 Luna"];

  for (const model of models) assert.match(selector, new RegExp(model));
  for (let index = 1; index < models.length; index += 1) {
    assert.ok(selector.indexOf(models[index - 1]) < selector.indexOf(models[index]));
  }
  assert.match(selector, /useState\(MODELS\[0\]\.name\)/);
});
