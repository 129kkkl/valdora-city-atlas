import fs from "node:fs";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
const root = new URL("../", import.meta.url);
const path = (p) => new URL(p, root);
for (const file of fs
  .readdirSync(path("evidence/"))
  .filter((f) => f.endsWith(".png") && !f.startsWith("qa-"))) {
  const name = file.replace(".png", "");
  await sharp(fileURLToPath(path("evidence/" + file)))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(fileURLToPath(path("public/images/" + name + ".webp")));
  await sharp(fileURLToPath(path("evidence/" + file)))
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(fileURLToPath(path("public/images/" + name + "-800.webp")));
}
const d = JSON.parse(fs.readFileSync(path("evidence/world-runtime.json")));
const code = fs.readFileSync(
  new URL("../欧洲体素箱庭小镇/index.html", root),
  "utf8",
);
const start = code.indexOf("const ZONE_DEFINITIONS=[");
const end = code.indexOf("const ZONE_BY_ID", start);
const zones = new Function(
  code.slice(start, end) + "return ZONE_DEFINITIONS",
)();
fs.mkdirSync(path("src/data/"), { recursive: true });
fs.writeFileSync(
  path("src/data/plan.json"),
  JSON.stringify({
    buildings: d.buildings.map((b) => ({
      id: b.id,
      prototype: b.prototype,
      x0: b.x0,
      x1: b.x1,
      z0: b.z0,
      z1: b.z1,
      zone: b.zone,
    })),
    zones,
  }),
);
fs.writeFileSync(
  path("src/data/facts.json"),
  JSON.stringify({
    houses: d.state.stats.featureCounts.houses,
    voxels: d.state.stats.staticVoxelCount,
    prototypes: 36,
    drawCalls: d.state.drawCalls,
    batches: d.state.stats.instanceBatches,
    seed: "5a17d04a",
    citizens: d.state.citizensCount,
    boats: d.state.boatsCount,
  }),
);
console.log("Assets and source-derived plan ready");
