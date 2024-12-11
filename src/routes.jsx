import App from "./components/App"
import Login from "./pages/login";
import Trending from "./pages/trending";
import Health from "./pages/health";
import Politics from "./pages/politics";
import Sports from "./pages/sports";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Trending />,
            },
            {
                path: "/health",
                element: <Health />,
            },
            {
                path: "/politics",
                element: <Politics />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/sports",
                element: <Sports />,
            },

        ]

    },

];

export default routes;