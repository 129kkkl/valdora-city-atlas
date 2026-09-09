import { useEffect, useRef } from "react";
import { gallery } from "../data/content";
import { asset } from "./Shared";
export default function Lightbox({
  index,
  onChange,
  onClose,
}: {
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current!;
    const focus = document.activeElement as HTMLElement;
    d.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      d.close();
      focus?.focus();
    };
  }, []);
  const item = gallery[index];
  return (
    <dialog
      ref={ref}
      className="lightbox"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onChange((index + 1) % gallery.length);
        if (e.key === "ArrowLeft")
          onChange((index + gallery.length - 1) % gallery.length);
      }}
      aria-label={item.title}
    >
      <div className="lightbox-top">
        <span>VALDORA / 城市影像</span>
        <button onClick={onClose} autoFocus aria-label="关闭影像">
          关闭 ×
        </button>
      </div>
      <img src={asset(item.image)} alt={item.title} />
      <div className="lightbox-bottom">
        <button
          aria-label="上一张影像"
          onClick={() =>
            onChange((index + gallery.length - 1) % gallery.length)
          }
        >
          ←
        </button>
        <p>
          {item.title}
          <small>
            {index + 1} / {gallery.length} — {item.en}
          </small>
        </p>
        <button
          aria-label="下一张影像"
          onClick={() => onChange((index + 1) % gallery.length)}
        >
          →
        </button>
      </div>
    </dialog>
  );
}
