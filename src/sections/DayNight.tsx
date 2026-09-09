import { useEffect, useRef, useState } from "react";
import { asset, Kicker } from "../components/Shared";
import { useReducedMotion } from "../hooks/useChapter";
const times = [
  {
    name: "morning",
    en: "MORNING",
    cn: "清晨",
    time: "05:30",
    text: "光从山脊的另一侧升起。",
  },
  {
    name: "noon",
    en: "NOON",
    cn: "正午",
    time: "12:00",
    text: "日光落在白石与水面之间。",
  },
  {
    name: "golden",
    en: "GOLDEN HOUR",
    cn: "黄金时刻",
    time: "17:30",
    text: "赤陶屋顶接住最后一层暖光。",
  },
  {
    name: "dusk",
    en: "DUSK",
    cn: "暮色",
    time: "18:30",
    text: "天空转暗，街窗开始点亮。",
  },
  {
    name: "night",
    en: "NIGHT",
    cn: "深夜",
    time: "00:00",
    text: "海湾沉静下来，灯火留在城中。",
  },
];
export default function DayNight() {
  const [active, setActive] = useState(2);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const manual = useRef(false);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setLoaded(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = ref.current!.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight && !manual.current) {
          const progress = Math.max(
            0,
            Math.min(0.999, (innerHeight * 0.65 - r.top) / (r.height * 0.85)),
          );
          setActive(Math.floor(progress * 5));
        }
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);
  return (
    <section id="daynight" className="daynight" ref={ref}>
      <div className="time-images">
        {loaded &&
          times.map((t, i) => (
            <img
              key={t.name}
              src={asset("time-" + t.name)}
              alt={i === active ? `${t.cn}的瓦尔多拉全景` : ""}
              aria-hidden={i !== active}
              className={i === active ? "active" : ""}
              width="1600"
              height="1000"
              decoding="async"
            />
          ))}
      </div>
      <div className="time-shade" />
      <div className="time-heading">
        <Kicker number="07">LIGHT & TIME / 一城，五时</Kicker>
        <h2>
          同一座城市。
          <br />
          <em>每一次光临，都不同。</em>
        </h2>
      </div>
      <div className="time-caption">
        <span>{times[active].time}</span>
        <div>
          <h3>{times[active].en}</h3>
          <p>{times[active].text}</p>
        </div>
      </div>
      <div className="time-controls">
        <label className="sr-only" htmlFor="time-range">
          选择昼夜时刻
        </label>
        <input
          id="time-range"
          type="range"
          min="0"
          max="4"
          step="1"
          value={active}
          onChange={(e) => {
            manual.current = true;
            setActive(Number(e.target.value));
          }}
          aria-valuetext={times[active].cn}
        />
        <div>
          {times.map((t, i) => (
            <button
              key={t.name}
              aria-pressed={i === active}
              onClick={() => {
                manual.current = true;
                setActive(i);
              }}
            >
              <span>{t.time}</span>
              {t.cn}
            </button>
          ))}
        </div>
        <small>同一机位 · 原项目昼夜系统实景截帧</small>
      </div>
    </section>
  );
}
