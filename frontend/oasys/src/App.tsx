/* Import */
import router from "@/router";
import { RouterProvider } from "react-router-dom";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Style */
const MainContainer = styled("div")`
    // Size Attribute
    width: 100%;
    height: 100vh;
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
