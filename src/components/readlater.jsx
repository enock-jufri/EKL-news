import { useOutletContext } from "react-router-dom"

function Read() {
    const [main, setmain] = useState([])
    const { articles } = useOutletContext()

    function handleAdd(news) {
        setmain(news)
    }
    return (
        <>
            <MainContent news={main} />
            <Sidebar onAdd={handleAdd} news={articles} />
        </>
    )
}
export default Read