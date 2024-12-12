import { useState, useEffect } from "react";
import MainContent from "./maincontent";
import Sidebar from "./sidebar";

function Search() {
    const [news, setnews] = useState([])
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (query) {
            fetch(`https://news-api-rouge.vercel.app/api/get-data?query=${query}`)
                .then((response) => response.json())
                .then((data) => setnews(data.articles || []))
                .catch((error) => console.error("Error fetching news:", error));
        }
    }, [query]);

    const [main, setmain] = useState([])

    function handleAdd(news) {
        setmain(news)
    }
    function handleSearch(e) {
        e.preventDefault()
        setQuery(e.target.children[0].value)
    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="search..." id="search"></input>
                <input type="submit" value="search" id="button"/>
            </form>
            <main className="maincontent">
                <MainContent news={main} />
                <Sidebar onAdd={handleAdd} news={news} />
            </main>

        </>
    )
}
export default Search