/* Import */
import { Admin, AdminMain, AdminLogin } from "@pages/admin";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import ErrorNotFound from "@pages/error";
import Home from "@pages/home";
import Junior from "@pages/junior";
import Senior from "@pages/senior";

// ----------------------------------------------------------------------------------------------------

/* Data for Router */
const routeList: RouteObject[] = [
    {
        id: "home",
        path: "/home",
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
        path: "",
        element: <Admin />,
        children: [
            {
                id: "admin-login",
                path: "",
                element: <AdminLogin />,
            },
            {
                id: "admin-main",
                path: "main",
                element: <AdminMain />,
            },
        ],
    },
    {
        id: "error-not-found",
        path: "/*",
        element: <ErrorNotFound />,
    },
];

// ----------------------------------------------------------------------------------------------------

/* Router */
const router = createBrowserRouter(routeList);

// ----------------------------------------------------------------------------------------------------

/* Export */
export default router;
