import { useParams } from "react-router-dom";
import places from "../assets/data/places.json";

export default function TravelDetailPage() {
  const { id } = useParams();
  const place = places.find(p => p.id === "");

  if (!place) return <main style={{ padding: 24 }}>존재하지 않는 장소입니다.</main>;

  return (
    <main>
      {/* Hero */}
      <header style={{ position: "relative" }}>
        <img src={place.hero.image} alt={place.name_ko} style={{ width: "100%", height: 360, objectFit: "cover" }} />
        <div style={{ position: "absolute", left: 24, bottom: 24, color: "#fff", textShadow: "0 2px 6px rgba(0,0,0,.4)" }}>
          <h1 style={{ margin: 0 }}>{place.name_ko}</h1>
          <p style={{ margin: 0 }}>{place.prefecture} / {place.hero.subtitle}</p>
        </div>
      </header>

      {/* 소개 */}
      <section style={{ maxWidth: 1040, margin: "48px auto", padding: "0 16px", lineHeight: 1.8 }}>
        <p>{place.intro.summary}</p>
        {place.intro.detail && <p>{place.intro.detail}</p>}
      </section>

      {/* 갤러리 */}
      {place.gallery?.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12, maxWidth: 1200, margin: "32px auto", padding: "0 16px" }}>
          {place.gallery.map((src, i) => (
            <img key={i} src={src} alt={`${place.name_ko}-${i}`} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }} />
          ))}
        </div>
      )}

      {/* 먹거리 */}
      {place.foods?.length > 0 && (
        <section style={{ maxWidth: 1040, margin: "48px auto", padding: "0 16px" }}>
          <h3>지역 먹거리</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
            {place.foods.map((f, i) => (
              <article key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
                <img src={f.image} alt={f.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }} />
                <div style={{ marginTop: 8, fontWeight: 600 }}>{f.name}</div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 지도 */}
      {place.map?.embedUrl && (
        <div style={{ maxWidth: 1200, margin: "48px auto", padding: "0 16px" }}>
          <iframe src={place.map.embedUrl} width="100%" height="420" style={{ border: 0, borderRadius: 8 }} loading="lazy" allowFullScreen title="map"></iframe>
        </div>
      )}

      {/* 주변 */}
      {[["주변 식당", place.nearbyRestaurants], ["주변 호텔", place.nearbyHotels]].map(([title, items], idx) => (
        items?.length > 0 && (
          <section key={idx} style={{ maxWidth: 1040, margin: "48px auto", padding: "0 16px" }}>
            <h3>{title}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
              {items.map((it, i) => (
                <article key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
                  <img src={it.image} alt={it.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }} />
                  <div style={{ marginTop: 8, fontWeight: 600 }}>{it.name}</div>
                </article>
              ))}
            </div>
          </section>
        )
      ))}

      {/* TOP 버튼 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ position: "fixed", right: 24, bottom: 24, borderRadius: "50%", width: 56, height: 56 }}
      >
        TOP
      </button>
    </main>
  );
}