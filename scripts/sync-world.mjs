import fs from "node:fs";
import crypto from "node:crypto";
const source = new URL("../../欧洲体素箱庭小镇/index.html", import.meta.url);
const target = new URL("../public/world/index.html", import.meta.url);
fs.mkdirSync(new URL("../public/world/", import.meta.url), { recursive: true });
fs.copyFileSync(source, target);
const hash = crypto
  .createHash("sha256")
  .update(fs.readFileSync(source))
  .digest("hex");
fs.writeFileSync(
  new URL("../docs/source-integrity.json", import.meta.url),
  JSON.stringify(
    {
      source: source.pathname,
      sha256: hash,
      copiedAt: new Date().toISOString(),
      integration:
        "Byte-identical copy at public/world/index.html. Original remains untouched.",
    },
    null,
    2,
  ),
);
console.log("World copied unchanged:", hash);
