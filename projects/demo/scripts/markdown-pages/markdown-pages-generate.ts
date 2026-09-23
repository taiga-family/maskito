// Emits one Markdown file per doc page at its route path (e.g. /kit/number.md),
// served as a static asset and read back by the "Copy page" action.
import * as fs from 'node:fs/promises';
import {dirname, join, relative, resolve} from 'node:path';

import {buildPageMarkdown} from './utils/page';
import {readDocRoutes} from './utils/routes';
import {readTabLabels} from './utils/snippets';

const SRC_DIR = resolve(process.cwd(), 'projects/demo/src');
const OUTPUT_DIR = join(SRC_DIR, 'markdown-pages');

async function main(): Promise<void> {
    const routes = await readDocRoutes(SRC_DIR);
    const labels = await readTabLabels(
        join(SRC_DIR, 'app/constants/doc-example-primary-tab.ts'),
    );

    console.info(`Generating markdown for ${routes.length} routed pages...`);

    // Clean slate for renamed routes, but keep the dir + .gitkeep so the asset glob resolves.
    await fs.rm(OUTPUT_DIR, {recursive: true, force: true});
    await fs.mkdir(OUTPUT_DIR, {recursive: true});
    await fs.writeFile(join(OUTPUT_DIR, '.gitkeep'), '');

    const skipped: string[] = [];

    for (const page of routes) {
        const markdown = await buildPageMarkdown(page, SRC_DIR, labels);

        if (!markdown) {
            skipped.push(page.route);
            continue;
        }

        const file = join(OUTPUT_DIR, `${page.route}.md`);

        await fs.mkdir(dirname(file), {recursive: true});
        await fs.writeFile(file, `${markdown}\n`);
    }

    console.info(
        `Wrote ${routes.length - skipped.length} markdown pages to ${relative(process.cwd(), OUTPUT_DIR)}`,
    );

    if (skipped.length) {
        console.info(`Skipped (no textual content): ${skipped.join(', ')}`);
    }
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});
