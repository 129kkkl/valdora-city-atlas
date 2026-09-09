import { useState } from "react";
import { CityImage, EnterLink, Kicker } from "../components/Shared";
const modes = [
  {
    en: "ORBIT",
    name: "把城市握在手中",
    image: "overview",
    text: "拖拽旋转、滚轮缩放，或交给自动巡游。从18个预设视角进入山海之间。",
    keys: ["拖拽 · 旋转", "滚轮 · 缩放", "A · 自动巡游"],
  },
  {
    en: "WALK",
    name: "从全景，走进街巷",
    image: "house-fachwerk",
    text: "切换第一人称，沿街行走、转身与跳跃。小地图帮助定位，建筑档案在靠近时讲述它的来历。",
    keys: ["V · 漫游模式", "WASD · 行走", "Space · 跳跃"],
  },
  {
    en: "BUILD",
    name: "在一格的尺度上动手",
    image: "house-steppedGable",
    text: "漫游中涂抹或移除体素，切换颜色与笔刷。修改按地图种子保存在当前浏览器，可撤销和清除。",
    keys: ["左键 · 涂抹", "右键 · 移除", "Ctrl + Z · 撤销"],
  },
  {
    en: "LISTEN",
    name: "听见海风与钟鸣",
    image: "harbor",
    text: "启用程序化环境声音。潮汐、风声、海鸥与钟鸣由 Web Audio 在浏览器中合成。",
    keys: ["M · 环境声音", "B · 钟鸣"],
  },
  {
    en: "CAPTURE",
    name: "带走自己的城市影像",
    image: "cathedral",
    text: "导出当前画面的 PNG；分享链接记录种子、光影和相机。每一个观看位置都可以成为你的取景。",
    keys: ["P · 拍照", "分享 · 复制视角链接"],
  },
];
export default function Exploration() {
  const [active, setActive] = useState(0);
  const m = modes[active];
  return (
    <section id="exploration" className="exploration section-wrap">
      <Kicker number="06">EXPLORATION / 不止远观</Kicker>
      <div className="section-heading">
        <h2>
          一座可观看的城。
          <br />
          <em>也是可走入的世界。</em>
        </h2>
        <p>
          从轨道相机的全城俯瞰，到街巷里的一次转身。尺度变化，城市的细节也随之显现。
        </p>
      </div>
      <div className="explore-tabs" aria-label="探索方式">
        {modes.map((x, i) => (
          <button
            key={x.en}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {x.en}
          </button>
        ))}
      </div>
      <div className="explore-stage">
        <CityImage name={m.image} alt={m.name} />
        <div className="explore-overlay" aria-live="polite">
          <span className="eyebrow">{m.en} / IN THE WORLD</span>
          <h3>{m.name}</h3>
          <p>{m.text}</p>
          <div className="key-row">
            {m.keys.map((k) => (
              <kbd key={k}>{k}</kbd>
            ))}
          </div>
          <EnterLink>进入世界体验</EnterLink>
        </div>
      </div>
      <p className="explore-note">
        此处为操作导览。进入城市后使用真实功能；分享链接不包含本地体素编辑与收藏进度。
      </p>
    </section>
  );
}
