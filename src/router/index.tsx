import {createBrowserRouter, redirect} from "react-router-dom";
import {auth} from "../firebase";

import {Auth} from "../pages/Auth";
import {Home} from "../pages/Home";
import {NotFound} from "../pages/NotFound";
import {Settings} from "../pages/Settings";
import {Layout} from "../layout/Layout";

const loader = () => {
    if (!auth.currentUser) {
        return redirect("/");
    }
    return null;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Auth />,
            },
            {
                path: "home",
                element: <Home />,
                loader,
            },
            {
                path: "settings",
                element: <Settings />,
                loader,
            },
        ],
    },
]);

export default router;
