import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    assetsInclude: ["**/*.png"],
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 5173,
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: path.resolve(__dirname, "src"),
            },
            {
                find: "@api",
                replacement: path.resolve(__dirname, "src/api"),
            },
            {
                find: "@assets",
                replacement: path.resolve(__dirname, "src/assets"),
            },
            {
                find: "@config",
                replacement: path.resolve(__dirname, "src/config"),
            },
            {
                find: "@components",
                replacement: path.resolve(__dirname, "src/components"),
            },
            {
                find: "@customTypes",
                replacement: path.resolve(__dirname, "src/customTypes"),
            },
            {
                find: "@hooks",
                replacement: path.resolve(__dirname, "src/hooks"),
            },
            {
                find: "@pages",
                replacement: path.resolve(__dirname, "src/pages"),
            },
            {
                find: "@utils",
                replacement: path.resolve(__dirname, "src/utils"),
            },
        ],
    },
});
