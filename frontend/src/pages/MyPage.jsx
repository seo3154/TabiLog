import { useState } from "react";
import SideBar from "../components/SideBar"; // 사이드바 컴포넌트 import

const profileImg = "https://placehold.co/120x120";
const nickname = "땃 쥐";
const mbti = "INFP";
const mbtiDesc = [
  "땃쥐가 좋아하는 명바지는 맨스핏지",
  "땃쥐가 최상위에 볼치지",
  "딧쥐가 최상단 본 것지 미",
];

const myPosts = Array(8).fill({ title: "커뮤니티" });
const myBookmarks = Array(8).fill({ title: "북마크" });

export default function MyPage() {
  const [tab, setTab] = useState("myPost");

  return (
    <div className="mypage-container">
      <div className="content-wrapper">
        {/* 기존 aside 대신 SideBar 컴포넌트 사용 */}
        <SideBar
          menuItems={[
            { label: "MY POST", onClick: () => setTab("myPost") },
            { label: "BOOK MARK", onClick: () => setTab("bookmark") },
            { label: "SETTING", onClick: () => setTab("setting") },
          ]}
        />

        <main className="main">
          <section className="profile">
            <img src={profileImg} alt="프로필" className="profile-img" />

            <div className="profile-info">
              <span className="mbti">{mbti}</span>
              <span className="nickname">{nickname}</span>
              <ul className="mbti-desc">
                {mbtiDesc.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
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
