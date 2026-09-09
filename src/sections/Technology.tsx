import { Kicker } from "../components/Shared";
import facts from "../data/facts.json";
export default function Technology() {
  return (
    <section id="technology" className="technology section-wrap">
      <Kicker number="09">UNDER THE SURFACE / 构筑这座城</Kicker>
      <div className="tech-layout">
        <div className="tech-intro">
          <h2>
            看见的是城市。
            <br />
            <em>背后，是秩序。</em>
          </h2>
          <p>
            统一的一格立方体，经由地形、道路、建筑与细节生成，成为可交互的完整世界。Three.js
            将这些格点带入浏览器。
          </p>
          <div className="voxel-diagram" aria-label="统一体素的等轴测结构示意">
            <svg viewBox="0 0 360 300" fill="none" stroke="currentColor">
              <path d="M180 35L310 110V240L180 165L50 240V110L180 35ZM50 110L180 185L310 110M180 185V285M50 240L180 285L310 240M180 35V165" />
              <path
                d="M93 85L223 160V260M137 60L267 135V253M93 135V225M137 160V270M50 153L180 228L310 153M50 197L180 270L310 197"
                opacity=".35"
              />
              <path d="M24 260L160 307M327 101V230" strokeDasharray="4 4" />
            </svg>
            <span>1 × 1 × 1</span>
            <small>THE COMMON UNIT</small>
          </div>
        </div>
        <div className="tech-specs">
          <div className="tech-readout">
            <span>WORLD SNAPSHOT / 默认种子实测</span>
            <strong>{facts.voxels.toLocaleString("en-US")}</strong>
            <p>STATIC VOXELS · 生成体素总量</p>
            <div>
              <span>
                <b>{facts.batches}</b>实例批次
              </span>
              <span>
                <b>{facts.drawCalls}</b>该次俯瞰 Draw Calls
              </span>
              <span>
                <b>36</b>住宅原型
              </span>
            </div>
            <small>
              SEED {facts.seed.toUpperCase()} / 帧率随设备、视角和画质变化
            </small>
          </div>
          <dl>
            <div>
              <dt>01 / GENERATE</dt>
              <dd>
                <h3>由种子生长</h3>
                <p>
                  地形与住宅参数采用确定性生成；道路、功能区和地标先于住宅落位。
                </p>
              </dd>
            </div>
            <div>
              <dt>02 / RENDER</dt>
              <dd>
                <h3>让百万体素进入一帧</h3>
                <p>
                  InstancedMesh
                  分块实例化、隐藏体素剔除、顶点环境遮蔽与自适应画质，共同控制渲染负担。
                </p>
              </dd>
            </div>
            <div>
              <dt>03 / AUDIT</dt>
              <dd>
                <h3>让结构彼此成立</h3>
                <p>
                  生成过程检查住宅交叠、道路冲突、地基、屋顶与结构连通性。空间秩序也是代码的一部分。
                </p>
              </dd>
            </div>
            <div>
              <dt>04 / EXPLORE</dt>
              <dd>
                <h3>在浏览器中留下足迹</h3>
                <p>
                  WebGL2 绘制场景，Web Audio 合成声音，localStorage
                  保存本地编辑与收藏。原城市内核已内嵌，可离线运行。
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
