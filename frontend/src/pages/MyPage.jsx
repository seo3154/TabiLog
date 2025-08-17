// src/pages/MyPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import { getUserByLoginId } from "../apis/users";
import places from "../assets/data/places.json";
import mockUser from "../assets/mock/user.admin.json"; // ✅ 파일 분리: 하드코딩 아님
import "../styles/MyPage.css";

const pub = (p) => `${process.env.PUBLIC_URL}${p || ""}`;
const MOCK_UI = String(process.env.REACT_APP_MOCK_UI) === "1";

export default function MyPage() {
  const [loginId] = useState("admin");
  const [tab, setTab] = useState("myPost");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // places id → place 매핑
  const placeIndex = useMemo(() => {
    const map = {};
    for (const p of places) map[p.id] = p;
    return map;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        if (MOCK_UI) {
          // ✅ 모의 UI 모드: 백엔드 호출 안 함
          setUser(mockUser);
          return;
        }

        // 원래 백엔드 호출 흐름
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
      : user.mbtiUrl || "https://placehold.co/120x120";

  // ✅ 북마크: user.bookmarks(from DB dump JSON) → places 매칭
  const myBookmarks = Array.isArray(user.bookmarks)
    ? user.bookmarks
        .map((id) => placeIndex[id])
        .filter(Boolean)
        .map((p) => ({
          id: p.id,
          title: p.name_ko,
          subtitle: p.prefecture,
          image: p?.hero?.image,
          type: "place",
        }))
    : [];

  // 임시 내 글
  const myPosts = Array(8).fill({ title: "커뮤니티" });

  return (
    <div className="mypage-container">
      <div className="content-wrapper">
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
          {tab === "bookmark" && <BookmarkGrid items={myBookmarks} />}
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

function BookmarkGrid({ items = [] }) {
  if (!items.length)
    return <div className="bookmark-empty">북마크가 없습니다.</div>;
  const toPath = (item) =>
    item.type === "place" ? `/place/${item.id}` : `/board/${item.id}`;

  return (
    <section className="bookmark">
      <div className="bookmark-grid" aria-label="북마크">
        {items.map((it) => (
          <Link key={it.id} to={toPath(it)} className="bookmark-link">
            <article className="bookmark-card">
              <img
                src={pub(it.image) || "https://placehold.co/600x400"}
                alt={it.title || "bookmark"}
                className="bookmark-img"
                loading="lazy"
              />
              <div className="bookmark-meta">
                <div className="bookmark-title">{it.title || "제목 없음"}</div>
                {it.subtitle && (
                  <div className="bookmark-sub">{it.subtitle}</div>
                )}
              </div>
            </article>
          </Link>
        ))}
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
