/* IMPORT */
import { defineConfig } from 'vite';
import ConditionalCompile from "vite-plugin-conditional-compiler";
/* MAIN */
const config = defineConfig({
    build: {
        target: 'esnext',
        lib: {
            name: 'voby',
            formats: ['es'],
            entry: "./src/index.ts"
        }
    },
    esbuild: {
    // jsx: 'automatic',
    },
    plugins: [ConditionalCompile({
            include: 'via',
        })],
});
/* EXPORT */
export default config;
