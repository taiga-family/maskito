// Maps every routed doc page to the template file the page renders.
import * as fs from 'node:fs/promises';
import {dirname, join, resolve} from 'node:path';

import {readIfExists} from './snippets';

export interface DocRoute {
    /** Route path without a leading slash, e.g. `kit/number`. */
    readonly route: string;
    /** Title declared on the route, used when the template has no `tui-doc-page[header]`. */
    readonly title: string;
    /** Absolute path of the template the page component renders. */
    readonly template: string;
    /** Absolute path of the page component, used to resolve its `[content]` bindings. */
    readonly component: string;
}

async function isDirectory(target: string): Promise<boolean> {
    try {
        return (await fs.stat(target)).isDirectory();
    } catch {
        return false;
    }
}

/** `{WhatIsMaskito: 'getting-started/what-is-maskito', …}` as written in the demo's constants. */
export async function readDemoPaths(file: string): Promise<Map<string, string>> {
    const source = (await readIfExists(file)) ?? '';
    const paths = new Map<string, string>();

    for (const [, key = '', value = ''] of source.matchAll(/(\w+)\s*:\s*'([^']+)'/g)) {
        paths.set(key, value);
    }

    return paths;
}

/** Top-level `{…}` literals of the routes array, in source order. */
function splitRouteObjects(source: string): string[] {
    const objects: string[] = [];
    let depth = 0;
    let start = -1;

    for (let index = 0; index < source.length; index++) {
        const char = source[index];

        if (char === '{') {
            if (depth === 0) {
                start = index;
            }

            depth += 1;
        } else if (char === '}') {
            depth -= 1;

            if (depth === 0 && start >= 0) {
                objects.push(source.slice(start + 1, index));
                start = -1;
            }
        }
    }

    return objects;
}

async function resolveComponentFile(
    appDir: string,
    importPath: string,
): Promise<string | null> {
    const base = resolve(appDir, importPath);
    const candidates = (await isDirectory(base))
        ? [join(base, 'index.ts')]
        : [`${base}.ts`, join(base, 'index.ts')];

    for (const candidate of candidates) {
        if ((await readIfExists(candidate)) !== null) {
            return candidate;
        }
    }

    return null;
}

/**
 * Every page reachable through `app.routes.ts`, paired with its template.
 *
 * The empty route renders the same component as `DemoPath.WhatIsMaskito`, so it is dropped
 * here and resolved to that page's Markdown at runtime instead.
 */
export async function readDocRoutes(srcDir: string): Promise<DocRoute[]> {
    const appDir = join(srcDir, 'app');
    const paths = await readDemoPaths(join(appDir, 'constants', 'demo-path.ts'));
    const source = (await readIfExists(join(appDir, 'app.routes.ts'))) ?? '';
    const routes: DocRoute[] = [];

    for (const object of splitRouteObjects(source)) {
        const route = /\bpath:\s*DemoPath\.(\w+)/.exec(object)?.[1];
        const importPath = /\bimport\(\s*['"]([^'"]+)['"]/.exec(object)?.[1];

        if (!route || !importPath) {
            continue;
        }

        const resolved = paths.get(route);
        const component = await resolveComponentFile(appDir, importPath);
        const templateUrl = component
            ? /templateUrl:\s*['"]([^'"]+)['"]/.exec(
                  (await readIfExists(component)) ?? '',
              )?.[1]
            : undefined;

        if (!resolved || !component || !templateUrl) {
            continue;
        }

        routes.push({
            route: resolved,
            title: /\btitle:\s*['"]([^'"]+)['"]/.exec(object)?.[1] ?? '',
            template: resolve(dirname(component), templateUrl),
            component,
        });
    }

    return routes;
}
