import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import NoticePage from "./pages/NoticePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mypage" element={<MyPage />} />
      {/* NoticePage에서 중첩 라우팅 처리 */}
      <Route path="/notice/*" element={<NoticePage />} />
    </Routes>
  );
}

export default App;
