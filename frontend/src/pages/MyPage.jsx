// src/pages/MyPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import {
  getUserByLoginId,
  updateUserProfile,
  updateUserMbti,
} from "../apis/users";
import places from "../assets/data/places.json";
import ProfileModify from "../components/ProfileModify";
import MbtiModify from "../components/MbtiModify";
import mockUser from "../assets/mock/user.admin.json";
import "../styles/MyPage.css";

const pub = (p) => `${process.env.PUBLIC_URL}${p || ""}`;
const MOCK_UI = String(process.env.REACT_APP_MOCK_UI) === "1";
const PLACEHOLDER = "https://placehold.co/120x120";

/** MBTI/유저 이미지 우선순위로 프로필 이미지 결정 */
function getProfileImgs(user) {
  const mbti = user?.mbtiName ? String(user.mbtiName).toUpperCase() : "";
  const mbtiImg = mbti ? pub(`/MbtiProfileImg/${mbti}.png`) : null;

  const raw = user?.mbtiUrl || "";
  const userImg = raw && raw.startsWith("http") ? raw : raw ? pub(raw) : null;

  return { mbtiImg, userImg };
}

export default function MyPage() {
  // TODO: 로그인 연동되면 'admin' 대신 스토어/쿠키에서 가져오기
  const [loginId] = useState("admin");

  const [tab, setTab] = useState("myPost");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // 모달 상태
  const [showAccount, setShowAccount] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditMbti, setShowEditMbti] = useState(false);

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
          setUser(mockUser);
          return;
        }
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

  // ✅ 프로필 이미지: MBTI 이미지 > 유저 URL > 플레이스홀더
  const { mbtiImg, userImg } = getProfileImgs(user || {});
  const profileSrc = mbtiImg || userImg || PLACEHOLDER;

  // ✅ 북마크: user.bookmarks → places 매칭
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

  // TODO: 실제 내 글 API 연동 전 임시
  const myPosts = Array(8).fill({ title: "커뮤니티" });

  // ===== 저장 핸들러 =====
  async function handleSaveProfile(form) {
    try {
      if (MOCK_UI) {
        setUser((prev) => ({ ...prev, ...form }));
        setShowEditProfile(false);
        return;
      }
      const updated = await updateUserProfile(loginId, form);
      setUser((prev) => ({ ...prev, ...updated }));
      setShowEditProfile(false);
    } catch (e) {
      alert(e?.message || "프로필 저장 실패");
    }
  }

  async function handleSaveMbti(newMbti) {
    try {
      if (MOCK_UI) {
        setUser((prev) => ({ ...prev, mbtiName: newMbti }));
        setShowEditMbti(false);
        return;
      }
      const updated = await updateUserMbti(loginId, newMbti);
      setUser((prev) => ({ ...prev, ...updated }));
      setShowEditMbti(false);
    } catch (e) {
      alert(e?.message || "MBTI 저장 실패");
    }
  }

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
            <div className="avatar">
              <img
                src={profileSrc}
                alt="프로필"
                className="avatar-img"
                style={{
                  objectFit: user.mbtiName ? "contain" : "cover",
                  backgroundColor: user.mbtiName ? "#fff" : "transparent",
                }}
              />
            </div>

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
              <button
                className="edit-btn"
                onClick={() => setShowEditProfile(true)}
              >
                프로필 수정
              </button>
              <button
                className="edit-btn"
                onClick={() => setShowEditMbti(true)}
              >
                MBTI 수정
              </button>
            </div>
          </section>

          <hr className="divider" />

          {tab === "myPost" && <BoardList title="커뮤니티" items={myPosts} />}
          {tab === "bookmark" && <BookmarkGrid items={myBookmarks} />}
          {tab === "setting" && (
            <SettingMenu onOpenAccount={() => setShowAccount(true)} />
          )}
        </main>
      </div>

      {/* 계정 정보 모달 */}
      {showAccount && (
        <AccountInfoModal user={user} onClose={() => setShowAccount(false)} />
      )}

      {/* 프로필/MBTI 수정 모달 */}
      {showEditProfile && (
        <ProfileModify
          user={user}
          onClose={() => setShowEditProfile(false)}
          onSave={handleSaveProfile}
        />
      )}
      {showEditMbti && (
        <MbtiModify
          current={user.mbtiName || ""}
          onClose={() => setShowEditMbti(false)}
          onSave={handleSaveMbti}
        />
      )}
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

/** 세팅 카드: onOpenAccount 콜백 받아서 모달 오픈 */
function SettingMenu({ onOpenAccount = () => {} }) {
  return (
    <section className="setting-menu">
      <button
        type="button"
        className="setting-card setting-card--button"
        onClick={onOpenAccount}
      >
        계정 정보
      </button>
      <div className="setting-card">신고</div>
      <div className="setting-card">고객센터</div>
    </section>
  );
}

/** 계정 정보 모달 */
function AccountInfoModal({ user, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="account-modal-title">계정 정보</h2>
          <button className="modal-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-row">
            <span className="modal-key">로그인ID</span>
            <span className="modal-val">{user.loginId || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">닉네임</span>
            <span className="modal-val">{user.nickname || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">이메일</span>
            <span className="modal-val">{user.email || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">전화</span>
            <span className="modal-val">{user.tel || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">MBTI</span>
            <span className="modal-val">{user.mbtiName || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">권한</span>
            <span className="modal-val">{user.role || "USER"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">가입일</span>
            <span className="modal-val">{user.createdAt || "-"}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">최근 로그인</span>
            <span className="modal-val">{user.lastLoginAt || "-"}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="edit-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
