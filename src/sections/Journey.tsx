import { useEffect, useRef, useState } from "react";
import { CityImage, Kicker } from "../components/Shared";
import { useReducedMotion } from "../hooks/useChapter";
const stops = [
  {
    name: "外海",
    en: "THE OPEN SEA",
    image: "salt",
    text: "从孤岛的信标出发。海面把城市与更远的世界相连。",
  },
  {
    name: "灯塔",
    en: "THE FIRST LIGHT",
    image: "lighthouse",
    text: "王冠灯塔立在水岸前缘，城市的轮廓开始清晰。",
  },
  {
    name: "海港",
    en: "THE HARBOUR",
    image: "harbor",
    text: "栈桥向水中延伸，货栈与谷仓沿岸排开。",
  },
  {
    name: "市场",
    en: "THE MARKET",
    image: "market",
    text: "循着商道入城，在遮阳棚与石泉之间放慢脚步。",
  },
  {
    name: "老城",
    en: "THE OLD TOWN",
    image: "guildhall",
    text: "赤陶山墙交错成街，行会与商宅在这里相邻。",
  },
  {
    name: "教堂",
    en: "THE WHITE STONE",
    image: "cathedral",
    text: "白石阶梯抬升视线，双塔越过密集的屋顶。",
  },
  {
    name: "山堡",
    en: "THE CROWN",
    image: "citadel",
    text: "抵达北境，再回望来时的港湾。城市在脚下完整展开。",
  },
];
export default function Journey() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.index));
        }),
      { rootMargin: "-35% 0px -40% 0px" },
    );
    refs.current.forEach((e) => e && io.observe(e));
    return () => io.disconnect();
  }, [reduced]);
  return (
    <section id="journey" className={"journey " + (reduced ? "reduced" : "")}>
      <div className="journey-sticky">
        <div className="journey-images">
          {stops.map((s, i) => (
            <div
              key={s.image}
              className={i === active ? "active" : " "}
              aria-hidden={i !== active}
            >
              <CityImage
                name={s.image}
                alt={s.name + "旅程实景"}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="journey-shade" />
        <div className="journey-title">
          <Kicker number="05">A PASSAGE THROUGH VALDORA</Kicker>
          <h2>
            From sea
            <br />
            to <em>crown.</em>
          </h2>
          <p>从海到山，一路入城。</p>
        </div>
        <div className="journey-current" aria-live="polite">
          <span>
            0{active + 1} / {stops[active].en}
          </span>
          <h3>{stops[active].name}</h3>
          <p>{stops[active].text}</p>
        </div>
        <div className="journey-route" aria-label="旅程章节">
          {stops.map((s, i) => (
            <button
              key={s.name}
              aria-pressed={i === active}
              onClick={() => {
                setActive(i);
                if (!reduced)
                  refs.current[i]?.scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
              }}
            >
              <i />
              {s.name}
            </button>
          ))}
        </div>
      </div>
      <div className="journey-steps" aria-hidden="true">
        {stops.map((s, i) => (
          <div
            key={s.name}
            data-index={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
