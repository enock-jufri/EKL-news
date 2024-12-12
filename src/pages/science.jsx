import { useState, useEffect } from "react"
import MainContent from "../components/maincontent"
import Sidebar from "../components/sidebar"

function Science() {

  const [news, setnews] = useState([])

  useEffect(() => {
    fetch('https://news-api-rouge.vercel.app/api/get-data?category=science')
      .then(res => res.json())
      .then(result => {
        setnews(result.articles)
        setmain(result.articles[Math.floor(Math.random() * 6)])
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

export default Science;