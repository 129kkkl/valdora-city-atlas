import { Crown, EnterLink, Kicker } from "../components/Shared";
export default function Collection() {
  return (
    <section id="collection" className="collection section-wrap">
      <div className="collection-seal" aria-hidden="true">
        <div>
          <Crown />
          <span>
            THE LOST
            <br />
            CHRONICLES
          </span>
          <strong>VIII</strong>
          <small>VALDORA CITY ARCHIVE</small>
        </div>
      </div>
      <div className="collection-copy">
        <Kicker number="08">THE UNFOUND / 尚未翻开的城市</Kicker>
        <h2>
          八份卷轴。
          <br />
          <em>留给愿意绕路的人。</em>
        </h2>
        <p>
          有些记忆不在广场中央。它们留在水声里、石墙后，在你愿意多走几步的地方。进入漫游，靠近金色卷轴，收集散落于全城的八段记述。
        </p>
        <div className="scroll-index" aria-label="八份待探索卷轴">
          {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map((x) => (
            <span key={x}>
              {x}
              <small>未启封</small>
            </span>
          ))}
        </div>
        <small className="collection-note">
          探索预告，不读取你的存档。实际发现进度保存在城市体验的当前浏览器中。
        </small>
        <EnterLink>把余下的故事，留给探索</EnterLink>
      </div>
    </section>
  );
}
