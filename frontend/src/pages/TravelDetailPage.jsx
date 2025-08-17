import { useParams } from "react-router-dom";
import places from "../assets/data/places.json";
import "../styles/TravelDetailPage.css";

// public 경로 헬퍼
const pub = (p) => `${process.env.PUBLIC_URL}${p || ""}`;

export default function TravelDetailPage() {
  const { id } = useParams();
  const place = places.find((p) => String(p.id) === String(id));

  if (!place) {
    console.warn("해당 id를 찾을 수 없습니다:", id);
    return (
      <main className="travel-detail-main-not-found">
        존재하지 않는 장소입니다.
      </main>
    );
  }

  // 기본 데이터
  const heroImg   = place?.hero?.image ?? "";
  const subtitle  = [place?.prefecture, place?.hero?.subtitle].filter(Boolean).join(" / ");

  // Intro(기본) — 병합 없음
  const introSummary = place?.intro?.summary || "소개 정보가 준비중입니다.";
  const introDetail  = place?.intro?.detail  || "";

  // Extra Intro — 있을 때만 독립 섹션으로
  const hasExtraIntro = !!(place?.extraintro?.summary || place?.extraintro?.detail);
  const extraSummary  = place?.extraintro?.summary || "";
  const extraDetail   = place?.extraintro?.detail  || "";

  // Galleries — 병합 없음
  const gallery       = Array.isArray(place?.gallery) ? place.gallery : [];
  const extraGallery  = Array.isArray(place?.extragallery) ? place.extragallery : [];

  // 기타
  const foods      = Array.isArray(place?.foods) ? place.foods : [];
  const nearRest   = Array.isArray(place?.nearbyRestaurants) ? place.nearbyRestaurants : [];
  const nearHotels = Array.isArray(place?.nearbyHotels) ? place.nearbyHotels : [];
  const mapUrl     = place?.map?.embedUrl || "";

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

      {/* 추가 소개 (Extra Intro) — Intro와 별개로 독립 섹션 */}
      {hasExtraIntro && (
        <section className="travel-detail-intro-section travel-detail-intro-extra">
          {extraSummary && <p>{extraSummary}</p>}
          {extraDetail && <p>{extraDetail}</p>}
        </section>
      )}

      {/* 추가 갤러리 (Extra Gallery) — 갤러리와 별개로 독립 섹션 */}
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

      {/* 지도 */}
      {!!mapUrl && (
        <div className="travel-detail-map-div">
          <iframe
            src={mapUrl}
            width="100%"
            height="420"
            className="travel-detail-map-iframe"
            loading="lazy"
            allowFullScreen
            title="map"
          />
        </div>
      )}

      {/* 주변 (식당/호텔) */}
      {[["주변 식당", nearRest], ["주변 호텔", nearHotels]].map(
        ([title, items], idx) =>
          items.length > 0 && (
            <section key={idx} className="travel-detail-nearby-section">
              <h3>{title}</h3>
              <div className="travel-detail-nearby-div">
                {items.map((it, i) => (
                  <article key={i} className="travel-detail-nearby-article">
                    {it?.image && (
                      <img
                        src={pub(it.image)}
                        alt={it?.name || ""}
                        className="travel-detail-nearby-img"
                      />
                    )}
                    <div className="travel-detail-nearby-name">
                      {it?.name || ""}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )
      )}

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