import { useState, useEffect } from "react"
import MainContent from "../components/maincontent"
import Sidebar from "../components/sidebar"
import { useOutletContext } from "react-router-dom"
import Navbar from "../components/navbar"

function Science() {
  const [news, setnews] = useState([])
  const [main, setmain] = useState([])
  const { onBookmark } = useOutletContext()


  useEffect(() => {
    fetch('https://news-api-rouge.vercel.app/api/get-data?category=science')
      .then(res => res.json())
      .then(result => {
        setnews(result.articles.filter(article => article.urlToImage !== null))
        setmain(result.articles.filter(article => article.urlToImage !== null)[0])
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

export default Science;