import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 32 }}>
      <h1>旅ログ 메인페이지</h1>
      <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
        <button
          onClick={() => navigate("/mypage")}
          style={{ padding: "12px 32px", fontSize: 18, cursor: "pointer" }}
        >
          마이페이지로 이동
        </button>
      </div>
    </div>
  );
}

export default MainPage;
