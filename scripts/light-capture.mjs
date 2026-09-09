import fs from "node:fs";
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
const root = new URL("../", import.meta.url);
const browser = await chromium.launch({
  headless: true,
  args: ["--use-angle=d3d11", "--ignore-gpu-blocklist"],
});
const p = await browser.newPage({ viewport: { width: 1920, height: 1200 } });
await p.goto(
  new URL("../../欧洲体素箱庭小镇/index.html", import.meta.url).href,
);
await p.waitForFunction(() => window.__VOXEL_TOWN_READY__, null, {
  timeout: 300000,
});
await p.evaluate(() => {
  let t = window.__VOXEL_TOWN_TEST__;
  if (t.getState().autoRotate) t.toggleAutoRotate();
  t.setCamera([440, 310, 620], [0, 60, 0]);
});
await p.addStyleTag({
  content:
    "#app > :not(canvas){visibility:hidden!important} canvas{visibility:visible} #minimap-canvas{visibility:hidden!important}",
});
const result = [];
for (const [name, mode, hour] of [
  ["morning", null, 5.5],
  ["noon", "noon", 12],
  ["golden", "golden", 17.5],
  ["dusk", null, 18.5],
  ["night", "night", 0],
]) {
  await p.evaluate(
    ([mode, h]) => {
      let t = window.__VOXEL_TOWN_TEST__;
      if (mode) t.setLightMode(mode);
      else t.setDayNightTime(h);
    },
    [mode, hour],
  );
  await p.waitForTimeout(850);
  await p.screenshot({
    path: fileURLToPath(new URL("evidence/time-" + name + ".png", root)),
  });
  result.push({
    name,
    mode,
    hour,
    state: await p.evaluate(() => {
      const s = window.__VOXEL_TOWN_TEST__.getState();
      return {
        camera: s.camera,
        target: s.target,
        lightMode: s.lightMode,
        time: s.dayNightTime,
      };
    }),
  });
}
fs.writeFileSync(
  new URL("evidence/light-capture.json", root),
  JSON.stringify(result, null, 2),
);
await browser.close();
console.log("Fixed presets + dawn/dusk frames captured");
