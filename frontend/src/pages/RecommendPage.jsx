import { useParams, Link } from "react-router-dom";
import places from "../assets/data/places.json";
import "../styles/RecommendPage.css";

export default function RecommendPage() {
  
  const { mbti } = useParams();


  // ✅ MBTI 파라미터가 없을 때 기본값(INFP)으로 고정
  const TARGET_MBTI = (mbti || "INFP").toUpperCase();


  // ✅ mbti 필드가 없거나 대소문자 섞여도 안전하게 필터
  const list = places.filter(
    (p) => Array.isArray(p.mbti) && p.mbti.some((t) => String(t).toUpperCase() === TARGET_MBTI)
  );


  return (
    <main className="recommend-page-main">
      <h1>{TARGET_MBTI} 추천 여행지</h1>

      {/* ✅ 결과 없을 때 안내 */}
      {list.length === 0 ? (
        <p>해당 MBTI에 맞는 추천 여행지가 없습니다.</p>
      ) : (
        <div className="recommend-page-grid">
          {list.map((p) => (
            <Link key={p.id} to={`/place/${p.id}`} className="recommend-page-link">
              <article className="recommend-page-article">
                <img src={p.hero.image} alt={p.name_ko} className="recommend-page-img" />
                <div className="recommend-page-article-div">
                  <div className="recommend-page-name">{p.name_ko}</div>
                  <div className="recommend-page-prefecture">{p.prefecture}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
  
}