import { Outlet } from "react-router-dom";

function Admin() {
    return (
        <div>
            관리자 페이지
            <Outlet />
        </div>
    );
}

export default Admin;
