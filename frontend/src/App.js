import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./MyPage";
import MainPage from "./MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
// Commit Test SYG
export default App;
