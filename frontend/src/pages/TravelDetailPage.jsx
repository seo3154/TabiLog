import { useParams } from "react-router-dom";
import places from "../assets/data/places.json";
import "../styles/TravelDetailPage.css";
import { useEffect, useRef, useState } from "react";
import {
  isBookmarked as isBM,
  toggleBookmark as toggleBM,
} from "../utils/bookmarks";
import { useTranslation } from "react-i18next";

/* [CHANGED] public 경로 헬퍼(CRA/Vite 모두 안전) */
const pub = (p = "") => {
  const base =
    (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) ||
    process.env.PUBLIC_URL ||
    "";
  return `${base}${p}`;
};

/* Google Maps API 키 (Vite/CRA 모두 지원) */
const GMAPS_KEY =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_GOOGLE_MAPS_API_KEY) ||
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  "";

/* Google Maps 스크립트 로더 */
let gmapsLoadingPromise = null;
function loadGoogleMaps(lang = "ja") {
  if (window.google?.maps) return Promise.resolve();
  if (gmapsLoadingPromise) return gmapsLoadingPromise;
  if (!GMAPS_KEY) return Promise.resolve();
  gmapsLoadingPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_KEY}&libraries=places&language=${lang}`;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return gmapsLoadingPromise;
}

export default function TravelDetailPage() {
  const { t, i18n } = useTranslation(["translation", "places"]);
  const { id } = useParams();
  const place = places.find((p) => String(p.id) === String(id));

  // 로그인 사용자/북마크 식별
  const me = JSON.parse(localStorage.getItem("tabilog.user") || "{}");
  const loginId = me?.loginId || "";
  const slug = place?.id;

  /* 지도 관련 상태/참조 */
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState("");
  const [loadingMap, setLoadingMap] = useState(!!GMAPS_KEY);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [nearbyHotels, setNearbyHotels] = useState([]);

  /* 북마크 상태 */
  const [bookmarked, setBookmarked] = useState(() =>
    slug ? isBM(loginId, slug) : false
  );
  useEffect(() => {
    if (!slug) return;
    setBookmarked(isBM(loginId, slug));
  }, [loginId, slug]);

  const toggleBookmark = () => {
    if (!slug) return;
    const next = toggleBM(loginId, slug);
    setBookmarked(next.includes(slug));
  };

  /* ===== 표기 텍스트(i18n) ===== */
  const ns = place ? `places.${place.id}` : "";
  const displayName = place
    ? t(`${ns}.name`, { defaultValue: place.name_ko })
    : "";
  const displayPrefecture = place
    ? t(`${ns}.prefecture`, { defaultValue: place.prefecture })
    : "";
  const displayHeroSubtitle = place
    ? t(`${ns}.heroSubtitle`, {
        defaultValue: place?.hero?.subtitle || "",
      })
    : "";

  const subtitle = [displayPrefecture, displayHeroSubtitle]
    .filter(Boolean)
    .join(" / ");

  const introSummary = place
    ? t(`${ns}.intro.summary`, {
        defaultValue: place?.intro?.summary || "소개 정보가 준비중입니다.",
      })
    : "";
  const introDetail = place
    ? t(`${ns}.intro.detail`, { defaultValue: place?.intro?.detail || "" })
    : "";

  const extraSummary = place
    ? t(`${ns}.extra.summary`, {
        defaultValue: place?.extraintro?.summary || "",
      })
    : "";
  const extraDetail = place
    ? t(`${ns}.extra.detail`, {
        defaultValue: place?.extraintro?.detail || "",
      })
    : "";
  const hasExtraIntro = !!(extraSummary || extraDetail);

  const foodsNames = place
    ? t(`${ns}.foods`, {
        returnObjects: true,
        defaultValue: Array.isArray(place?.foods)
          ? place.foods.map((f) => f.name)
          : [],
      })
    : [];
  const foods = (Array.isArray(place?.foods) ? place.foods : []).map(
    (f, i) => ({
      ...f,
      name: Array.isArray(foodsNames)
        ? foodsNames[i] || f?.name || ""
        : f?.name || "",
    })
  );

  /* 지도 중심 좌표 */
  const center =
    place &&
    typeof place?.map?.lat === "number" &&
    typeof place?.map?.lng === "number"
      ? { lat: place.map.lat, lng: place.map.lng }
      : null;

  /* 지도 로딩 + 주변 장소 검색 */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!place) {
        setLoadingMap(false);
        setNearbyLoading(false);
        return;
      }
      if (!center) {
        setMapError(t("travel.detail.mapErrorNoCoord"));
        setLoadingMap(false);
        return;
      }
      if (!GMAPS_KEY) {
        setMapError(t("travel.detail.mapErrorNoKey"));
        setLoadingMap(false);
        return;
      }

      try {
        await loadGoogleMaps(i18n.resolvedLanguage || "ja");
        if (cancelled) return;

        const g = window.google.maps;
        const map = new g.Map(mapRef.current, {
          center,
          zoom: place?.map?.zoom ?? 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        new g.Marker({ position: center, map, title: displayName });
        setLoadingMap(false);

        // 주변 검색
        setNearbyLoading(true);
        const service = new g.places.PlacesService(map);
        const radius = place?.map?.radius ?? 1500;

        const doNearby = (type) =>
          new Promise((resolve) => {
            service.nearbySearch(
              { location: center, radius, type },
              (results, status) => {
                if (
                  status === g.places.PlacesServiceStatus.OK &&
                  Array.isArray(results)
                ) {
                  resolve(results.slice(0, 2));
                } else {
                  resolve([]);
                }
              }
            );
          });

        const [rest, hotel] = await Promise.all([
          doNearby("restaurant"),
          doNearby("lodging"),
        ]);
        if (cancelled) return;

        setNearbyRestaurants(rest);
        setNearbyHotels(hotel);
        setNearbyLoading(false);
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setMapError(t("travel.detail.mapErrorGeneric"));
          setLoadingMap(false);
          setNearbyLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, t, i18n.resolvedLanguage]); // 언어/장소 바뀌면 재로드

  // 존재하지 않는 장소
  if (!place) {
    console.warn("해당 id를 찾을 수 없습니다:", id);
    return (
      <main className="travel-detail-main-not-found">
        {t("travel.detail.notFound")}
      </main>
    );
  }

  // 기본 데이터
  const heroImg = place?.hero?.image ?? "";
  const gallery = Array.isArray(place?.gallery) ? place.gallery : [];
  const extraGallery = Array.isArray(place?.extragallery)
    ? place.extragallery
    : [];

  // 주변 장소 카드 변환
  const placeToCard = (pl) => {
    const name = pl.name || "";
    const rating = typeof pl.rating === "number" ? pl.rating.toFixed(1) : null;
    const total = pl.user_ratings_total;
    const photoUrl = pl.photos?.[0]?.getUrl?.({
      maxWidth: 1200,
      maxHeight: 800,
    });
    const placeId = pl.place_id;
    const mapsUrl = placeId
      ? `https://www.google.com/maps/place/?q=place_id:${placeId}`
      : null;
    const vicinity = pl.vicinity || pl.formatted_address || "";
    const openNow = pl.opening_hours?.isOpen?.() ?? pl.opening_hours?.open_now;
    return { name, rating, total, photoUrl, mapsUrl, vicinity, openNow };
  };

  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="travel-hero">
        {!!heroImg && (
          <img
            src={pub(heroImg)}
            alt={displayName}
            className="travel-hero-img"
          />
        )}
      </section>

      {/* ===== 제목/부제 + 북마크 ===== */}
      <section className="travel-title">
        <div className="travel-title-header">
          <h1 className="travel-title-h1">{displayName}</h1>
          <button
            className={`bookmark-btn ${bookmarked ? "active" : ""}`}
            onClick={toggleBookmark}
            aria-label={t("travel.detail.bookmark")}
            title={t("travel.detail.bookmark")}
          >
            ★
          </button>
        </div>
        {subtitle && <p className="travel-title-sub">{subtitle}</p>}
      </section>

      {/* ===== 소개 ===== */}
      {(introSummary || introDetail) && (
        <section className="travel-detail-intro-section">
          {introSummary && <p>{introSummary}</p>}
          {introDetail && <p>{introDetail}</p>}
        </section>
      )}

      {/* ===== 갤러리 ===== */}
      {gallery.length > 0 && (
        <div className="travel-detail-gallery-div">
          {gallery.map((src, i) => (
            <img
              key={`g-${i}`}
              src={pub(src)}
              alt={`${displayName}-gallery-${i}`}
              className="travel-detail-gallery-img"
            />
          ))}
        </div>
      )}

      {/* ===== 추가 소개 ===== */}
      {hasExtraIntro && (
        <section className="travel-detail-intro-section travel-detail-intro-extra">
          {extraSummary && <p>{extraSummary}</p>}
          {extraDetail && <p>{extraDetail}</p>}
        </section>
      )}

      {/* ===== 추가 갤러리 ===== */}
      {extraGallery.length > 0 && (
        <div className="travel-detail-gallery-div travel-detail-gallery-extra">
          {extraGallery.map((src, i) => (
            <img
              key={`eg-${i}`}
              src={pub(src)}
              alt={`${displayName}-extragallery-${i}`}
              className="travel-detail-gallery-img"
            />
          ))}
        </div>
      )}

      {/* ===== 지역 먹거리 ===== */}
      {foods.length > 0 && (
        <section className="travel-detail-foods-section">
          <h3>{t("travel.detail.foods")}</h3>
          <div className="travel-detail-foods-div">
            {foods.map((f, i) => (
              <article key={i} className="travel-detail-foods-article">
                {f?.image && (
                  <img
                    src={pub(f.image)}
                    alt={f?.name || ""}
                    className="travel-detail-foods-img"
                  />
                )}
                <div className="travel-detail-foods-name">{f?.name || ""}</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ===== 지도 & 주변 추천 ===== */}
      <section className="gmaps-section">
        <h3>{t("travel.detail.map")}</h3>

        {/* 지도 래퍼 */}
        <div className="gmaps-map-wrap">
          {/* 실제 지도 div */}
          {!mapError && (
            <div
              ref={mapRef}
              className="gmaps-map"
              aria-label={t("travel.detail.map")}
            />
          )}

          {/* 로딩 오버레이 */}
          {!mapError && loadingMap && (
            <div className="gmaps-overlay">{t("travel.detail.loadingMap")}</div>
          )}

          {/* 에러 오버레이 */}
          {mapError && <div className="gmaps-error">{mapError}</div>}
        </div>

        {/* 주변 추천 2-컬럼 (식당/숙소) */}
        {!mapError && !loadingMap && (
          <div className="nearby-wrap">
            {/* 식당 */}
            <div className="nearby-col">
              <h4>{t("travel.detail.nearby.restaurants")}</h4>
              {nearbyLoading ? (
                <div className="nearby-loading">
                  {t("travel.detail.nearby.loading")}
                </div>
              ) : nearbyRestaurants.length === 0 ? (
                <div className="nearby-empty">
                  {t("travel.detail.nearby.emptyRestaurant")}
                </div>
              ) : (
                <div className="nearby-list">
                  {nearbyRestaurants.map((pl, i) => {
                    const c = placeToCard(pl);
                    return (
                      <a
                        key={`r-${i}`}
                        className="nearby-card"
                        href={c.mapsUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        title={c.name}
                      >
                        {c.photoUrl && (
                          <img
                            className="nearby-img"
                            src={c.photoUrl}
                            alt={c.name}
                          />
                        )}
                        <div className="nearby-body">
                          <div className="nearby-name">
                            {c.mapsUrl ? (
                              <a
                                href={c.mapsUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {c.name}
                              </a>
                            ) : (
                              c.name
                            )}
                          </div>
                          {c.rating && (
                            <div className="nearby-meta">
                              ★ {c.rating} ({c.total})
                            </div>
                          )}
                          <div className="nearby-addr">{c.vicinity}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 숙소 */}
            <div className="nearby-col">
              <h4>{t("travel.detail.nearby.hotels")}</h4>
              {nearbyLoading ? (
                <div className="nearby-loading">
                  {t("travel.detail.nearby.loading")}
                </div>
              ) : nearbyHotels.length === 0 ? (
                <div className="nearby-empty">
                  {t("travel.detail.nearby.emptyHotel")}
                </div>
              ) : (
                <div className="nearby-list">
                  {nearbyHotels.map((pl, i) => {
                    const c = placeToCard(pl);
                    return (
                      <a
                        key={`h-${i}`}
                        className="nearby-card"
                        href={c.mapsUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        title={c.name}
                      >
                        {c.photoUrl && (
                          <img
                            className="nearby-img"
                            src={c.photoUrl}
                            alt={c.name}
                          />
                        )}
                        <div className="nearby-body">
                          <div className="nearby-name">
                            {c.mapsUrl ? (
                              <a
                                href={c.mapsUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {c.name}
                              </a>
                            ) : (
                              c.name
                            )}
                          </div>
                          {c.rating && (
                            <div className="nearby-meta">
                              ★ {c.rating} ({c.total})
                            </div>
                          )}
                          <div className="nearby-addr">{c.vicinity}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* TOP 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="travel-detail-top-button"
        aria-label={t("travel.detail.top")}
        title={t("travel.detail.top")}
      >
        {t("travel.detail.top")}
      </button>
    </main>
  );
}
