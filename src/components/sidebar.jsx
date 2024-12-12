
function Sidebar({ onAdd, news }) {


  if (!news) {
    return <p>empty</p>
  }
  return (
    <aside className="sidebar">
      {news.map((n, index) => (
        <div key={index} className="side-news" >
          <img src={n.urlToImage} alt={n.title} className="side-news-image" />
          <h2 className="side-news-title" onClick={() => onAdd(n)}>{n.title}</h2>
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
