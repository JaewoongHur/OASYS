/* Import */
import { Admin, AdminMain, AdminLogin } from "@pages/admin";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "@pages/home";
import Junior from "@pages/junior";
import Senior from "@pages/senior";

// ----------------------------------------------------------------------------------------------------

/* Data for Router */
const routeList: RouteObject[] = [
    {
        id: "home",
        path: "/",
        element: <Home />,
    },
    {
        id: "junior",
        path: "/junior",
        element: <Junior />,
    },
    {
        id: "senior",
        path: "/senior",
        element: <Senior />,
    },
    {
        id: "admin",
        path: "/admin",
        element: <Admin />,
        children: [
            {
                id: "admin-main",
                path: "",
                element: <AdminMain />,
            },
            {
                id: "admin-login",
                path: "login",
                element: <AdminLogin />,
            },
        ],
    },
];

// ----------------------------------------------------------------------------------------------------

/* Router */
const router = createBrowserRouter(routeList);

// ----------------------------------------------------------------------------------------------------

/* Export */
export default router;
