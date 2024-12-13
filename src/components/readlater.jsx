import { useOutletContext } from "react-router-dom"
import { useState } from "react"
import MainContent from "./maincontent"
import Sidebar from "./sidebar"

function Read() {
    const [main, setmain] = useState([])
    const { articles } = useOutletContext()

    function handleAdd(news) {
        setmain(news)
    }

    if (!articles) {
        return <p>empty</p>
    }
    return (
        <>
            <MainContent news={main} />
            <Sidebar onAdd={handleAdd} news={articles} />
        </>
    )
}
export default Read