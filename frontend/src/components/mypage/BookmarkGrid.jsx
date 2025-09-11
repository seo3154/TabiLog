import { Link } from "react-router-dom";
import { pub } from "../../utils/profile";
import { useTranslation } from "react-i18next";

export default function BookmarkGrid({ items = [] }) {
  const { t } = useTranslation(["translation", "places"]);

  if (!items.length) {
    return <div className="bookmark-empty">{t("bookmark.empty")}</div>;
  }

  const toPath = (item) =>
    item.type === "place" ? `/place/${item.id}` : `/board/${item.id}`;

  const getPlaceTitle = (it) =>
    t(`places:${it.id}.name`, {
      defaultValue: it.title || "",
    });

  const getPlaceSubtitle = (it) => {
    const pref = t(`places:${it.id}.prefecture`, {
      defaultValue: it.prefecture || "",
    });
    const sub = t(`places:${it.id}.heroSubtitle`, {
      defaultValue: it.subtitle || "",
    });
    const joined = [pref, sub].filter(Boolean).join(" / ");
    return joined || undefined;
  };

  return (
    <section className="bookmark">
      <div className="bookmark-grid" aria-label={t("bookmark.label")}>
        {items.map((it) => {
          const displayTitle =
            it.type === "place"
              ? getPlaceTitle(it)
              : it.title || t("bookmark.noTitle");

          const displaySub =
            it.type === "place" ? getPlaceSubtitle(it) : it.subtitle;

          return (
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
                  alt={displayTitle}
                  className="bookmark-img"
                  loading="lazy"
                />
                <div className="bookmark-meta">
                  <div className="bookmark-title">{displayTitle}</div>
                  {displaySub && (
                    <div className="bookmark-sub">{displaySub}</div>
                  )}
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
