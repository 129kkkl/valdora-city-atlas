import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = "E:/Aclaw文件/VALDORA官网/evidence";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await page.goto("http://127.0.0.1:5188/");
await page.waitForSelector(".hero");
await page.waitForLoadState("networkidle");
await page.screenshot({ path: root + "/qa-desktop-hero.png" });
for (const id of [
  "world",
  "planning",
  "architecture",
  "landmarks",
  "journey",
  "exploration",
  "daynight",
  "collection",
  "technology",
  "gallery",
  "about",
  "enter",
]) {
  await page.locator("#" + id).scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: root + "/qa-desktop-" + id + ".png" });
}
const report = { errors, sizes: [], interactions: {} };
for (const [w, h] of [
  [1920, 1080],
  [1440, 900],
  [1366, 768],
  [1024, 900],
  [430, 932],
  [390, 844],
  [375, 812],
]) {
  await page.setViewportSize({ width: w, height: h });
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(200);
  report.sizes.push(
    await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      overflow: [...document.querySelectorAll("body *")]
        .filter(
          (e) =>
            e instanceof HTMLElement &&
            e.getBoundingClientRect().right > innerWidth + 1 &&
            getComputedStyle(e).position !== "fixed",
        )
        .slice(0, 15)
        .map((e) => e.className),
    })),
  );
  if (w === 390) await page.screenshot({ path: root + "/qa-mobile-hero.png" });
}
await page.setViewportSize({ width: 1440, height: 900 });
await page.getByRole("button", { name: "下一种建筑" }).click();
report.interactions.architecture = await page
  .locator(".architecture-copy h3")
  .textContent();
await page.locator(".district-tabs button").nth(2).click();
report.interactions.planning = await page
  .locator(".district-detail h3")
  .textContent();
await page.getByRole("button", { name: "展开全域" }).click();
report.interactions.map = await page
  .locator(".master-plan")
  .getAttribute("viewBox");
await page.locator(".explore-tabs button").nth(2).click();
report.interactions.exploration = await page
  .locator(".explore-overlay h3")
  .textContent();
await page.locator(".time-controls button").nth(4).click();
await page.waitForTimeout(1200);
report.interactions.night = await page
  .locator(".time-caption h3")
  .textContent();
await page
  .locator(".gallery-filters button")
  .filter({ hasText: "夜晚" })
  .click();
report.interactions.filter = await page.locator(".gallery-item").count();
await page.locator(".gallery-item button").first().click();
await page.waitForSelector("dialog[open]");
report.interactions.lightbox = true;
await page.keyboard.press("ArrowRight");
report.interactions.lightboxNext = await page
  .locator(".lightbox-bottom p")
  .textContent();
await page.keyboard.press("Escape");
report.interactions.lightboxClosed =
  (await page.locator("dialog[open]").count()) === 0;
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => scrollTo(0, 0));
await page.getByRole("button", { name: "目录 +" }).click();
report.interactions.mobileMenu = await page.locator("#main-nav").isVisible();
await page.locator("#main-nav a").first().click();
report.interactions.menuClosed =
  (await page
    .getByRole("button", { name: "目录 +" })
    .getAttribute("aria-expanded")) === "false";
for (const id of [
  "planning",
  "architecture",
  "landmarks",
  "exploration",
  "daynight",
  "technology",
  "gallery",
  "about",
]) {
  await page.locator("#" + id).scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await page.screenshot({ path: root + "/qa-mobile-" + id + ".png" });
}
await page.emulateMedia({ reducedMotion: "reduce" });
await page.waitForTimeout(150);
report.interactions.reduced = await page
  .locator(".journey")
  .getAttribute("class");
await page.evaluate(async () => {
  await Promise.all(
    [...document.images].map((img) => {
      img.loading = "eager";
      return img.decode().catch(() => {});
    }),
  );
});
report.brokenImages = await page.evaluate(() =>
  [...document.images]
    .filter((i) => !i.complete || i.naturalWidth === 0)
    .map((i) => i.src),
);
report.deadAnchors = await page.evaluate(() =>
  [...document.querySelectorAll('a[href^="#"]')]
    .filter((a) => !document.getElementById(a.getAttribute("href").slice(1)))
    .map((a) => a.getAttribute("href")),
);
fs.writeFileSync(root + "/site-qa.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
if (
  report.errors.length ||
  report.brokenImages.length ||
  report.deadAnchors.length ||
  report.sizes.some((s) => s.scrollWidth > s.width)
)
  throw new Error("Site QA failed; inspect evidence/site-qa.json");
