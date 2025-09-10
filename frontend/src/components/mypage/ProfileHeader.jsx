import { PLACEHOLDER, getProfileImgs } from "../../utils/profile";
import { useTranslation } from "react-i18next";

export default function ProfileHeader({ user, onEditProfile, onEditMbti }) {
  const { t } = useTranslation();
  const { mbtiImg, userImg } = getProfileImgs(user || {});
  const profileSrc = mbtiImg || userImg || PLACEHOLDER;

  return (
    <section className="profile">
      <div className="avatar">
        <img
          src={profileSrc}
          alt={t("profile.alt")}
          className={`avatar-img ${
            user.mbtiName ? "avatar--mbti" : "avatar--user"
          }`}
        />
      </div>

      <div className="profile-info">
        <span className="mbti">{user.mbtiName || "-"}</span>
        <span className="nickname">{user.nickname}</span>
        <ul className="mbti-desc">
          <li>{user.introText || t("profile.noIntro")}</li>
          <li>
            {t("profile.email")}: {user.email}
          </li>
          <li>
            {t("profile.tel")}: {user.tel || "-"}
          </li>
        </ul>
      </div>

      <div className="actions">
        <button className="edit-btn" onClick={onEditProfile}>
          {t("profile.editProfile")}
        </button>
        <button className="edit-btn" onClick={onEditMbti}>
          {t("profile.editMbti")}
        </button>
      </div>
    </section>
  );
}
