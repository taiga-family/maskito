import * as fs from 'node:fs/promises';
import {join, resolve} from 'node:path';

import {readDemoPaths, readDocRoutes} from './routes';

const SRC_DIR = resolve(__dirname, '../../../src');

describe('readDocRoutes', () => {
    it('resolves a template that exists for every routed page', async () => {
        const routes = await readDocRoutes(SRC_DIR);

        expect(routes.length).toBeGreaterThan(20);

        for (const {route, template} of routes) {
            await expect(fs.access(template)).resolves.toBeUndefined();
            expect(route).not.toMatch(/^\/|\/$/);
        }
    });

    it('covers the routes declared in DemoPath, bar the ones with no documentation', async () => {
        const paths = await readDemoPaths(join(SRC_DIR, 'app/constants/demo-path.ts'));
        const routed = new Set((await readDocRoutes(SRC_DIR)).map(({route}) => route));
        const missing = [...paths.values()].filter((route) => !routed.has(route));

        // `stackblitz` redirects straight out to StackBlitz and renders only a loader.
        expect(missing).toEqual(['stackblitz']);
    });

    it('reads a page component alongside its template', async () => {
        const routes = await readDocRoutes(SRC_DIR);
        const number = routes.find(({route}) => route === 'kit/number');

        expect(number?.component).toMatch(/number-mask-doc\.component\.ts$/);
        expect(number?.template).toMatch(/number-mask-doc\.template\.html$/);
    });
});
