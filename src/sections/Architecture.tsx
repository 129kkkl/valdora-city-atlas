import ArchitectureCatalog from "../components/ArchitectureCatalog";
import { useState } from "react";
import { CityImage, Kicker } from "../components/Shared";
import { architecture } from "../data/content";
export default function Architecture() {
  const [index, setIndex] = useState(0);
  const a = architecture[index];
  return (
    <section id="architecture" className="architecture section-wrap">
      <Kicker number="03">ARCHITECTURE / 建筑图鉴</Kicker>
      <div className="architecture-title">
        <h2>
          相同的一格。
          <br />
          <em>不同的性格。</em>
        </h2>
        <div>
          <strong>36</strong>
          <p>
            种住宅原型
            <br />
            共同构成城市的日常
          </p>
        </div>
      </div>
      <div className="architecture-spread">
        <div className="architecture-visual">
          <CityImage
            key={a.image}
            name={a.image}
            alt={a.name + "实际建筑细节"}
          />
          <span className="plate-label">
            PLATE {String(index + 1).padStart(2, "0")} / ARCHITECTURAL STUDIES
          </span>
          <div className="image-cross cross-a" />
          <div className="image-cross cross-b" />
        </div>
        <div className="architecture-copy" aria-live="polite">
          <span className="eyebrow">{a.en}</span>
          <h3>{a.name}</h3>
          <span className="architecture-type">{a.type}</span>
          <p>{a.text}</p>
          <ol>
            {a.details.map((s, i) => (
              <li key={s}>
                <span>0{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <div className="architecture-pagination">
            <button
              aria-label="上一种建筑"
              onClick={() =>
                setIndex(
                  (index + architecture.length - 1) % architecture.length,
                )
              }
            >
              ←
            </button>
            <span>{String(index + 1).padStart(2, "0")} / 05</span>
            <button
              aria-label="下一种建筑"
              onClick={() => setIndex((index + 1) % architecture.length)}
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div className="architecture-index" aria-label="建筑图鉴目录">
        {architecture.map((a, i) => (
          <button
            key={a.name}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          >
            <span>0{i + 1}</span>
            {a.name}
          </button>
        ))}
      </div>
      <ArchitectureCatalog />
      <div className="architecture-footnote">
        <span>ONE VOXEL. MANY WAYS TO BUILD.</span>
        <p>
          从拱廊商宅、转角塔楼到院落工坊与渔舍，原型决定构筑方式；面宽、层高、屋顶组合、材质与附属构件继续塑造差异。每座住宅都有自己的参数与落位。
        </p>
      </div>
    </section>
  );
}
