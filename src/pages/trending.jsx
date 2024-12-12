import { useState, useEffect } from "react";
import MainContent from "../components/maincontent";
import Sidebar from "../components/sidebar";
function Trending() {
  const [news, setnews] = useState([])
  const [main, setmain] = useState([])
  const onLike = useOutletContext()

  useEffect(() => {
    fetch('https://news-api-rouge.vercel.app/api/get-data?category=general')
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setmain(result.articles[Math.floor(Math.random() * 6)])
        setnews(result.articles)
      })
  }, [])

  function handleAdd(news) {
    setmain(news)
  }

  return (
    <>
      <main className="maincontent">
        <MainContent news={main} onLike={onLike} />
        <Sidebar onAdd={handleAdd} news={news} />
      </main>
    </>
  );
};

export default Trending;