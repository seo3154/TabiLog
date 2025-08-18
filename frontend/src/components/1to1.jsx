import React, { useState } from "react";

export default function OneToOneForm() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      alert("個人情報に同意してください");
      return;
    }
    const newPost = { title, content, fileName: file ? file.name : "なし" };
    setPosts([newPost, ...posts]);
    // 입력 초기화
    setTitle("");
    setContent("");
    setFile(null);
    setAgree(false);
  };

  return (
    <div>
      <h2>1:1 相談フォーム</h2>
      <hr style={{ border: "1px solid #c2c0c0", width: "80%", margin: "10px auto" }} />

      <div style={{ display: "flex" }}>
        {/* 좌측 탭 */}
        <div
          className="tab-container"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "150px",
            backgroundColor: "#f5f5f5",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            padding: "10px",
          }}
        >
          <div href="CenterPage.jsx" className="tab">全ての投稿</div>
          <div href="CenterPage.jsx" className="tab active">自分の投稿</div>
        </div>

        {/* 중앙 콘텐츠 */}
        <div className="content" style={{ marginLeft: "20px", width: "80%" }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="タイトルを入力してください"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "12px", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>

            <div className="form-group">
              <div className="textarea-wrapper">
                <textarea
                  placeholder="内容を入力してください"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ width: "100%", minHeight: "200px", padding: "12px", fontSize: "14px", boxSizing: "border-box" }}
                />
                <div className="bottom-actions" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", gap: "10px" }}>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  <div className="actions-inline" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <label>個人情報に同意します</label>
                    <button type="submit" style={{ padding: "6px 12px", fontSize: "14px", backgroundColor: "black", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }}>
                      작성하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* 등록된 게시글 리스트 */}
          <div style={{ marginTop: "30px" }}>
            <h3>작성된 게시글</h3>
            {posts.length === 0 && <p>아직 게시글이 없습니다.</p>}
            {posts.map((post, index) => (
              <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                <strong>{post.title}</strong>
                <p>{post.content}</p>
                <p>첨부파일: {post.fileName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
