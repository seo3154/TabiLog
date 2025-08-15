import { useParams } from "react-router-dom";
import places from "../assets/data/places.json";
import "../styles/TravelDetailPage.css";

const pub = (p) => `${process.env.PUBLIC_URL}${p}`;

export default function TravelDetailPage() {
  const { id } = useParams();
  const place = places.find(p => String(p.id) === String(id));

  if (!place) return <main className="travel-detail-main-not-found">존재하지 않는 장소입니다.</main>;

  return (
    <main>
      {/* Hero */}
      <header className="travel-detail-header">
        <img src={pub(place.hero.image)} alt={place.name_ko} className="travel-detail-header-img" />
        <div className="travel-detail-header-div">
          <h1 className="travel-detail-h1">{place.name_ko}</h1>
          <p className="travel-detail-p">{place.prefecture} / {place.hero.subtitle}</p>
        </div>
      </header>

      {/* 소개 */}
      <section className="travel-detail-intro-section">
        <p>{place.intro.summary}</p>
        {place.intro.detail && <p>{place.intro.detail}</p>}
      </section>

      {/* 갤러리 */}
      {place.gallery?.length > 0 && (
        <div className="travel-detail-gallery-div">
          {place.gallery.map((src, i) => (
            <img key={i} src={pub(src)} alt={`${place.name_ko}-${i}`} className="travel-detail-gallery-img" />
          ))}
        </div>
      )}

      {/* 추가 소개 */}
      <section className="travel-detail-extraintro-section">
        <p>{place.extraintro.summary}</p>
        {place.extraintro.detail && <p>{place.extraintro.detail}</p>}
      </section>

      {/* 추가 갤러리 */}
      {place.extragallery?.length > 0 && (
        <div className="travel-detail-extragallery-div">
          {place.extragallery.map((src, i) => (
            <img key={i} src={pub(src)} alt={`${place.name_ko}-${i}`} className="travel-detail-extragallery-img" />
          ))}
        </div>
      )}

      {/* 먹거리 */}
      {place.foods?.length > 0 && (
        <section className="travel-detail-foods-section">
          <h3>지역 먹거리</h3>
          <div className="travel-detail-foods-div">
            {place.foods.map((f, i) => (
              <article key={i} className="travel-detail-foods-article">
                <img src={pub(f.image)} alt={f.name} className="travel-detail-foods-img" />
                <div className="travel-detail-foods-name">{f.name}</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 지도 */}
      {place.map?.embedUrl && (
        <div className="travel-detail-map-div">
          <iframe src={place.map.embedUrl} width="100%" height="420" className="travel-detail-map-iframe" loading="lazy" allowFullScreen title="map"></iframe>
        </div>
      )}

      {/* 주변 */}
      {[["주변 식당", place.nearbyRestaurants], ["주변 호텔", place.nearbyHotels]].map(([title, items], idx) => (
        items?.length > 0 && (
          <section key={idx} className="travel-detail-nearby-section">
            <h3>{title}</h3>
            <div className="travel-detail-nearby-div">
              {items.map((it, i) => (
                <article key={i} className="travel-detail-nearby-article">
                  <img src={pub(it.image)} alt={it.name} className="travel-detail-nearby-img" />
                  <div className="travel-detail-nearby-name">{it.name}</div>
                </article>
              ))}
            </div>
          </section>
        )
      ))}

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