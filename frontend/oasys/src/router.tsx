/* Import */
import { Admin, AdminMain, AdminLogin } from "@pages/admin";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "@pages/home";
import Junior from "@pages/junior";
import Senior from "@pages/senior";
import Test1 from "./pages/home/Test1";

// ----------------------------------------------------------------------------------------------------

/* Data for Router */
const routeList: RouteObject[] = [
    {
        id: "home",
        path: "/",
        element: <Home />,
    },
    {
        id: "test",
        path: "/test",
        element: <Test1 />,
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
];

// ----------------------------------------------------------------------------------------------------

/* Router */
const router = createBrowserRouter(routeList);

// ----------------------------------------------------------------------------------------------------

/* Export */
export default router;
