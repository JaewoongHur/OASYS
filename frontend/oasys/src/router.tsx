/* Import */
import { RouteObject, createBrowserRouter } from "react-router-dom";

// ----------------------------------------------------------------------------------------------------

/* Data for Router */
const routeList: RouteObject[] = [
    {
        id: "junior",
        path: "/",
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
