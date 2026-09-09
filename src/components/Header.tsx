import { useEffect, useState } from "react";
import { Crown, EnterLink } from "./Shared";
import { useChapter } from "../hooks/useChapter";
const links = [
  ["world", "World", "世界"],
  ["landmarks", "Landmarks", "地标"],
  ["architecture", "Architecture", "建筑"],
  ["exploration", "Exploration", "探索"],
  ["technology", "Technology", "技术"],
  ["gallery", "Gallery", "影像"],
  ["about", "About", "理念"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const active = useChapter();
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        跳至正文
      </a>
      <header className="site-header">
        <a href="#home" className="brandmark" aria-label="Valdora 首页">
          <Crown />
          <span>
            VALDORA<small>SEA & STONE</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "关闭 −" : "目录 +"}
        </button>
        <nav id="main-nav" className={open ? "open" : ""} aria-label="主要导航">
          {links.map(([id, en, cn]) => (
            <a
              key={id}
              href={"#" + id}
              onClick={() => setOpen(false)}
              aria-current={active === id ? "location" : undefined}
            >
              {en}
              <span>{cn}</span>
            </a>
          ))}
        </nav>
        <EnterLink className="header-enter">ENTER THE CITY</EnterLink>
      </header>
    </>
  );
}
