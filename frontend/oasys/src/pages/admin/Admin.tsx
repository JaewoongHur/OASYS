import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store";
import Header from "@components/common/header";

function Admin() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    console.log(isAuthenticated);
    return (
        <>
            <Header />
            {isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />}
        </>
    );
}

export default Admin;
