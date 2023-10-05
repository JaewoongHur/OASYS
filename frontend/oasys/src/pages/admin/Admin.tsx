import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store";
import Header from "@components/common/header";

function Admin() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <>
            <Header />
            {isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />}
            <Outlet />
        </>
    );
}

export default Admin;
