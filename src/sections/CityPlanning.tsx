import { useState } from "react";
import { CityImage, Kicker } from "../components/Shared";
import plan from "../data/plan.json";
import { districts } from "../data/content";
export default function CityPlanning() {
  const [selected, setSelected] = useState(0);
  const [full, setFull] = useState(false);
  const d = districts[selected];
  return (
    <section id="planning" className="planning section-wrap">
      <Kicker number="02">MASTER PLAN / 城市不是房屋的集合</Kicker>
      <div className="planning-head">
        <h2>
          每一条街，
          <br />
          都通往一种生活。
        </h2>
        <p>
          先落位道路与地标，再组织临街地块、院落与住宅。
          <br />
          城市的密度，来自连接；城市的呼吸，来自留白。
        </p>
      </div>
      <div className="planning-layout">
        <div className="map-panel">
          <div className="map-toolbar">
            <span>VALDORA / 城市总平面</span>
            <button onClick={() => setFull(!full)}>
              {full ? "查看主城 ＋" : "展开全域 −"}
            </button>
          </div>
          <svg
            className="master-plan"
            viewBox={full ? "-540 -550 1080 1100" : "-290 -265 590 540"}
            role="img"
            aria-label="根据原项目区域多边形与390栋住宅实际足迹绘制的城市规划图"
          >
            <defs>
              <pattern
                id="map-grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M32 0H0V32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth=".5"
                  opacity=".13"
                />
              </pattern>
            </defs>
            <rect
              x="-540"
              y="-550"
              width="1080"
              height="1100"
              fill="url(#map-grid)"
            />
            <rect
              x="-512"
              y="-512"
              width="1024"
              height="1024"
              fill="none"
              stroke="currentColor"
              strokeDasharray="5 5"
              opacity=".3"
            />
            {plan.zones.map((z) => (
              <polygon
                key={z.id}
                points={z.polygon.map((p) => p.join(",")).join(" ")}
                className={z.id === d.id ? "zone active" : "zone"}
                style={{
                  cursor: districts.some((d) => d.id === z.id)
                    ? "pointer"
                    : "default",
                }}
                onMouseEnter={() => {
                  const i = districts.findIndex((d) => d.id === z.id);
                  if (i >= 0) setSelected(i);
                }}
                onClick={() => {
                  const i = districts.findIndex((d) => d.id === z.id);
                  if (i >= 0) setSelected(i);
                }}
              />
            ))}
            {plan.buildings.map((b) => (
              <rect
                key={b.id}
                x={b.x0}
                y={b.z0}
                width={b.x1 - b.x0 + 1}
                height={b.z1 - b.z0 + 1}
                className="building-footprint"
              />
            ))}
            <path
              d="M30 175L-24 32L45 -24L-20 -115"
              className="ceremonial-axis"
            />
            {districts.slice(0, 4).map((x, i) => {
              const p = [
                [30, 175],
                [-24, 32],
                [45, -24],
                [-20, -115],
              ][i];
              return (
                <g key={x.id} transform={`translate(${p[0]},${p[1]})`}>
                  <circle
                    r="11"
                    className={
                      i === selected ? "map-point active" : "map-point"
                    }
                  />
                  <text textAnchor="middle" dy="4" className="map-number">
                    0{i + 1}
                  </text>
                </g>
              );
            })}
            <text
              x={full ? 460 : 240}
              y={full ? -470 : -220}
              className="map-north"
            >
              ↑ N
            </text>
          </svg>
          <div className="map-legend">
            <span>
              <i /> 住宅实际足迹
            </span>
            <span>
              <i /> 区域边界
            </span>
            <span>··· 山海空间叙事轴</span>
          </div>
          <small className="map-note">
            平面基于当前种子建筑坐标。虚线为港—市—教堂—山堡的叙事连线，不是导航路线。
          </small>
        </div>
        <div className="district-aside">
          <div className="district-tabs" aria-label="选择城区">
            {districts.map((x, i) => (
              <button
                key={x.id}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                <span>0{i + 1}</span>
                {x.name}
                <span>↗</span>
              </button>
            ))}
          </div>
          <div className="district-detail" aria-live="polite">
            <CityImage name={d.image} alt={d.name + "实景"} />
            <span className="eyebrow">{d.en}</span>
            <h3>{d.name}</h3>
            <p>{d.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
