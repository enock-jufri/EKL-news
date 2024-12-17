import { useState, useEffect } from "react";
import MainContent from "../components/maincontent";
import Sidebar from "../components/sidebar";
import { useOutletContext } from "react-router-dom"
import Navbar from "../components/navbar";


function Sports() {
  const [news, setnews] = useState([])
  const [main, setmain] = useState([])
  const { onBookmark } = useOutletContext()

  useEffect(() => {
    fetch('https://news-api-rouge.vercel.app/api/get-data?category=sports')
      .then(res => res.json())
      .then(result => {
        setnews(result.articles)
        setmain(result.articles[Math.floor(Math.random() * 11)])
      })
  }, [])


  function handleAdd(news) {
    setmain(news)
  }

  return (
    <>
     <div className="category">
        <Navbar />
      </div>
      <h2 className="categorytitle">Science</h2>
      <main className="maincontent">
        <MainContent news={main} onBookmark={onBookmark} />
        <Sidebar onAdd={handleAdd} news={news} />
      </main>
    </>
  );
};

export default Sports;