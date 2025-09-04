export default function SettingMenu({ onOpenAccount = () => {} }) {
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
