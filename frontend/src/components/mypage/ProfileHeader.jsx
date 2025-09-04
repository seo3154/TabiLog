import { PLACEHOLDER, getProfileImgs } from "../../utils/profile";

export default function ProfileHeader({ user, onEditProfile, onEditMbti }) {
  const { mbtiImg, userImg } = getProfileImgs(user || {});
  const profileSrc = mbtiImg || userImg || PLACEHOLDER;

  return (
    <section className="profile">
      <div className="avatar">
        <img
          src={profileSrc}
          alt="프로필"
          className={`avatar-img ${
            user.mbtiName ? "avatar--mbti" : "avatar--user"
          }`}
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
        <button className="edit-btn" onClick={onEditProfile}>
          프로필 수정
        </button>
        <button className="edit-btn" onClick={onEditMbti}>
          MBTI 수정
        </button>
      </div>
    </section>
  );
}
