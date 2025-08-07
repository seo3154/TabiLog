import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import NoticePage from "./pages/NoticePage";
import Header from "./components/Header";

// ... 기타 페이지

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/notice/*" element={<NoticePage />} />
        {/* 기타 Route 추가 */}
      </Routes>
    </>
  );
}

export default App;
