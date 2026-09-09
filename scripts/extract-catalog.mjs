import fs from "node:fs";
const src = fs.readFileSync(
  new URL("../../欧洲体素箱庭小镇/index.html", import.meta.url),
  "utf8",
);
const start = src.indexOf("const PROTOTYPE_LORE = {");
const end = src.indexOf("\n    };", start) + 7;
const lore = new Function(src.slice(start, end) + ";return PROTOTYPE_LORE")();
const runtime = JSON.parse(
  fs.readFileSync(new URL("../evidence/world-runtime.json", import.meta.url)),
);
const counts = runtime.state.stats.featureCounts.buildingTypes;
const data = Object.entries(lore).map(([id, x]) => ({
  id,
  name: id === "cliffStilt" ? "临崖石裙住宅" : x.name,
  en: x.sub,
  count: counts[id] || 0,
}));
fs.writeFileSync(
  new URL("../src/data/catalog.json", import.meta.url),
  JSON.stringify(data),
);
console.log(data.length, "prototypes extracted");
