import {nxViteTsPaths} from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
    plugins: [
        nxViteTsPaths(), // https://nx.dev/recipes/vite/configure-vite#typescript-paths
        react(), // https://nx.dev/recipes/vite/configure-vite#framework-plugins
    ],
});
