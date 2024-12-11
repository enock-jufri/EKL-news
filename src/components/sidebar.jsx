import React from "react";

function Sidebar() {
  const newsItems = [
    {
      image: "https://viso.ai/wp-content/uploads/2024/05/cover-tesla-bot.jpg",
      title: "Tesla's Fast-Selling Toy Bot Is Back",
    },
    {
      image: "https://www.shutterstock.com/image-photo/paris-france-june-16-2023-260nw-2318800323.jpg",
      title: "Elon Musk's rumoured $100m donation...",
    },
    {
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTJR-u0PuRUCRsC8LbwPcwQ-DCUKmDEn3oJmHkkrjO4DsC_-uBAyjxOpOK9xcuGaWzvC1HFb1M5oCjPuZssK63fQg",
      title: "Martin Scorsese suggests regret...",
    },
  ];

  return (
    <aside className="sidebar">
      {newsItems.map((item, index) => (
        <div key={index} className="side-news">
          <img src={item.image} alt={item.title} className="side-news-image" />
          <h3 className="side-news-title">{item.title}</h3>
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
