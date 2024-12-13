import App from "./components/App"
import Login from "./pages/login";
import Trending from "./pages/trending";
import Health from "./pages/health";
import Sports from "./pages/sports";
import Technology from "./pages/technology";
import Science from "./pages/science";
import Search from "./components/search";
import Read from "./components/readlater";


const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Trending />,
            },
            {
                path: "health",
                element: <Health />,
            },
            {
                path: "science",
                element: <Science />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "sports",
                element: <Sports />,
            },
            {
                path: "technology",
                element: <Technology />,
            },
            {
                path: "search",
                element: <Search />,
            },
            {
                path: "read",
                element: <Read />,
            },

        ]

    },

];

export default routes;