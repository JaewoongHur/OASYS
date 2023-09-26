/* Import */
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Admin, AdminMain, AdminLogin } from "@pages/admin";
import Home from "@pages/home";
import { Senior, SeniorHome, SeniorPhone } from "@pages/senior";
import Junior from "@pages/junior";
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
        children: [
            {
                id: "senior-home",
                path: "",
                element: <SeniorHome />,
            },
            {
                id: "senior-phone",
                path: "phone",
                element: <SeniorPhone />,
            },
        ],
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
