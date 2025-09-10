import { Link } from "react-router-dom";
import { pub } from "../../utils/profile";
import { useTranslation } from "react-i18next";

export default function BookmarkGrid({ items = [] }) {
  const { t } = useTranslation();

  if (!items.length)
    return <div className="bookmark-empty">{t("bookmark.empty")}</div>;

  const toPath = (item) =>
    item.type === "place" ? `/place/${item.id}` : `/board/${item.id}`;

  return (
    <section className="bookmark">
      <div className="bookmark-grid" aria-label={t("bookmark.label")}>
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
                alt={it.title || t("bookmark.noTitle")}
                className="bookmark-img"
                loading="lazy"
              />
              <div className="bookmark-meta">
                <div className="bookmark-title">
                  {it.title || t("bookmark.noTitle")}
                </div>
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
