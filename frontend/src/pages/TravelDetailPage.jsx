import { useParams } from "react-router-dom";
import places from "../assets/data/places.json";
import "../styles/TravelDetailPage.css";
import { useEffect, useRef, useState } from "react";
import {
  isBookmarked as isBM,
  toggleBookmark as toggleBM,
} from "../utils/bookmarks";

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
function loadGoogleMaps() {
  if (window.google?.maps) return Promise.resolve();
  if (gmapsLoadingPromise) return gmapsLoadingPromise;
  if (!GMAPS_KEY) return Promise.resolve();
  gmapsLoadingPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_KEY}&libraries=places&language=ko`;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return gmapsLoadingPromise;
}

export default function TravelDetailPage() {
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
        setMapError("이 장소에는 좌표 정보가 없어 지도를 표시할 수 없습니다.");
        setLoadingMap(false);
        return;
      }
      if (!GMAPS_KEY) {
        setMapError("Google Maps API 키가 설정되지 않았습니다.");
        setLoadingMap(false);
        return;
      }

      try {
        await loadGoogleMaps();
        if (cancelled) return;

        const g = window.google.maps;
        const map = new g.Map(mapRef.current, {
          center,
          zoom: place?.map?.zoom ?? 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        new g.Marker({ position: center, map, title: place?.name_ko || "" });
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
          setMapError("지도를 불러오는 중 오류가 발생했습니다.");
          setLoadingMap(false);
          setNearbyLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]); // id 변경 시만 재실행

  // 존재하지 않는 장소
  if (!place) {
    console.warn("해당 id를 찾을 수 없습니다:", id);
    return (
      <main className="travel-detail-main-not-found">
        존재하지 않는 장소입니다.
      </main>
    );
  }

  // 기본 데이터
  const heroImg = place?.hero?.image ?? "";
  const subtitle = [place?.prefecture, place?.hero?.subtitle]
    .filter(Boolean)
    .join(" / ");

  const introSummary = place?.intro?.summary || "소개 정보가 준비중입니다.";
  const introDetail = place?.intro?.detail || "";

  const hasExtraIntro = !!(
    place?.extraintro?.summary || place?.extraintro?.detail
  );
  const extraSummary = place?.extraintro?.summary || "";
  const extraDetail = place?.extraintro?.detail || "";

  const gallery = Array.isArray(place?.gallery) ? place.gallery : [];
  const extraGallery = Array.isArray(place?.extragallery)
    ? place.extragallery
    : [];
  const foods = Array.isArray(place?.foods) ? place.foods : [];

  // 주변 장소 카드 변환
  const placeToCard = (pl) => {
    const name = pl.name || "이름 미상";
    const rating = typeof pl.rating === "number" ? pl.rating.toFixed(1) : null;
    const total = pl.user_ratings_total;
    const photoUrl = pl.photos?.[0]?.getUrl?.({ maxWidth: 1200, maxHeight: 800 });
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
            alt={place.name_ko}
            className="travel-hero-img"
          />
        )}
      </section>

      {/* ===== 제목/부제 + 북마크 ===== */}
      <section className="travel-title">
        <div className="travel-title-header">
          <h1 className="travel-title-h1">{place.name_ko}</h1>
          <button
            className={`bookmark-btn ${bookmarked ? "active" : ""}`}
            onClick={toggleBookmark}
            aria-label="북마크"
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
              alt={`${place.name_ko}-gallery-${i}`}
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
              alt={`${place.name_ko}-extragallery-${i}`}
              className="travel-detail-gallery-img"
            />
          ))}
        </div>
      )}

      {/* ===== 지역 먹거리 ===== */}
      {foods.length > 0 && (
        <section className="travel-detail-foods-section">
          <h3>지역 먹거리</h3>
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

      {/* ===== [CHANGED] 지도 & 주변 추천 — 여러분 CSS(.gmaps- / .nearby-)에 맞춰 렌더 ===== */}
      <section className="gmaps-section">
        <h3>지도</h3>

        {/* 지도 래퍼(겹치기 컨테이너) */}
        <div className="gmaps-map-wrap">
          {/* 실제 지도 div (반드시 ref 필요) */}
          {!mapError && <div ref={mapRef} className="gmaps-map" aria-label="지도" />}

          {/* 로딩 오버레이 */}
          {!mapError && loadingMap && (
            <div className="gmaps-overlay">지도를 불러오는 중…</div>
          )}

          {/* 에러 오버레이 */}
          {mapError && <div className="gmaps-error">{mapError}</div>}
        </div>

        {/* 주변 추천 2-컬럼 (식당/숙소) */}
        {!mapError && !loadingMap && (
          <div className="nearby-wrap">
            {/* 식당 */}
            <div className="nearby-col">
              <h4>주변 식당</h4>
              {nearbyLoading ? (
                <div className="nearby-loading">불러오는 중…</div>
              ) : nearbyRestaurants.length === 0 ? (
                <div className="nearby-empty">표시할 식당이 없습니다.</div>
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
                          <img className="nearby-img" src={c.photoUrl} alt={c.name} />
                        )}
                        <div className="nearby-body">
                          <div className="nearby-name">
                            {c.mapsUrl ? <a href={c.mapsUrl} target="_blank" rel="noreferrer">{c.name}</a> : c.name}
                          </div>
                          {c.rating && (
                            <div className="nearby-meta">★ {c.rating} ({c.total})</div>
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
              <h4>주변 숙소</h4>
              {nearbyLoading ? (
                <div className="nearby-loading">불러오는 중…</div>
              ) : nearbyHotels.length === 0 ? (
                <div className="nearby-empty">표시할 숙소가 없습니다.</div>
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
                          <img className="nearby-img" src={c.photoUrl} alt={c.name} />
                        )}
                        <div className="nearby-body">
                          <div className="nearby-name">
                            {c.mapsUrl ? <a href={c.mapsUrl} target="_blank" rel="noreferrer">{c.name}</a> : c.name}
                          </div>
                          {c.rating && (
                            <div className="nearby-meta">★ {c.rating} ({c.total})</div>
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
      >
        TOP
      </button>
    </main>
  );
}
