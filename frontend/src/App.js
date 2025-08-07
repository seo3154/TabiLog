import { BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import './styles/NoticeDetail.css'; 


function App() {
  return (
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
}

export default App;