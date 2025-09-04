import { Link } from "react-router-dom";

export default function BoardList({ title, items = [] }) {
  if (!items.length) {
    return (
      <section className="mp-board">
        <h3 className="mp-board__title">{title}</h3>
        <div className="mp-board__empty">아직 작성한 글이 없습니다.</div>
      </section>
    );
  }

  return (
    <section className="mp-board">
      <h3 className="mp-board__title">{title}</h3>

      <div className="mp-board__grid" aria-label={title}>
        {items.map((item) => (
          <article key={item.id} className="mp-board__card">
            <header className="mp-board__card-header">
              <h4 className="mp-board__card-title" title={item.title}>
                {item.title}
              </h4>
              <time className="mp-board__card-date">{item.createdAt}</time>
            </header>

            {item.snippet && (
              <p className="mp-board__card-snippet">{item.snippet}</p>
            )}

            <div className="mp-board__card-meta">
              <span className="badge">♥ {item.likes}</span>
              <span className="badge">💬 {item.comments}</span>
              <Link className="mp-board__card-link" to={`/board/${item.id}`}>
                자세히
              </Link>
            </div>
          </article>
        ))}
      </div>

      <nav className="mp-pagination" aria-label="페이지">
        <button className="mp-page mp-page--chevron" aria-label="이전 페이지">
          &lt;
        </button>
        <button className="mp-page mp-page--active">1</button>
        <button className="mp-page">2</button>
        <button className="mp-page">3</button>
        <button className="mp-page mp-page--chevron" aria-label="다음 페이지">
          &gt;
        </button>
      </nav>
    </section>
  );
}
