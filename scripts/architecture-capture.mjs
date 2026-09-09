import fs from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = "E:/Aclaw文件/VALDORA官网";
const b = await chromium.launch({
  headless: true,
  args: ["--use-angle=d3d11", "--ignore-gpu-blocklist"],
});
const p = await b.newPage({ viewport: { width: 1600, height: 1200 } });
await p.goto(pathToFileURL("E:/Aclaw文件/欧洲体素箱庭小镇/index.html").href);
await p.waitForFunction(() => window.__VOXEL_TOWN_READY__, null, {
  timeout: 300000,
});
await p.evaluate(() => {
  let t = window.__VOXEL_TOWN_TEST__;
  if (t.getState().autoRotate) t.toggleAutoRotate();
  t.setLightMode("noon");
});
await p.addStyleTag({
  content:
    "#app > :not(canvas){visibility:hidden!important} canvas{visibility:visible} #minimap-canvas{visibility:hidden!important}",
});
const houses = await p.evaluate(() =>
  window.__VOXEL_TOWN_TEST__.getPlanningBuildings(),
);
for (const name of [
  "fachwerk",
  "steppedGable",
  "burgageRowhouse",
  "timberWarehouse",
  "alpineChalet",
  "arcadeMerchant",
  "courtyardWorkshop",
  "towerHouse",
]) {
  const candidates = houses.filter((x) => x.prototype === name);
  const best = candidates.sort((a, b) => score(b) - score(a))[0];
  function score(a) {
    return Math.min(
      ...houses
        .filter((x) => x.id !== a.id)
        .map((x) => Math.hypot(x.x - a.x, x.z - a.z)),
    );
  }
  if (!best) continue;
  const pos = [best.x + 50, best.base + 40, best.z + 60],
    target = [best.x, best.base + 8, best.z];
  await p.evaluate(
    ([pos, target]) => window.__VOXEL_TOWN_TEST__.setCamera(pos, target),
    [pos, target],
  );
  await p.waitForTimeout(500);
  await p.screenshot({ path: root + "/evidence/house-" + name + ".png" });
  console.log(name, best.id);
}
await b.close();
