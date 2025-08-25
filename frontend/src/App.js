import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import NoticePage from "./pages/NoticePage";
import Header from "./components/Header";
import RecommendPage from "./pages/RecommendPage";
import CommunityPage from "./pages/CommunityPage";
import CommunityWrite from "./components/CommunityWrite";
import TravelDetailPage from "./pages/TravelDetailPage";
import SignIn from "./pages/RegPage";
import Contact from "./pages/CenterPage"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/notice/*" element={<NoticePage />} />
        <Route path="/recommend/*" element={<RecommendPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        <Route path="/place/:id" element={<TravelDetailPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/regpage" element={<SignIn />}/>
        <Route path="/contact" element={<Contact />} />
        {/* 기타 Route 추가 */}
      </Routes>
    </>
  );
}

export default App;
