import { useState, lazy, Suspense } from "react";
import { CityImage, Kicker } from "../components/Shared";
import { gallery } from "../data/content";
const Lightbox = lazy(() => import("../components/Lightbox"));
export default function Gallery() {
  const [filter, setFilter] = useState("全部");
  const [selected, setSelected] = useState<number | null>(null);
  const items = gallery.filter(
    (x) => filter === "全部" || x.category === filter,
  );
  return (
    <section id="gallery" className="gallery section-wrap">
      <Kicker number="10">FIELD NOTES / 城市影像</Kicker>
      <div className="gallery-heading">
        <h2>
          停下来的，<em>片刻。</em>
        </h2>
        <p>
          全部取自瓦尔多拉当前版本。
          <br />
          一个世界，许多观看它的方式。
        </p>
      </div>
      <div className="gallery-filters" aria-label="影像分类">
        {["全部", "全景", "建筑", "海港", "山地", "夜晚", "田园"].map((x) => (
          <button
            key={x}
            onClick={() => setFilter(x)}
            aria-pressed={filter === x}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {items.map((x, i) => (
          <figure key={x.image} className={"gallery-item gi-" + (i % 6)}>
            <button
              onClick={() => setSelected(gallery.indexOf(x))}
              aria-label={"放大查看：" + x.title}
            >
              <CityImage name={x.image} alt={x.title + " — 瓦尔多拉实景"} />
              <span className="zoom-mark">↗</span>
            </button>
            <figcaption>
              <span>
                <small>
                  {x.category} / {x.en}
                </small>
                {x.title}
              </span>
              <span>{String(gallery.indexOf(x) + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {selected !== null && (
        <Suspense
          fallback={
            <div className="lightbox-loading" role="status">
              正在打开影像…
            </div>
          }
        >
          <Lightbox
            index={selected}
            onChange={setSelected}
            onClose={() => setSelected(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
