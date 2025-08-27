import React, { useState, useEffect } from "react";
<<<<<<< Updated upstream
import { useNavigate } from "react-router-dom";
import image1 from '../assets/MainPagePictures/Group 1.jpg'
import image2 from '../assets/MainPagePictures/Group 2.jpg'
import image3 from '../assets/MainPagePictures/Group 3.jpg'
import image4 from '../assets/MainPagePictures/Group 4.jpg'
import image5 from '../assets/MainPagePictures/Group 5.jpg'
import image6 from '../assets/MainPagePictures/Group 6.jpg'
import image7 from '../assets/MainPagePictures/Group 7.jpg'
import image8 from '../assets/MainPagePictures/Group 8.jpg'
import image9 from '../assets/MainPagePictures/Group 9.jpg'
import image10 from '../assets/MainPagePictures/Group 10.jpg'
import image11 from '../assets/MainPagePictures/Group 11.jpg'
import image12 from '../assets/MainPagePictures/Group 12.jpg'
import image13 from '../assets/MainPagePictures/Group 13.jpg'
import image14 from '../assets/MainPagePictures/Group 14.jpg'
import image15 from '../assets/MainPagePictures/Group 15.jpg'
import image16 from '../assets/MainPagePictures/Group 16.jpg'
import "../style/MainPage.css"

const images = [
  image1, image2, image3, image4,
  image5, image6, image7, image8,
  image9, image10, image11, image12,
  image13, image14, image15, image16
];

// CSS 객체 그대로 유지
const styles = {
  /* 기존 styles 그대로 */
};
=======
<<<<<<< HEAD
import "../style/MainPage.css"; // CSS 연결

const images = [ "Group 1.jpg", "Group 2.jpg", "Group 3.jpg", "Group 4.jpg", "Group 5.jpg",
  "Group 6.jpg", "Group 7.jpg", "Group 8.jpg", "Group 9.jpg", "Group 10.jpg",
  "Group 11.jpg", "Group 12.jpg", "Group 13.jpg", "Group 14.jpg", "Group 15.jpg",
  "Group 16.jpg"
];

=======
import { useNavigate } from "react-router-dom";
import image1 from '../assets/MainPagePictures/Group 1.jpg'
import image2 from '../assets/MainPagePictures/Group 2.jpg'
import image3 from '../assets/MainPagePictures/Group 3.jpg'
import image4 from '../assets/MainPagePictures/Group 4.jpg'
import image5 from '../assets/MainPagePictures/Group 5.jpg'
import image6 from '../assets/MainPagePictures/Group 6.jpg'
import image7 from '../assets/MainPagePictures/Group 7.jpg'
import image8 from '../assets/MainPagePictures/Group 8.jpg'
import image9 from '../assets/MainPagePictures/Group 9.jpg'
import image10 from '../assets/MainPagePictures/Group 10.jpg'
import image11 from '../assets/MainPagePictures/Group 11.jpg'
import image12 from '../assets/MainPagePictures/Group 12.jpg'
import image13 from '../assets/MainPagePictures/Group 13.jpg'
import image14 from '../assets/MainPagePictures/Group 14.jpg'
import image15 from '../assets/MainPagePictures/Group 15.jpg'
import image16 from '../assets/MainPagePictures/Group 16.jpg'
>>>>>>> Stashed changes

const images = [
  image1, image2, image3, image4,
  image5, image6, image7, image8,
  image9, image10, image11, image12,
  image13, image14, image15, image16
];

// CSS 객체 그대로 유지
const styles = {
  /* 기존 styles 그대로 */
};

>>>>>>> 14550462d60426a68e83f5f92a22e5f2111ec2a4
function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [communityPosts, setCommunityPosts] = useState([
    { type: "INFP", content: "여행 가는 게 무서워." },
    { type: "ISTP", content: "여행 같은 건 어찌되어도 좋아." },
    { type: "ENFP", content: "오사카에 가니까 도키도키다" },
    { type: "ESTJ", content: "여러 문화재를 찾아보자!" },
    { type: "INTP", content: "구글 지도로 여행해보았다!" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
<<<<<<< Updated upstream
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
=======
<<<<<<< HEAD
      setCurrentIndex(prev => (prev + 1) % images.length);
=======
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
>>>>>>> 14550462d60426a68e83f5f92a22e5f2111ec2a4
>>>>>>> Stashed changes
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-body">
      {/* 이미지 슬라이더 */}
<<<<<<< Updated upstream
      <div style={{position:"relative",...styles.imageSliderContainer}}>
=======
<<<<<<< HEAD
      <div className="image-slider-container">
=======
      <div style={{position:"relative",...styles.imageSliderContainer}}>
>>>>>>> 14550462d60426a68e83f5f92a22e5f2111ec2a4
>>>>>>> Stashed changes
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
            style={{ objectFit:"cover",width:'100%',position:"absolute",top:"0",left:"0",
              ...styles.imageSliderImage,
             opacity: index === currentIndex ? 1 : 0,
            }}
<<<<<<< Updated upstream
=======
>>>>>>> 14550462d60426a68e83f5f92a22e5f2111ec2a4
>>>>>>> Stashed changes
            alt={`여행 사진 ${index + 1}`}
            style={{ opacity: index === currentIndex ? 1 : 0 }}
          />
        ))}
      </div>

      {/* 공지사항 */}
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
      <table className="notice-table">
        <tbody>
          <tr>
            <td className="notice-header">
              <a href="/NoticePage" className="notice-link">공지사항</a>
            </td>
          </tr>
          <tr>
            <td className="notice-text">
              공지사항입니다.<br />
              남을 비하하는 행위는 멈춰주십쇼.<br />
              중요한 공지사항입니다.<br />
=======
>>>>>>> Stashed changes
      <div style={{position:"relative", top:"600px"}}>
      <table style={styles.noticeTable}>
        <tbody>
          <tr>
            <td style={{ ...styles.noticeTd, ...styles.noticeHeader }}>
              <a href="/NoticePage" style={styles.noticeLink}>
                공지사항
              </a>
            </td>
          </tr>
          <tr>
            <td style={{ ...styles.noticeTd, ...styles.noticeText }}>
              공지사항입니다.
              <br />
              남을 비하하는 행위는 멈춰주십쇼.
              <br />
              중요한 공지사항입니다.
              <br />
<<<<<<< Updated upstream
=======
>>>>>>> 14550462d60426a68e83f5f92a22e5f2111ec2a4
>>>>>>> Stashed changes
              감사합니다.
            </td>
          </tr>
        </tbody>
      </table>

<<<<<<< HEAD
      <h1>WHAT'S YOUR TABI?</h1>
      <div className="content-box">
        <div className="rounded-box">TABI라는 건 무엇인가요?</div>
        <p className="content-p">
          TABI라는 것은 일본어 旅(たび)의 로마자입니다<br /><br />
          자신에게 맞는 여행을 알고<br /><br />
          함께 여행에 대해서 얘기합시다.
        </p>
      </div>
=======
      {/* Tabi 소개 */}
      <h1 style={styles.h1}>WHAT'S YOUR TABI?</h1>
      <div style={styles.contentBox}>
        <div style={styles.roundedBox}>
          <span>TABI라는 건 무엇인가요?</span>
        </div>
        <p style={styles.contentP}>
          TABI라는 것은 일본어 旅(たび)의 로마자입니다
          <br />
          <br />
          자신에게 맞는 여행을 알고
          <br />
          <br />
          함께 여행에 대해서 얘기합시다.
        </p>
      </div>
      <br />
      <br />
<<<<<<< Updated upstream
=======
>>>>>>> 14550462d60426a68e83f5f92a22e5f2111ec2a4
>>>>>>> Stashed changes

      {/* 커뮤니티 테이블 */}
      <div className="rounded-table-container">
        <table className="community-table">
          <tbody>
            {communityPosts.map((post, index) => (
<<<<<<< HEAD
              <tr key={index}>
=======
              <tr
                key={index}
                style={{
                  borderBottom:
                    index !== communityPosts.length - 1
                      ? "1px solid #000"
                      : "none",
                }}
              >
>>>>>>> 14550462d60426a68e83f5f92a22e5f2111ec2a4
                <th>{post.type}</th>
                <th>{post.content}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
<<<<<<< HEAD
      <p><a href="/CommunityPage" className="community-link">최신 커뮤니티의 글을 확인해봅시다!</a></p>
=======
      <p>
        <a href="/CommunityPage" style={styles.communityLink}>
          최신 커뮤니티의 글을 확인해봅시다!
        </a>
      </p>
>>>>>>> 14550462d60426a68e83f5f92a22e5f2111ec2a4
    </div>
    </div>
    </div>
  );
}

export default App;
