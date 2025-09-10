import { useEffect, useMemo, useState } from "react";
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
import { readBookmarks } from "../utils/bookmarks";
import { syncUserToHeader } from "../utils/profile";
import {
  ProfileHeader,
  BoardList,
  BookmarkGrid,
  SettingMenu,
  AccountInfoModal,
} from "../components/mypage";
import { useTranslation } from "react-i18next"; // ✅ 추가

const MOCK_UI = String(process.env.REACT_APP_MOCK_UI) === "1";

export default function MyPage() {
  const { t, i18n } = useTranslation(); // ✅
  // ✅ 로그인한 사용자 정보 localStorage에서 불러오기
  const me = JSON.parse(localStorage.getItem("tabilog.user"));
  const loginId = me?.loginId || "";

  const [tab, setTab] = useState("myPost");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [bookmarkSlugs, setBookmarkSlugs] = useState([]);

  // 모달 상태
  const [showAccount, setShowAccount] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditMbti, setShowEditMbti] = useState(false);

  useEffect(() => {
    document.title = t("mypage.title");
    document.documentElement.lang = i18n.resolvedLanguage || "ja";
  }, [t, i18n.resolvedLanguage]);

  // places id → place 매핑
  const placeIndex = useMemo(() => {
    const map = {};
    for (const p of places) map[p.id] = p;
    return map;
  }, []);

  // 유저 로드
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (MOCK_UI) {
          setUser(mockUser);
          // ✅ 일부 필드만 로컬 저장
          window.localStorage.setItem(
            "tabilog.user",
            JSON.stringify({
              loginId: mockUser.loginId,
              nickname: mockUser.nickname,
              mbtiName: mockUser.mbtiName || "",
              mbtiUrl: mockUser.mbtiUrl || "",
            })
          );

          // ✅ 헤더 동기화
          syncUserToHeader({
            loginId: mockUser.loginId,
            nickname: mockUser.nickname,
            mbtiName: mockUser.mbtiName || "",
            mbtiUrl: mockUser.mbtiUrl || "",
          });

          setBookmarkSlugs(readBookmarks(mockUser.loginId));
          return;
        }

        const data = await getUserByLoginId(loginId); // apis/users 파일
        setUser(data);
        window.localStorage.setItem(
          "tabilog.user",
          JSON.stringify({
            loginId: data.loginId,
            nickname: data.nickname,
            mbtiName: data.mbtiName || "",
            mbtiUrl: data.mbtiUrl || "",
          })
        );

        // ✅ 헤더 동기화
        syncUserToHeader({
          loginId: data.loginId,
          nickname: data.nickname,
          mbtiName: data.mbtiName || "",
          mbtiUrl: data.mbtiUrl || "",
        });

        setBookmarkSlugs(readBookmarks(loginId));
      } catch (e) {
        setErr(e?.message || "FETCH_FAIL"); // ✅ 키워드로 저장
        window.localStorage.removeItem("tabilog.user");
      } finally {
        setLoading(false);
      }
    })();
  }, [loginId]);

  // 북마크 실시간 반영
  useEffect(() => {
    const onBM = (e) => {
      const who = e?.detail?.loginId;
      if (!who || who !== loginId) return;
      setBookmarkSlugs(e.detail.slugs || []);
    };
    window.addEventListener("tabilog:bookmarks-updated", onBM);
    return () => window.removeEventListener("tabilog:bookmarks-updated", onBM);
  }, [loginId]);

  // 사이드바 메뉴 (언어 바뀌면 라벨도 갱신)
  const menuItems = useMemo(
    () => [
      { key: "myPost", label: t("mypage.tabs.myPost") },
      { key: "bookmark", label: t("mypage.tabs.bookmark") },
      { key: "setting", label: t("mypage.tabs.setting") },
    ],
    [t]
  );

  if (loading)
    return <div className="mypage__loading">{t("mypage.loading")}</div>;

  if (err) {
    const msg = err === "FETCH_FAIL" ? t("common.fetchFail") : err;
    return (
      <div className="mypage__error">
        {t("mypage.error")}: {msg}
      </div>
    );
  }

  if (!user) return <div className="mypage__empty">{t("mypage.empty")}</div>;

  // ✅ 북마크 id → 카드 데이터 변환
  const myBookmarks = bookmarkSlugs
    .map((slug) => placeIndex[slug])
    .filter(Boolean)
    .map((p) => ({
      id: p.id,
      title: p.name_ko, // 데이터 구조상 ko만 있는 경우 유지
      subtitle: p.prefecture,
      image: p?.hero?.image,
      type: "place",
    }));

  // TODO: 실제 내 글 API 연동 전 임시
  const myPosts = Array.from({ length: 8 }).map((_, i) => ({
    id: `dummy-${i + 1}`,
    title: `커뮤니티 글 ${i + 1}`, // 더 진행 시 여기 키로 바꿔도 됨
    snippet: "여행에 관한 두서없는 잡담 한 스푼.",
    createdAt: "2025-08-15",
    likes: Math.floor(Math.random() * 20),
    comments: Math.floor(Math.random() * 10),
  }));

  // ===== 저장 핸들러 =====
  async function handleSaveProfile(form) {
    try {
      if (MOCK_UI) {
        setUser((prev) => ({ ...prev, ...form }));
        syncUserToHeader({
          nickname: form.nickname ?? user.nickname,
          mbtiName: (form.mbtiName ?? user.mbtiName) || "",
          mbtiUrl: (form.mbtiUrl ?? user.mbtiUrl) || "",
        });
        setShowEditProfile(false);
        return;
      }
      const updated = await updateUserProfile(loginId, form);
      setUser((prev) => ({ ...prev, ...updated }));
      syncUserToHeader({
        nickname: updated.nickname ?? user.nickname,
        mbtiName: (updated.mbtiName ?? user.mbtiName) || "",
        mbtiUrl: (updated.mbtiUrl ?? user.mbtiUrl) || "",
      });
      setShowEditProfile(false);
    } catch (e) {
      alert(e?.message || t("mypage.alert.profileSaveFail")); // ✅
    }
  }

  async function handleSaveMbti(newMbti) {
    try {
      if (MOCK_UI) {
        setUser((prev) => ({ ...prev, mbtiName: newMbti }));
        syncUserToHeader({
          nickname: user.nickname,
          mbtiName: newMbti || "",
          mbtiUrl: user.mbtiUrl || "",
        });
        setShowEditMbti(false);
        return;
      }
      const updated = await updateUserMbti(loginId, newMbti);
      setUser((prev) => ({ ...prev, ...updated }));
      syncUserToHeader({
        nickname: updated.nickname ?? user.nickname,
        mbtiName: (updated.mbtiName ?? newMbti) || "",
        mbtiUrl: (updated.mbtiUrl ?? user.mbtiUrl) || "",
      });
      setShowEditMbti(false);
    } catch (e) {
      alert(e?.message || t("mypage.alert.mbtiSaveFail")); // ✅
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
          <ProfileHeader
            user={user}
            onEditProfile={() => setShowEditProfile(true)}
            onEditMbti={() => setShowEditMbti(true)}
          />

          <hr className="divider" />

          {tab === "myPost" && (
            <BoardList title={t("mypage.board.community")} items={myPosts} />
          )}
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
