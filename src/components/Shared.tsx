import type { ReactNode } from "react";
export const asset = (name: string) =>
  `${import.meta.env.BASE_URL}images/${name}.webp`;
export const worldUrl = (query = "") =>
  `${import.meta.env.BASE_URL}world/index.html${query}`;
export function Crown() {
  return (
    <svg
      viewBox="0 0 64 54"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M7 32V12l15 11L32 5l10 18 15-11v20H7ZM7 40h50M7 49l12-3 13 3 13-3 12 3" />
    </svg>
  );
}
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "→"}
    </span>
  );
}
export function EnterLink({
  children = "进入瓦尔多拉",
  className = "",
  query = "",
}: {
  children?: ReactNode;
  className?: string;
  query?: string;
}) {
  return (
    <a className={`enter-link ${className}`} href={worldUrl(query)}>
      {children}
      <Arrow diagonal />
    </a>
  );
}
export function Kicker({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="kicker">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}
export function CityImage({
  name,
  alt,
  className = "",
  eager = false,
  sizes = "(max-width: 700px) 100vw, 80vw",
}: {
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <img
      className={className}
      src={asset(name)}
      srcSet={`${asset(name + "-800")} 800w, ${asset(name)} 1600w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      width="1600"
      height="1000"
    />
  );
}
