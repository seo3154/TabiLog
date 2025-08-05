import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>旅ログ 메인페이지</h1>
      <button onClick={() => navigate("/mypage")}>마이페이지로 이동</button>
    </div>
  );
}

export default MainPage;
