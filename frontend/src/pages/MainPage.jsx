import React, { useState, useEffect } from 'react';

const images = [
  "Group 1.jpg", "Group 2.jpg", "Group 3.jpg", "Group 4.jpg", "Group 5.jpg",
  "Group 6.jpg", "Group 7.jpg", "Group 8.jpg", "Group 9.jpg", "Group 10.jpg",
  "Group 11.jpg", "Group 12.jpg", "Group 13.jpg", "Group 14.jpg", "Group 15.jpg",
  "Group 16.jpg"
];

// CSS 객체 그대로 유지
const styles = { /* 기존 styles 그대로 */ };

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 커뮤니티 글 데이터
  const [communityPosts, setCommunityPosts] = useState([
    { type: 'INFP', content: '여행 가는 게 무서워.' },
    { type: 'ISTP', content: '여행 같은 건 어찌되어도 좋아.' },
    { type: 'ENFP', content: '오사카에 가니까 도키도키다' },
    { type: 'ESTJ', content: '여러 문화재를 찾아보자!' },
    { type: 'INTP', content: '구글 지도로 여행해보았다!' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.body}>
      {/* 이미지 슬라이더 */}
      <div style={styles.imageSliderContainer}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            style={{ ...styles.imageSliderImage, opacity: index === currentIndex ? 1 : 0 }}
            alt={`여행 사진 ${index + 1}`}
          />
        ))}
      </div>
      <br /><br />

      {/* 공지사항 */}
      <table style={styles.noticeTable}>
        <tbody>
          <tr>
            <td style={{ ...styles.noticeTd, ...styles.noticeHeader }}>
              <a href="/NoticePage" style={styles.noticeLink}>공지사항</a>
            </td>
          </tr>
          <tr>
            <td style={{ ...styles.noticeTd, ...styles.noticeText }}>
              공지사항입니다.<br />
              남을 비하하는 행위는 멈춰주십쇼.<br />
              중요한 공지사항입니다.<br />
              감사합니다.
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      {/* Tabi 소개 */}
      <h1 style={styles.h1}>WHAT'S YOUR TABI?</h1>
      <div style={styles.contentBox}>
        <div style={styles.roundedBox}>
          <span>TABI라는 건 무엇인가요?</span>
        </div>
        <p style={styles.contentP}>
          TABI라는 것은 일본어 旅(たび)의 로마자입니다<br /><br />
          자신에게 맞는 여행을 알고<br /><br />
          함께 여행에 대해서 얘기합시다.
        </p>
      </div>
      <br /><br />

      {/* 커뮤니티 테이블 - 동적 렌더링 */}
      <div style={styles.roundedTableContainer}>
        <table style={styles.communityTable}>
          <tbody>
            {communityPosts.map((post, index) => (
              <tr
                key={index}
                style={{ borderBottom: index !== communityPosts.length - 1 ? '1px solid #000' : 'none' }}
              >
                <th>{post.type}</th>
                <th style={styles.communityTh}>{post.content}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <a href="/CommunityPage" style={styles.communityLink}>최신 커뮤니티의 글을 확인해봅시다!</a>
      </p>
    </div>
  );
}

export default App;
