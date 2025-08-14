// src/pages/MyPage.jsx
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { getUserByLoginId } from "../apis/users";
import "../styles/MyPage.css";

export default function MyPage() {
  // TODO: 로그인 연동되면 'admin' 대신 스토어/쿠키에서 가져오기
  const [loginId] = useState("admin");

  const [tab, setTab] = useState("myPost");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getUserByLoginId(loginId);
        setUser(data);
      } catch (e) {
        setErr(e?.message || "불러오기 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, [loginId]);

  const menuItems = [
    { key: "myPost", label: "MY POST" },
    { key: "bookmark", label: "BOOK MARK" },
    { key: "setting", label: "SETTING" },
  ];

  if (loading) return <div className="mypage__loading">불러오는 중…</div>;
  if (err) return <div className="mypage__error">에러: {err}</div>;
  if (!user) return <div className="mypage__empty">데이터 없음</div>;

  const profileImg =
    user.mbtiUrl && user.mbtiUrl.startsWith("http")
      ? user.mbtiUrl
      : user.mbtiUrl || "https://placehold.co/120x120"; // 백엔드가 /img/... 주면 public에 매핑해도 됨

  // TODO: 실제 내 글/북마크 API 붙이기 전 임시
  const myPosts = Array(8).fill({ title: "커뮤니티" });
  const myBookmarks = Array(8).fill({ title: "북마크" });

  return (
    <div className="mypage-container">
      <div className="content-wrapper">
        {/* 사이드바 */}
        <SideBar
          menuItems={menuItems.map((m) => ({
            label: m.label,
            onClick: () => setTab(m.key),
            className:
              "tab-button" + (tab === m.key ? " tab-button--selected" : ""),
          }))}
        />

        <main className="main">
          {/* 프로필 */}
          <section className="profile">
            <img src={profileImg} alt="프로필" className="profile-img" />

            <div className="profile-info">
              <span className="mbti">{user.mbtiName || "-"}</span>
              <span className="nickname">{user.nickname}</span>
              <ul className="mbti-desc">
                {/* 추후 백엔드에서 MBTI 설명 내려주면 여기 바인딩 */}
                <li>{user.introText || "소개가 없습니다."}</li>
                <li>이메일: {user.email}</li>
                <li>전화: {user.tel || "-"}</li>
              </ul>
            </div>

            <div className="actions">
              <button className="edit-btn">프로필 수정</button>
              <button className="edit-btn">MBTI 수정</button>
            </div>
          </section>

          <hr className="divider" />

          {tab === "myPost" && <BoardList title="커뮤니티" items={myPosts} />}
          {tab === "bookmark" && (
            <BoardList title="북마크" items={myBookmarks} />
          )}
          {tab === "setting" && <SettingMenu />}
        </main>
      </div>
    </div>
  );
}

function BoardList({ title, items }) {
  return (
    <section className="board">
      <div className="board-box" aria-label={title}>
        {items.map((item, idx) => (
          <div key={idx} className="board-item">
            {item.title}
          </div>
        ))}
      </div>

      <div className="pagination">
        <span className="page page--chevron">&lt;</span>
        <span className="page page--active">1</span>
        <span className="page">2</span>
        <span className="page">3</span>
        <span className="page">4</span>
        <span className="page">5</span>
        <span className="page page--chevron">&gt;</span>
      </div>
    </section>
  );
}

function SettingMenu() {
  return (
    <section className="setting-menu">
      <div className="setting-card">계정 정보</div>
      <div className="setting-card">신고</div>
      <div className="setting-card">고객센터</div>
    </section>
  );
}
