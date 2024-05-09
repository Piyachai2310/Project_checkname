import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import App from '../page/App'
import Storename from "../page/Storename";
import Day from "../page/day";
import Eveing from "../page/Eveing";

const router = createBrowserRouter([
    {
        path: "/" ,
        element: <Home /> ,
        children: [
            {
                path: "" ,
                element: <Day />
            },
            {
                path: "/storename" ,
                element: <Storename />
            },
            {
                path: "/app" ,
                element: <App />
            },
            {
                path: "/eveing" ,
                element: <Eveing />
            }
        ]
    }
])

export default router