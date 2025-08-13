import { useParams, Link } from "react-router-dom";
import places from "../assets/data/places.json";

export default function RecommendPage() {
  const { mbti } = useParams();

  // ✅ MBTI 파라미터가 없을 때 기본값(INFP)으로 고정
  const TARGET_MBTI = (mbti || "INFP").toUpperCase();

  // ✅ mbti 필드가 없거나 대소문자 섞여도 안전하게 필터
  const list = places.filter(
    (p) => Array.isArray(p.mbti) && p.mbti.some((t) => String(t).toUpperCase() === TARGET_MBTI)
  );

  return (
    <main style={{ maxWidth: 1040, margin: "0 auto", padding: 16 }}>
      <h1>{TARGET_MBTI} 추천 여행지</h1>

      {/* ✅ 결과 없을 때 안내 */}
      {list.length === 0 ? (
        <p>해당 MBTI에 맞는 추천 여행지가 없습니다.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
          {list.map((p) => (
            <Link key={p.id} to={`/place/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <article style={{ border: "1px solid #eee", borderRadius: 12, overflow: "hidden" }}>
                <img src={p.hero.image} alt={p.name_ko} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700 }}>{p.name_ko}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{p.prefecture}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}