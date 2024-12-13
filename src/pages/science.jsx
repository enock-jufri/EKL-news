import { useState, useEffect } from "react"
import MainContent from "../components/maincontent"
import Sidebar from "../components/sidebar"
import { useOutletContext } from "react-router-dom"

function Science() {
  const [news, setnews] = useState([])
  const [main, setmain] = useState([])
  const { onBookmark } = useOutletContext()


  useEffect(() => {
    fetch('https://news-api-rouge.vercel.app/api/get-data?category=science')
      .then(res => res.json())
      .then(result => {
        setnews(result.articles)
        setmain(result.articles[Math.floor(Math.random() * 6)])
      })
  }, [])

  function handleAdd(news) {
    setmain(news)
  }

  return (
    <>
      <main className="maincontent">
        <MainContent news={main} onBookmark={onBookmark} />
        <Sidebar onAdd={handleAdd} news={news} />
      </main>
    </>
  );
};

export default Science;