import { CityImage, Crown, EnterLink } from "../components/Shared";
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-sky">
        <div className="hero-edition">
          <span>A DIGITAL CITY ATLAS</span>
          <span>VOL. 01 / 山海城市志</span>
        </div>
        <div className="hero-title">
          <span className="hero-side">
            EST. IN VOXELS
            <br />
            BUILT TO EXPLORE
          </span>
          <h1>VALDORA</h1>
          <Crown />
        </div>
        <div className="hero-subline">
          <span>CROWN CITY OF SEA & STONE</span>
          <span>瓦尔多拉 · 山海王冠之城</span>
        </div>
      </div>
      <div className="hero-scene">
        <CityImage
          name="hero"
          alt="瓦尔多拉实景：蓝绿港湾与赤陶屋顶，沿山势升向白石双塔与北境城堡"
          eager
          sizes="100vw"
        />
        <div className="hero-coordinate">
          <span className="hero-scale">
            1024 × 1024 WORLD / 1 × 1 × 1 VOXEL
          </span>
          <span>SEED 5A17D04A</span>
        </div>
        <div className="hero-bottom">
          <div>
            <p className="hero-statement">
              海风抵达的地方，
              <br />
              一座城市沿山而生。
            </p>
            <p>
              390 栋住宅，36 种建筑原型。
              <br className="desktop-only" />
              在浏览器里，实时探索欧洲幻想山海城。
            </p>
          </div>
          <EnterLink className="hero-enter">
            <span>
              ENTER VALDORA<small>入城，开始你的漫游</small>
            </span>
          </EnterLink>
          <a href="#world" className="scroll-cue">
            翻开城市志<span>↓</span>
          </a>
        </div>
      </div>
      <div className="hero-stats">
        <div>
          <strong>1024 × 1024</strong>
          <span>山海世界 / WORLD GRID</span>
        </div>
        <div>
          <strong>1 × 1 × 1</strong>
          <span>统一体素 / ONE UNIT</span>
        </div>
        <div>
          <strong>
            390<span> 栋</span>
          </strong>
          <span>住宅 / 36 种建筑原型</span>
        </div>
        <div>
          <strong>WebGL</strong>
          <span>浏览器实时探索 / ENTER & WANDER</span>
        </div>
      </div>
    </section>
  );
}
