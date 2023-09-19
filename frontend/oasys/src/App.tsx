/* Import */
import router from "@/router";
import { RouterProvider } from "react-router-dom";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Style */
const MainContainer = styled("div")`
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* App Component */
function App() {
    return (
        <MainContainer>
            <RouterProvider router={router} />
        </MainContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default App;
