import catalog from "../data/catalog.json";
export default function ArchitectureCatalog() {
  return (
    <details className="architecture-catalog">
      <summary>打开完整建筑目录 / ALL 36 PROTOTYPES</summary>
      <div className="prototype-list">
        {catalog.map((p) => (
          <div key={p.id}>
            <strong>
              {p.name}
              <span>
                <small>{p.en}</small>
              </span>
            </strong>
            <b>
              {p.count}
              <small> 栋</small>
            </b>
          </div>
        ))}
      </div>
      <p>
        当前展示种子的住宅原型分布，总计 390
        栋。公共地标另列；数量会随版本与种子变化。
      </p>
    </details>
  );
}
