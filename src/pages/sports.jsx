import { useState, useEffect } from "react";
import MainContent from "../components/maincontent";
import Sidebar from "../components/sidebar";

function Sports() {
  const [news, setnews] = useState([])

  useEffect(() => {
    fetch('https://news-api-rouge.vercel.app/api/get-data?category=sports')
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setnews(result.articles)
        setmain(result.articles[Math.floor(Math.random() * 11)])
      })
  }, [])

  const [main, setmain] = useState([])
  console.log(main)

  function handleAdd(news) {
    setmain(news)
  }

  return (
    <>
      <main className="maincontent">
        <MainContent news={main} />
        <Sidebar onAdd={handleAdd} news={news} />
      </main>
    </>
  );
};

export default Sports;