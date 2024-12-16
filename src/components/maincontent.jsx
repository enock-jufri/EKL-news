
function MainContent({ news, onBookmark}) {

  function toggleLike(n) {
    onBookmark(n)
  }


  return (
    <main className="main-content">
      <article className="featured-news">
        <img src={news.urlToImage} alt={news.title} />
        <button className="bookmark-button" onClick={()=>toggleLike(news)}>
          <div className="bookmark-icon"></div>
          <span className="bookmark-text">Bookmark</span>
        </button>
        <h2>{news.title}</h2>
        <p>{news.content}</p>
        <a id="link" href={news.url}>Read more</a>

      </article>
    </main>
  );
}

export default MainContent;
