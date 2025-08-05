import { useState } from "react";

// 프로필, 탭, 리스트 등 기본 더미 데이터
const profileImg = "https://placehold.co/120x120";
const nickname = "땃 쥐";
const mbti = "INFP";
const mbtiDesc = [
  "딧쥐가 좋아하는 명바지는 맨스핏지",
  "딧쥐가 최상위에 볼치지",
  "딧쥐가 최상단 본 것지 미"
];

const myPosts = Array(8).fill({ title: "커뮤니티" });
const myBookmarks = Array(8).fill({ title: "북마크" });

export default function MyPage() {
  const [tab, setTab] = useState("myPost"); // 탭 상태

  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      border: "3px solid #222",
      fontFamily: "Pretendard, sans-serif"
    }}>
      {/* 상단 네비 */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "24px 48px 0 36px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src="/logo192.png" alt="TABiLOG" style={{ width: 36, height: 36 }} />
          <span style={{ fontWeight: "bold", fontSize: 22, letterSpacing: 1 }}>TABiLOG</span>
        </div>
        <nav style={{ display: "flex", gap: 54, fontWeight: 700, fontSize: 20 }}>
          <span>공지사항</span>
          <span>커뮤니티</span>
          <span>추천</span>
          <span>문의</span>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontWeight: 500, fontSize: 15 }}>딧쥐님, 반갑습니다!</span>
          <button style={{
            background: "#222", color: "#fff", fontWeight: 700,
            padding: "6px 18px", borderRadius: 16, border: "none", fontSize: 15, cursor: "pointer"
          }}>로그아웃</button>
        </div>
      </header>

      {/* 메인 컨텐츠 래퍼 */}
      <div style={{ display: "flex", alignItems: "flex-start", marginTop: 32 }}>
        {/* 좌측 탭 네비 */}
        <aside style={{
          minWidth: 100, width: 120, background: "#f5f5f5", borderRadius: "20px 0 0 20px",
          padding: "36px 0", marginLeft: 16, height: 450, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 26
        }}>
          <TabButton text="MY POST" selected={tab === "myPost"} onClick={() => setTab("myPost")} />
          <TabButton text="BOOK MARK" selected={tab === "bookmark"} onClick={() => setTab("bookmark")} />
          <div style={{
            width: "60%", borderTop: "1.5px solid #bbb", margin: "20px 0"
          }} />
          <TabButton text="SETTING" selected={tab === "setting"} onClick={() => setTab("setting")} />
        </aside>

        {/* 본문 */}
        <main style={{
          flex: 1, marginLeft: 42, marginRight: 32
        }}>
          {/* 프로필 + MBTI */}
          <section style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <img src={profileImg} alt="프로필" style={{ width: 120, height: 120, borderRadius: "50%" }} />
            <div>
              <span style={{ fontWeight: 700, fontSize: 32 }}>{mbti}</span>
              <span style={{ fontWeight: 900, fontSize: 36, marginLeft: 16 }}>{nickname}</span>
              <ul style={{ margin: "12px 0 0 0", padding: 0, listStyle: "none", color: "#555", fontSize: 16 }}>
                {mbtiDesc.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
              <button style={editBtnStyle}>프로필 수정</button>
              <button style={editBtnStyle}>MBTI 수정</button>
            </div>
          </section>

          <hr style={{ margin: "36px 0 20px", borderColor: "#bbb" }} />

          {/* 탭별 본문 */}
          {tab === "myPost" && (
            <BoardList title="커뮤니티" items={myPosts} />
          )}
          {tab === "bookmark" && (
            <BoardList title="북마크" items={myBookmarks} />
          )}
          {tab === "setting" && (
            <SettingMenu />
          )}
        </main>
      </div>
    </div>
  );
}

function TabButton({ text, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 100, padding: "10px 0",
        background: selected ? "#fff" : "#f5f5f5",
        border: selected ? "2.5px solid #222" : "none",
        borderRadius: 10,
        fontWeight: selected ? 700 : 400,
        fontSize: 15,
        color: "#222",
        cursor: "pointer"
      }}
    >{text}</button>
  );
}

function BoardList({ title, items }) {
  return (
    <section style={{ marginTop: 18 }}>
      <div style={{
        border: "2px solid #222", borderRadius: 13, padding: "0 0 0 0", background: "#fff"
      }}>
        {items.map((item, idx) => (
          <div key={idx} style={{
            padding: "18px 28px", borderBottom: idx === items.length - 1 ? "none" : "1.5px solid #bbb",
            fontSize: 18, fontWeight: 500, letterSpacing: 1
          }}>
            {item.title}
          </div>
        ))}
      </div>
      {/* 하단 페이징 */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 16, margin: "36px 0 0 0", fontSize: 20
      }}>
        <span style={{ cursor: "pointer" }}>&lt;</span>
        <span style={{ fontWeight: 700, textDecoration: "underline" }}>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span style={{ cursor: "pointer" }}>&gt;</span>
      </div>
    </section>
  );
}

function SettingMenu() {
  return (
    <section style={{
      display: "flex", justifyContent: "center", gap: 36, marginTop: 18
    }}>
      <div style={settingCardStyle}>계정 정보</div>
      <div style={settingCardStyle}>신고</div>
      <div style={settingCardStyle}>고객센터</div>
    </section>
  );
}

// 버튼/카드 스타일
const editBtnStyle = {
  border: "1.5px solid #222",
  borderRadius: 8,
  padding: "8px 20px",
  background: "#fff",
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer"
};

const settingCardStyle = {
  border: "1.5px solid #bbb",
  borderRadius: 10,
  padding: "36px 36px",
  width: 130,
  textAlign: "center",
  fontSize: 18,
  background: "#f9f9f9",
  fontWeight: 600
};
