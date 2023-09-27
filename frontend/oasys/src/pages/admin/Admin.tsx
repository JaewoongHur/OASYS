import { Outlet } from "react-router-dom";
import Header from "@components/common/header";

function Admin() {
    return (
        <>
            <Header />
            <div>관리자 페이지</div>
            <Outlet />
        </>
    );
}

export default Admin;
