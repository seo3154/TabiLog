import React from "react";

export default function OneToOneForm() {
  return (
    <div>
      <h2>1:1 相談フォーム</h2>
      <hr style={{ border: "1px solid #c2c0c0", width: "80%", margin: "10px auto" }} />

      {/* 좌측 탭 */}
      <div className="tab-container">
        <div className="tab" id="tab-all">全ての投稿</div>
        <div className="tab active" id="tab-mine">自分の投稿</div>
      </div>

      {/* 중앙 콘텐츠 */}
      <div className="content">
        <form>
          <div className="form-group">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="タイトルを入力してください"
            />
          </div>

          <div className="form-group">
            <div className="textarea-wrapper">
              <textarea
                id="content"
                name="content"
                placeholder="内容を入力してください"
                rows={10}
              ></textarea>
              <div className="bottom-actions">
                <input type="file" id="file" name="file" />
                <div className="actions-inline">
                  <input type="checkbox" id="agree" name="agree" />
                  <label htmlFor="agree">個人情報に同意します</label>
                  <button type="submit" className="submit-btn">
                    작성하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 스타일 */}
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
        }
        .tab-container {
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 100px;
          width: 150px;
          background-color: #f5f5f5;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          padding: 10px;
        }
        .tab {
          padding: 10px 5px;
          text-align: center;
          margin-bottom: 5px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }
        .tab.active {
          background-color: #ddd;
          font-weight: bold;
        }
        .content {
          margin-left: 170px;
          width: 80%;
        }
        .form-group {
          margin-bottom: 15px;
        }
        input[type="text"],
        textarea {
          width: 100%;
          padding: 12px;
          box-sizing: border-box;
          font-size: 14px;
        }
        textarea {
          min-height: 400px;
          resize: vertical;
        }
        .textarea-wrapper {
          position: relative;
        }
        .bottom-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          gap: 10px;
        }
        input[type="file"] {
          display: block;
        }
        .actions-inline {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .submit-btn {
          padding: 6px 12px;
          font-size: 14px;
          background-color: black;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
