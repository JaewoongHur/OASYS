/* Import */
import { Outlet } from "react-router-dom";
import Header from "@components/common/header";
import { useAuthStore } from "@/store";
import { useEffect } from "react";
import useRouter from "@hooks/useRouter";

// ----------------------------------------------------------------------------------------------------

/* Admin Page */
function Admin() {
    const isAuth = useAuthStore((state) => state.isAuth);
    const { routeTo } = useRouter();

    useEffect(() => {
        if (isAuth) {
            routeTo("/admin/main");
        } else {
            routeTo("/admin");
        }
    }, [isAuth, routeTo]);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Admin;
