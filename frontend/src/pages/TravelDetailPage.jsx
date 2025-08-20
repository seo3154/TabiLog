import { useParams } from "react-router-dom";
import places from "../assets/data/places.json";
import "../styles/TravelDetailPage.css";
import { useEffect, useRef, useState } from "react";

// public 경로 헬퍼
const pub = (p) => `${process.env.PUBLIC_URL}${p || ""}`;

// Google Maps API 키 (Vite/CRA 모두 지원)
const GMAPS_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GOOGLE_MAPS_API_KEY) ||
  process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
  "";

// 스크립트 로더(중복 로드 방지)
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

  // ===== Hook은 항상 상단에서 고정 호출 =====
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState("");
  const [loadingMap, setLoadingMap] = useState(!!GMAPS_KEY);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [nearbyHotels, setNearbyHotels] = useState([]);

  const center =
    place && typeof place?.map?.lat === "number" && typeof place?.map?.lng === "number"
      ? { lat: place.map.lat, lng: place.map.lng }
      : null;

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
                if (status === g.places.PlacesServiceStatus.OK && Array.isArray(results)) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // place가 없는 경우
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
  const subtitle = [place?.prefecture, place?.hero?.subtitle].filter(Boolean).join(" / ");

  // Intro(기본) — 병합 없음
  const introSummary = place?.intro?.summary || "소개 정보가 준비중입니다.";
  const introDetail = place?.intro?.detail || "";

  // Extra Intro — 있을 때만 독립 섹션으로
  const hasExtraIntro = !!(place?.extraintro?.summary || place?.extraintro?.detail);
  const extraSummary = place?.extraintro?.summary || "";
  const extraDetail = place?.extraintro?.detail || "";

  // Galleries — 병합 없음
  const gallery = Array.isArray(place?.gallery) ? place.gallery : [];
  const extraGallery = Array.isArray(place?.extragallery) ? place.extragallery : [];

  // 음식
  const foods = Array.isArray(place?.foods) ? place.foods : [];

  // Google Places 카드 변환
  const placeToCard = (pl) => {
    const name = pl.name || "이름 미상";
    const rating = typeof pl.rating === "number" ? pl.rating.toFixed(1) : null;
    const total = pl.user_ratings_total;
    const photoUrl = pl.photos?.[0]?.getUrl?.({ maxWidth: 1200, maxHeight: 800 });
    const placeId = pl.place_id;
    const mapsUrl = placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : null;
    const vicinity = pl.vicinity || pl.formatted_address || "";
    const openNow = pl.opening_hours?.isOpen?.() ?? pl.opening_hours?.open_now;
    return { name, rating, total, photoUrl, mapsUrl, vicinity, openNow };
  };

  return (
    <main>
      {/* Hero */}
      <section className="travel-hero">
        {!!heroImg && (
          <img
            src={pub(heroImg)}
            alt={place.name_ko}
            className="travel-hero-img"
          />
        )}
      </section>

      {/* 제목/부제 */}
      <section className="travel-title">
        <h1 className="travel-title-h1">{place.name_ko}</h1>
        {subtitle && <p className="travel-title-sub">{subtitle}</p>}
      </section>

      {/* 소개 (Intro) */}
      {(introSummary || introDetail) && (
        <section className="travel-detail-intro-section">
          {introSummary && <p>{introSummary}</p>}
          {introDetail && <p>{introDetail}</p>}
        </section>
      )}

      {/* 갤러리 */}
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

      {/* 추가 소개 (Extra Intro) */}
      {hasExtraIntro && (
        <section className="travel-detail-intro-section travel-detail-intro-extra">
          {extraSummary && <p>{extraSummary}</p>}
          {extraDetail && <p>{extraDetail}</p>}
        </section>
      )}

      {/* 추가 갤러리 */}
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

      {/* 지역 먹거리 */}
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
                <div className="travel-detail-foods-name">
                  {f?.name || ""}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ===== Google 지도 + 주변 추천 (카드 스타일을 기존과 동일하게) ===== */}
      {GMAPS_KEY && (
        <section className="gmaps-section">
          <h3>지도 & 주변 추천</h3>

          {/* 지도: 래퍼 + 오버레이(형제 요소) */}
          <div className="gmaps-map-wrap">
            <div className="gmaps-map" ref={mapRef} />
            {loadingMap && <div className="gmaps-overlay">지도를 불러오는 중…</div>}
            {mapError && <div className="gmaps-error">{mapError}</div>}
          </div>

          {/* 가까운 레스토랑 — 기존 '주변' 섹션 카드 스타일 재사용 */}
          <section className="travel-detail-nearby-section">
            <h3>가까운 레스토랑</h3>
            {nearbyLoading && !mapError && <div className="nearby-loading">불러오는 중…</div>}
            {!nearbyLoading && nearbyRestaurants.length === 0 && !mapError && (
              <div className="nearby-empty">표시할 레스토랑이 없습니다.</div>
            )}
            <div className="travel-detail-nearby-div">
              {nearbyRestaurants.map((pl, i) => {
                const it = placeToCard(pl);
                return (
                  <article key={`r-${i}`} className="travel-detail-nearby-article">
                    {it.photoUrl && (
                      <img
                        src={it.photoUrl}
                        alt={it.name}
                        className="travel-detail-nearby-img"
                        loading="lazy"
                      />
                    )}
                    <div className="travel-detail-nearby-name">
                      {it.mapsUrl ? (
                        <a href={it.mapsUrl} target="_blank" rel="noreferrer">
                          {it.name}
                        </a>
                      ) : it.name}
                    </div>
                    {/* 선택: 메타 정보(평점/영업중/주소)를 아래에 간단히 표시 */}
                    <div className="nearby-meta" style={{ padding: "0 16px 16px" }}>
                      {it.rating ? `★ ${it.rating}` : "평점 정보 없음"}
                      {typeof it.total === "number" ? ` · 리뷰 ${it.total}건` : ""}
                      {typeof it.openNow === "boolean" ? ` · ${it.openNow ? "영업 중" : "영업 종료"}` : ""}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* 가까운 호텔 — 기존 '주변' 섹션 카드 스타일 재사용 */}
          <section className="travel-detail-nearby-section">
            <h3>가까운 호텔</h3>
            {nearbyLoading && !mapError && <div className="nearby-loading">불러오는 중…</div>}
            {!nearbyLoading && nearbyHotels.length === 0 && !mapError && (
              <div className="nearby-empty">표시할 호텔이 없습니다.</div>
            )}
            <div className="travel-detail-nearby-div">
              {nearbyHotels.map((pl, i) => {
                const it = placeToCard(pl);
                return (
                  <article key={`h-${i}`} className="travel-detail-nearby-article">
                    {it.photoUrl && (
                      <img
                        src={it.photoUrl}
                        alt={it.name}
                        className="travel-detail-nearby-img"
                        loading="lazy"
                      />
                    )}
                    <div className="travel-detail-nearby-name">
                      {it.mapsUrl ? (
                        <a href={it.mapsUrl} target="_blank" rel="noreferrer">
                          {it.name}
                        </a>
                      ) : it.name}
                    </div>
                    <div className="nearby-meta" style={{ padding: "0 16px 16px" }}>
                      {it.rating ? `★ ${it.rating}` : "평점 정보 없음"}
                      {typeof it.total === "number" ? ` · 리뷰 ${it.total}건` : ""}
                      {typeof it.openNow === "boolean" ? ` · ${it.openNow ? "영업 중" : "영업 종료"}` : ""}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </section>
      )}

      {/* JSON 정적 '주변 식당/주변 호텔' 섹션은 제거했습니다. */}

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