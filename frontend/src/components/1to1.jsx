import React, { useState } from "react";

export default function OneToOneForm() {
  const [activeTab, setActiveTab] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    content: "",
    image: null
  });
  const [submittedPosts, setSubmittedPosts] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      // 이미지 파일 선택 시
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prev) => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedPosts([...submittedPosts, { ...formData, date: new Date().toISOString().slice(0,10), status:"未対応" }]);
    setFormData({ name: "", email: "", title: "", content: "", image: null });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>1:1 相談フォーム</h2>

      <div style={{ display: "flex", marginTop: "20px" }}>
        {/* 좌측 탭 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          width: "150px",
          backgroundColor: "#f5f5f5",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          padding: "10px",
          position: "fixed",
          left: 0,
          top: "100px"
        }}>
          <div
            onClick={() => setActiveTab("all")}
            style={{
              padding: "10px 5px",
              textAlign: "center",
              marginBottom: "5px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: activeTab === "all" ? "#ddd" : "transparent",
              fontWeight: activeTab === "all" ? "bold" : "normal"
            }}
          >
            全ての投稿
          </div>
          <div
            onClick={() => setActiveTab("mine")}
            style={{
              padding: "10px 5px",
              textAlign: "center",
              marginBottom: "5px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: activeTab === "mine" ? "#ddd" : "transparent",
              fontWeight: activeTab === "mine" ? "bold" : "normal"
            }}
          >
            自分の投稿
          </div>
        </div>

        {/* 오른쪽 컨텐츠 */}
        <div style={{ width: "80%", margin: "0 auto", paddingLeft: "150px" }}>
          {/* 폼 */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "30px" }}>
            <label>名前</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>メールアドレス</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange} required />

            <label>タイトル</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />

            <label>内容</label>
            <textarea name="content" value={formData.content} onChange={handleChange} required />

            <label>画像添付 (jpg, png)</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            {formData.image && <img src={formData.image} alt="プレビュー" style={{ maxWidth:"200px", marginTop:"10px" }} />}

            <button type="submit">送信</button>
          </form>

          {/* 작성글 게시판 */}
          {submittedPosts.length > 0 && (
            <div style={{ marginTop:"40px" }}>
              <h2>投稿一覧</h2>
              <table style={{ width:"100%", borderCollapse:"collapse", marginTop:"20px" }}>
                <thead>
                  <tr>
                    <th>名前</th>
                    <th>タイトル</th>
                    <th>状態</th>
                    <th>日付</th>
                    <th>画像</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedPosts.map((post, idx) => (
                    <tr key={idx}>
                      <td>{post.name}</td>
                      <td>{post.title}</td>
                      <td>{post.status}</td>
                      <td>{post.date}</td>
                      <td>{post.image ? <img src={post.image} alt="投稿画像" style={{ maxWidth:"100px" }} /> : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
