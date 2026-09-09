import fs from "node:fs";
import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.addInitScript(() => {
  window.__metrics = { cls: 0, lcp: 0, longTasks: [] };
  new PerformanceObserver((l) =>
    l.getEntries().forEach((e) => {
      if (!e.hadRecentInput) window.__metrics.cls += e.value;
    }),
  ).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver((l) =>
    l.getEntries().forEach((e) => (window.__metrics.lcp = e.startTime)),
  ).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) =>
    l.getEntries().forEach((e) => window.__metrics.longTasks.push(e.duration)),
  ).observe({ type: "longtask", buffered: true });
});
await page.goto("http://127.0.0.1:5188");
await page.waitForLoadState("networkidle");
const initial = await page.evaluate(() => ({
  metrics: window.__metrics,
  resources: performance
    .getEntriesByType("resource")
    .map((r) => ({ name: r.name, bytes: r.transferSize })),
  hero: document.querySelector(".hero-enter").getBoundingClientRect().toJSON(),
}));
await page
  .locator("#journey")
  .evaluate((el) => scrollTo({ top: el.offsetTop, behavior: "instant" }));
await page.waitForTimeout(1200);
await page.locator(".journey-route button").last().click();
await page.waitForTimeout(1600);
const journey = await page.locator(".journey-current h3").textContent();
const frames = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const frames = [];
      let prev = performance.now(),
        start = prev;
      let y = scrollY;
      function tick(t) {
        frames.push(t - prev);
        prev = t;
        scrollTo({ top: y + (t - start) * 0.22, behavior: "instant" });
        if (t - start < 4000) requestAnimationFrame(tick);
        else resolve(frames.slice(1));
      }
      requestAnimationFrame(tick);
    }),
);
const sorted = frames.sort((a, b) => a - b);
await page.emulateMedia({ reducedMotion: "reduce" });
await page.waitForTimeout(100);
await page.locator(".journey-route button").nth(2).click();
const reduced = await page.evaluate(() => ({
  className: document.querySelector(".journey").className,
  height: document.querySelector(".journey").getBoundingClientRect().height,
  active: document.querySelector(".journey-current h3").textContent,
  transition: getComputedStyle(document.querySelector(".journey-images>div"))
    .transitionDuration,
}));
const out = {
  errors,
  initial,
  journey,
  reduced,
  scrollFrames: {
    sampleCount: frames.length,
    p50: sorted[Math.floor(sorted.length * 0.5)],
    p95: sorted[Math.floor(sorted.length * 0.95)],
    max: Math.max(...frames),
  },
  environment:
    "Local Chromium headless, 1440x900, no network/CPU throttling. Not a cross-device FPS guarantee.",
};
fs.writeFileSync(
  new URL("../evidence/performance-qa.json", import.meta.url),
  JSON.stringify(out, null, 2),
);
console.log(
  JSON.stringify(
    {
      ...out,
      initial: {
        ...initial,
        resources: undefined,
        transferBytes: initial.resources.reduce((s, r) => s + r.bytes, 0),
      },
    },
    null,
    2,
  ),
);
await browser.close();
