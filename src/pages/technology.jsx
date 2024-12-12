import { useState,useEffect } from "react"
import MainContent from "../components/maincontent"
import Sidebar from "../components/sidebar"

function Technology() {
 
  const [news, setnews] = useState([])

  useEffect(() => {
    fetch('https://news-api-rouge.vercel.app/api/get-data?category=Technology')
      .then(res => res.json())
      .then(result => {
        setnews(result.articles)
        setmain(result.articles[Math.floor(Math.random() * 11)])
      })
  }, [])
  

  const[main,setmain]=useState([])

  function handleAdd(news){
    setmain(news)
  }

  return (
    <>
      <main className="maincontent">
        <MainContent news={main} initial={news[0]}/>
        <Sidebar onAdd={handleAdd} news={news}/>
      </main>
    </>
  );
};

  export default Technology;