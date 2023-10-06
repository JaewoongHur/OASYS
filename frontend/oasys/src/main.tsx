/* Import */
import App from "@/App";
import { Global, ThemeProvider } from "@emotion/react";
import globalStyles from "@assets/styles/global";
import React from "react";
import ReactDOM from "react-dom/client";
import theme from "@assets/styles/theme";

// ----------------------------------------------------------------------------------------------------

/* Root Page */
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Global styles={globalStyles} />
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);
