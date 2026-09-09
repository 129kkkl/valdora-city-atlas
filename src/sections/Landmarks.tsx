import { CityImage, EnterLink, Kicker } from "../components/Shared";
import { landmarks } from "../data/content";
export default function Landmarks() {
  return (
    <section id="landmarks" className="landmarks">
      <div className="section-wrap landmark-heading">
        <Kicker number="04">LANDMARKS / 城市的记忆坐标</Kicker>
        <h2>
          抬头，<em>便有方向。</em>
        </h2>
        <p>有些建筑用来生活，有些建筑让一座城市被记住。</p>
      </div>
      {landmarks.map((l, i) => (
        <article className={"landmark-feature landmark-" + i} key={l.name}>
          <div className="landmark-photo">
            <CityImage
              name={l.image}
              alt={l.name + "实景"}
              sizes="(max-width: 760px) 100vw, 72vw"
            />
            <span className="landmark-photo-label">
              FIG. 0{i + 2} / {l.sub}
            </span>
          </div>
          <div className="landmark-copy">
            <span className="landmark-number">0{i + 1}</span>
            <span className="eyebrow">{l.en}</span>
            <h3>{l.name}</h3>
            <p>{l.text}</p>
            <EnterLink
              query={`?cam=${encodeURIComponent(l.camera + "|" + l.target)}&m=golden`}
            >
              前往此处
            </EnterLink>
          </div>
        </article>
      ))}
      <div className="other-landmarks section-wrap">
        <span>ALSO IN THE CITY</span>
        <p>
          市政厅与钟楼 ／ 圣本笃修道院 ／ 行会会馆 ／ 南关瓮城
          <br />
          盐湾渔市 ／ 临港谷仓 ／ 东崖学堂 ／ 石坑剧场
        </p>
      </div>
    </section>
  );
}
