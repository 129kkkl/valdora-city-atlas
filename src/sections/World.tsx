import { CityImage, Kicker } from "../components/Shared";
export default function World() {
  return (
    <section id="world" className="world section-wrap">
      <Kicker number="01">THE WORLD / 山海为序</Kicker>
      <div className="section-heading">
        <h2>
          先有山海。
          <br />
          然后，<em>城市生长。</em>
        </h2>
        <p>
          向南，河水汇入开阔海湾；向北，山肩托起要塞。港口、砖城与白石圣区顺着高差展开，街道把彼此不同的生活连接起来。
        </p>
      </div>
      <div className="world-plate">
        <CityImage
          name="overview"
          alt="1024格世界全景，主城、外围聚落、山地与海湾共同分布"
        />
        <div className="world-dimension">
          <span>←</span>1024 WORLD UNITS<span>→</span>
        </div>
        <div className="world-caption">
          <span>FIG. 01 — 山海全域</span>
          <span>−512 — +511 / X · Z</span>
        </div>
        <div className="world-seal">
          <strong>1,048,576</strong>
          <span>平面网格 · 从海岸延伸至北境</span>
        </div>
      </div>
      <div className="world-notes">
        <p>
          <span>THE SEA</span>码头、盐岛与灯塔，
          <br />
          组成朝向外海的城市门面。
        </p>
        <p>
          <span>THE CITY</span>市集、作坊和住宅街巷，
          <br />
          围绕公共建筑形成层次。
        </p>
        <p>
          <span>THE HIGHLANDS</span>矿镇、山村与林坡，
          <br />
          让城市延伸到城墙之外。
        </p>
      </div>
    </section>
  );
}
