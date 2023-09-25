/* Import */
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Admin, AdminMain, AdminLogin } from "@pages/admin";
import Home from "@pages/home";
import { Senior, SeniorHome, SeniorPhone, SeniorTalk } from "@pages/senior";
import Junior from "@pages/junior";

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
            {
                id: "senior-talk",
                path: "talk",
                element: <SeniorTalk />,
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
