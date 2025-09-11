import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import NoticePage from "./pages/NoticePage";
import Header from "./components/Header";
import RecommendPage from "./pages/RecommendPage";
import CommunityPage from "./pages/CommunityPage";
import CommunityBoard from "./components/CommunityBoard";
import CommunityWrite from "./components/CommunityWrite";
import CommunityPost from "./components/CommunityPost";
import TravelDetailPage from "./pages/TravelDetailPage";
import Login from "./pages/LoginPage";
import SignIn from "./pages/RegPage";
import Contact from "./pages/CenterPage";
import Footer from "./components/Footer";
import "./styles/App.css";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/notice/*" element={<NoticePage />} />
          <Route path="/recommend/*" element={<RecommendPage />} />
          <Route path="/community/*" element={<CommunityPage />} />
          <Route path="/community/write" element={<CommunityWrite />} />
          <Route path="/community/post/:id" element={<CommunityPost />} />
          <Route path="/place/:id" element={<TravelDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regpage" element={<SignIn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
      <LanguageSwitcher/>
    </div>
  );
}


export default App;
