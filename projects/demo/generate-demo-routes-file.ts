import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

import {DemoPath} from './src/app/constants/demo-path';

const SMALL_TAB_SYMBOL = '  '; // @note: if you use \t then we have big gaps
const EXCEPTIONS = [
    '/',
    `${DemoPath.Angular}/Setup`,
    `${DemoPath.PhonePackage}/API`,
    `${DemoPath.Plugins}/Built-in_core_plugins`,
];

function infoLog(message: string): void {
    console.info('\x1B[34m%s\x1B[0m', message);
}

function titleLog(message: string): void {
    console.info('\x1B[35m', message);
}

/**
 * This script is required for correct of `nx prerender demo` command.
 * `@nguniversal/builders:prerender` (version 12) can't extract routes for lazy-loading modules.
 * See: https://github.com/angular/universal/issues/1769
 * ___
 * TODO: after update to the newer version of Angular and `@nguniversal/builders`, check if this script is still required.
 */
(function main(): void {
    const demoPathEnumContent = readFileSync(
        join(
            process.cwd(),
            'projects',
            'demo',
            'src',
            'app',
            'constants',
            'demo-path.ts',
        ),
        'utf-8',
    );
    const routes =
        demoPathEnumContent
            .match(/['"`](.*)['"`]/g)
            ?.map((route) => route.replaceAll(/['"`]/g, '')) || [];

    routes.forEach((route) => {
        if (route.startsWith('kit')) {
            routes.push(`${route}/API`);
        }
    });
    routes.push(...EXCEPTIONS);

    titleLog('Generated routes:');
    routes.forEach((route) => infoLog(`${SMALL_TAB_SYMBOL}* ${route}`));

    writeFileSync(
        join(process.cwd(), 'projects', 'demo', 'routesFile.txt'),
        routes?.join('\n') || '',
    );
})();
