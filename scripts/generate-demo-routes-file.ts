import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

import {infoLog, SMALL_TAB_SYMBOL, titleLog} from './helpers/colored-log';

const EXCEPTIONS = ['/', 'angular/Setup'];

/**
 * This script is required for correct of `nx prerender demo` command.
 * `@nguniversal/builders:prerender` (version 12) can't extract routes for lazy-loading modules.
 * See: https://github.com/angular/universal/issues/1769
 * ___
 * TODO: after update to the newer version of Angular and `@nguniversal/builders`, check if this script is still required.
 */
(function main(): void {
    const demoPathEnumContent = readFileSync(
        join(process.cwd(), `projects`, `demo`, `src`, `app`, `demo-path.ts`),
        `utf-8`,
    );
    const routes =
        demoPathEnumContent
            .match(/['"`](.*)['"`]/g)
            ?.map(route => route.replace(/['"`]/g, '')) || [];

    routes.forEach(route => {
        if (route.startsWith('kit')) {
            routes.push(`${route}/API`);
        }
    });
    routes.push(...EXCEPTIONS);

    titleLog('Generated routes:');
    routes.forEach(route => infoLog(`${SMALL_TAB_SYMBOL}* ${route}`));

    writeFileSync(
        join(process.cwd(), `projects`, `demo`, `routesFile.txt`),
        routes?.join('\n') || '',
    );
})();
