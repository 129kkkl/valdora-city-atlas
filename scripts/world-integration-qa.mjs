import fs from "node:fs";
import crypto from "node:crypto";
import { chromium } from "playwright";
const root = new URL("../", import.meta.url);
const base = "http://127.0.0.1:5188";
const browser = await chromium.launch({
  headless: true,
  args: ["--use-angle=d3d11", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  acceptDownloads: true,
});
const errors = [];
const external = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("request", (r) => {
  if (/^https?:/.test(r.url()) && !r.url().startsWith(base))
    external.push(r.url());
});
await page.goto(base);
await page
  .locator(".landmark-feature")
  .first()
  .getByRole("link", { name: "前往此处" })
  .click();
await page.waitForFunction(() => window.__VOXEL_TOWN_READY__, null, {
  timeout: 300000,
});
const state = await page.evaluate(() => window.__VOXEL_TOWN_TEST__.getState());
const report = {
  entryURL: page.url(),
  errors,
  external,
  ready: state.ready,
  requestedCamera: [205, 168, 100],
  camera: state.camera,
  target: state.target,
  houses: state.stats.featureCounts.houses,
  voxels: state.stats.staticVoxelCount,
  acceptance: state.stats.acceptanceAudit.status,
  checks: {},
};
await page.locator('[data-light="night"]').click();
report.checks.night = await page.evaluate(
  () => window.__VOXEL_TOWN_TEST__.getState().lightMode,
);
await page.locator("#toggle-time").click();
report.checks.timeFlow = await page.evaluate(
  () => window.__VOXEL_TOWN_TEST__.getState().dayNightFlow,
);
await page.locator("#toggle-time").click();
await page.locator("#toggle-audio").click();
report.checks.audio = await page.evaluate(() =>
  window.__VOXEL_TOWN_TEST__.getAudioState(),
);
await page.locator("#toggle-audio").click();
await page.locator("#toggle-walk").click();
report.checks.walk = await page.evaluate(() =>
  window.__VOXEL_TOWN_TEST__.getWalkState(),
);
await page.keyboard.press("Escape");
if (await page.evaluate(() => window.__VOXEL_TOWN_TEST__.getWalkState()))
  await page.locator("#toggle-walk").click();
report.checks.edit = await page.evaluate(() => {
  const e = window.__VOXEL_TOWN_TEST__.edits;
  const before = e.getVoxel(500, 300, 500);
  const painted = e.paint(500, 300, 500, "limestone");
  const after = e.getVoxel(500, 300, 500);
  e.undo();
  return {
    before,
    painted,
    after,
    undone: e.getVoxel(500, 300, 500) === before,
  };
});
report.checks.shareURL = await page.evaluate(() =>
  window.__VOXEL_TOWN_TEST__.share.url(),
);
const download = page.waitForEvent("download");
await page.locator("#btn-photo").click();
const photo = await download;
report.checks.photo = photo.suggestedFilename();
await photo.saveAs(
  new URL("../evidence/qa-world-photo.png", import.meta.url).pathname
    .replace(/^\//, "")
    .split("/")
    .map(decodeURIComponent)
    .join("/"),
);
report.checks.collection = await page.locator("#explore-count").textContent();
await page.screenshot({
  path: new URL(
    "../evidence/qa-world-integration.png",
    import.meta.url,
  ).pathname
    .replace(/^\//, "")
    .split("/")
    .map(decodeURIComponent)
    .join("/"),
});
const hash = (p) =>
  crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
report.integrity = {
  original: hash(new URL("../欧洲体素箱庭小镇/index.html", root)),
  publicCopy: hash(new URL("public/world/index.html", root)),
  productionCopy: hash(new URL("dist/world/index.html", root)),
};
report.integrity.identical =
  new Set([
    report.integrity.original,
    report.integrity.publicCopy,
    report.integrity.productionCopy,
  ]).size === 1;
fs.writeFileSync(
  new URL("evidence/world-integration-qa.json", root),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
await browser.close();
