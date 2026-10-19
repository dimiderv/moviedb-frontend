import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    // Keep CRA's output folder so the Render publish directory doesn't change.
    build: { outDir: 'build' },
    server: { port: 3000 },
});
