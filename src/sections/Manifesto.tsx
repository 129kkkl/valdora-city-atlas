import { CityImage, Crown, EnterLink, Kicker } from "../components/Shared";
export default function Manifesto() {
  return (
    <>
      <section id="about" className="manifesto section-wrap">
        <Kicker number="11">MANIFESTO / 关于构筑</Kicker>
        <h2>
          City is more
          <br />
          than <em>buildings.</em>
        </h2>
        <div className="manifesto-body">
          <Crown />
          <div>
            <h3>
              从远处看是城市，
              <br />
              从近处看，仍然成立。
            </h3>
            <p>
              地形决定一条路怎样转弯，路决定房屋怎样面对街道。港口需要货栈，市场需要广场，山顶需要一个让人辨认方向的轮廓。
            </p>
            <p>
              瓦尔多拉的构筑从这些关系开始。统一体素是一种限制，也是一把共同的尺：所有屋顶、石阶、院落与城墙，在同一种尺度中寻找各自的表达。
            </p>
            <p>
              这是一座欧洲幻想城市，也是一项程序化世界构筑与数字建筑实验。宏大由山海与城垣建立；可信，则藏在门前的几级台阶里。
            </p>
          </div>
        </div>
      </section>
      <section id="enter" className="final-cta">
        <CityImage
          name="time-night"
          alt="夜色中的瓦尔多拉，城窗在港湾上方点亮"
          sizes="100vw"
        />
        <div className="final-shade" />
        <div className="final-content">
          <Crown />
          <span>THE GATES ARE OPEN</span>
          <h2>
            Valdora
            <br />
            <em>awaits.</em>
          </h2>
          <p>
            海风已经越过城墙。
            <br />
            下一段路，交给你。
          </p>
          <EnterLink>
            ENTER VALDORA<small>进入瓦尔多拉</small>
          </EnterLink>
          <small>浏览器直接运行 · 首次入城需生成完整世界</small>
        </div>
      </section>
      <footer className="footer">
        <a className="footer-wordmark" href="#home">
          VALDORA
        </a>
        <p>
          CROWN CITY OF SEA & STONE
          <br />
          <span>瓦尔多拉 · 山海王冠之城</span>
        </p>
        <a href="#home">返回卷首 ↑</a>
        <div>
          <span>A VOXEL WORLD · AN ARCHITECTURAL EXPERIMENT</span>
          <span>城市实景 / 默认种子 5A17D04A</span>
        </div>
      </footer>
    </>
  );
}
