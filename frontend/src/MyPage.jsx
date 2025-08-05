import { useState } from "react";

function MyPage() {
  const profileImg = "https://placehold.co/100x100";
  const nickname = "정청";
  const bio = "신세계, 브라더! 이게 진짜 마이페이지다~";

  const myPosts = [
    { id: 1, title: "첫 여행 후기", date: "2025-08-01" },
    { id: 2, title: "오사카 맛집 추천", date: "2025-08-03" },
  ];

  const myFavorites = [
    { id: 101, title: "도쿄 벚꽃 명소" },
    { id: 102, title: "교토의 가을" },
  ];

  // 탭 상태
  const [tab, setTab] = useState("posts"); // "posts" or "favorites"

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: 20, border: "1px solid #ddd", borderRadius: 12 }}>
      {/* 프로필 섹션 */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <img src={profileImg} alt="프로필" style={{ width: 80, height: 80, borderRadius: "50%", marginRight: 20 }} />
        <div>
          <h2 style={{ margin: 0 }}>{nickname}</h2>
          <p style={{ margin: "8px 0 0" }}>{bio}</p>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => setTab("posts")}
          style={{
            padding: "8px 24px",
            borderRadius: 8,
            border: "none",
            background: tab === "posts" ? "#223" : "#eee",
            color: tab === "posts" ? "#fff" : "#333",
            fontWeight: tab === "posts" ? "bold" : "normal"
          }}
        >
          내가 쓴 글
        </button>
        <button
          onClick={() => setTab("favorites")}
          style={{
            padding: "8px 24px",
            borderRadius: 8,
            border: "none",
            background: tab === "favorites" ? "#223" : "#eee",
            color: tab === "favorites" ? "#fff" : "#333",
            fontWeight: tab === "favorites" ? "bold" : "normal"
          }}
        >
          즐겨찾기한 글
        </button>
      </div>

      {/* 탭 내용 */}
      {tab === "posts" && (
        <section>
          <h3>내가 쓴 게시글</h3>
          <ul>
            {myPosts.map(post => (
              <li key={post.id}>
                <b>{post.title}</b>{" "}
                <span style={{ color: "#888", fontSize: 12 }}>{post.date}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === "favorites" && (
        <section>
          <h3>즐겨찾기한 글</h3>
          <ul>
            {myFavorites.map(fav => (
              <li key={fav.id}>{fav.title}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default MyPage;
