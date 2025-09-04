import { Link } from "react-router-dom";
import { pub } from "../../utils/profile";

export default function BookmarkGrid({ items = [] }) {
  if (!items.length)
    return <div className="bookmark-empty">북마크가 없습니다.</div>;
  const toPath = (item) =>
    item.type === "place" ? `/place/${item.id}` : `/board/${item.id}`;

  return (
    <section className="bookmark">
      <div className="bookmark-grid" aria-label="북마크">
        {items.map((it) => (
          <Link key={it.id} to={toPath(it)} className="bookmark-link">
            <article className="bookmark-card">
              <img
                src={
                  it.image
                    ? it.image.startsWith("http")
                      ? it.image
                      : pub(it.image)
                    : "https://placehold.co/600x400"
                }
                alt={it.title || "bookmark"}
                className="bookmark-img"
                loading="lazy"
              />
              <div className="bookmark-meta">
                <div className="bookmark-title">{it.title || "제목 없음"}</div>
                {it.subtitle && (
                  <div className="bookmark-sub">{it.subtitle}</div>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
