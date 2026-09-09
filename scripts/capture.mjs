import fs from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = "E:/Aclaw文件/VALDORA官网";
const browser = await chromium.launch({
  headless: true,
  args: ["--use-angle=d3d11", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({
  viewport: { width: 1920, height: 1200 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(pathToFileURL("E:/Aclaw文件/欧洲体素箱庭小镇/index.html").href);
await page.waitForFunction(() => window.__VOXEL_TOWN_READY__, null, {
  timeout: 300000,
});
await page.evaluate(() => {
  let t = window.__VOXEL_TOWN_TEST__;
  if (t.getState().autoRotate) t.toggleAutoRotate();
  t.setLightMode("golden");
});
const data = await page.evaluate(() => ({
  state: window.__VOXEL_TOWN_TEST__.getState(),
  buildings: window.__VOXEL_TOWN_TEST__.getPlanningBuildings(),
  architecture: window.__VOXEL_TOWN_TEST__.getArchitecture(),
}));
fs.writeFileSync(
  root + "/evidence/world-runtime.json",
  JSON.stringify({ errors, ...data }, null, 2),
);
console.log(
  "WORLD READY",
  JSON.stringify({
    houses: data.state.stats.featureCounts.houses,
    voxels: data.state.stats.staticVoxelCount,
    errors,
  }),
);
await page.addStyleTag({
  content:
    "#app > :not(canvas){visibility:hidden!important} canvas{visibility:visible} #minimap-canvas{visibility:hidden!important}",
});
const views = [
  ["hero", [440, 310, 620], [0, 60, 0]],
  ["overview", [950, 850, 1050], [0, 35, 0]],
  ["harbor", [220, 135, 370], [30, 22, 175]],
  ["cathedral", [205, 168, 100], [42, 107, -40]],
  ["citadel", [-235, 238, -270], [-20, 130, -115]],
  ["market", [-155, 123, 175], [-24, 56, 32]],
  ["waterworks", [280, 190, -30], [135, 81, -95]],
  ["lighthouse", [255, 112, 316], [155, 48, 214]],
  ["farmland", [-365, 175, 315], [-194, 40, 116]],
  ["guildhall", [-175, 115, 100], [-85, 68, 30]],
  ["gate", [-200, 115, 240], [-75, 48, 140]],
  ["library", [305, 147, 100], [410, 92, 30]],
  ["mine", [150, 175, -280], [0, 105, -430]],
  ["salt", [105, 92, 300], [0, 34, 370]],
  ["topdown", [0, 1100, 1], [0, 0, 0]],
];
for (const [name, p, t] of views) {
  await page.evaluate(
    ([p, t]) => window.__VOXEL_TOWN_TEST__.setCamera(p, t),
    [p, t],
  );
  await page.waitForTimeout(650);
  await page.screenshot({ path: root + "/evidence/" + name + ".png" });
  console.log("CAPTURE", name);
}
await browser.close();
