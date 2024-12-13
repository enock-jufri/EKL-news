import { useState } from "react";

function Articles({ onAdd, news }) {

    return (
        <>
            {news.map((n, index) => (
                <div key={index} className="side-news" >
                    <img src={n.urlToImage} alt={n.title} className="side-news-image" />
                    <h2 className="side-news-title" onClick={() => onAdd(n)}>{n.title}</h2>
                </div>
            ))}
        </>
    )
}
export default Articles