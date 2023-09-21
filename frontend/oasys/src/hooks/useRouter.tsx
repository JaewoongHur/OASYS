/* Import */
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RouterFuncType } from "@customTypes/routerTypes";

// ----------------------------------------------------------------------------------------------------

/* Router Hook */
function useRouter(): RouterFuncType {
    const navigate = useNavigate();
    const routeTo = useCallback(
        (path: string) => {
            navigate(path);
        },
        [navigate],
    );
    return { routeTo };
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default useRouter;
