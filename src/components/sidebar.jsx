
import { useState } from "react";
function Sidebar({ onAdd, news,onLike }) {

  // const [liked, setLiked] = useState(false);

  // const toggleLike = () => {
  //   setLiked(!liked)
  //   if (!liked) {
  //     onLike(news)
  //   }
  // };
  return (
    <aside className="sidebar">
      {news.map((n, index) => (
        <div key={index} className="side-news" >
          <img src={n.urlToImage} alt={n.title} className="side-news-image" />
          <h2 className="side-news-title" onClick={() => onAdd(n)}>{n.title}</h2>
          {/* <button id="like-button" onClick={toggleLike}>
          {liked ? "❤️" : "🖤"}
        </button> */}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
