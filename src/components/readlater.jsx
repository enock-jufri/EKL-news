import { useOutletContext } from "react-router-dom"
import { useState } from "react"
import MainContent from "./maincontent"
import Sidebar from "./sidebar"

function Read() {
    const { articles} = useOutletContext();
    console.log(articles);
    const [main, setmain] = useState([])

    function handleAdd(news) {
        setmain(news)
    }

    if (!articles) {
        return <p>empty</p>
    }
    return (
        <main className="maincontent">
            <MainContent news={main} />
            <Sidebar onAdd={handleAdd} news={articles} />
        </main>
    )
}
export default Read