import {nxComponentTestingPreset} from '@nx/angular/plugins/component-testing';
import {defineConfig} from 'cypress';

export default defineConfig({
    component: {
        ...nxComponentTestingPreset(__filename),
        indexHtmlFile: 'src/support/component-index.html',
        supportFile: 'src/support/component-react.ts',
        specPattern: 'src/tests/component-testing/react/**/*.cy.tsx',
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
});
