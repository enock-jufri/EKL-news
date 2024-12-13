
import { useState } from "react";
function MainContent({ news,}) {
 
  return (
    <main className="main-content">
      <article className="featured-news">
        <img src={news.urlToImage} alt={news.title} />
      
        <h2>{news.title}</h2>
        <p>{news.content}</p>
        <a href={news.url}>Read more</a>
      </article>
    </main>
  );
}

export default MainContent;
