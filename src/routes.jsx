import App from "./components/App"
import Login from "./pages/login";
import Trending from "./pages/trending";
import Health from "./pages/health";
import Politics from "./pages/politics";
import Sports from "./pages/sports";
import Business from "./pages/business";
import Entertainment from "./pages/entertainment";

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
            {
                path: "/business",
                element: <Business />,
            },
            {
                path: "/entertainment",
                element: <Entertainment />,
            },

        ]

    },

];

export default routes;