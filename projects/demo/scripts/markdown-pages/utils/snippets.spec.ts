import {mkdtemp, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

import {getCodeSnippet, getExampleSnippets} from './snippets';

const LABELS = new Map([['DocExamplePrimaryTab.MaskitoOptions', 'mask']]);

describe('snippet resolution', () => {
    let folder = '';

    beforeAll(async () => {
        folder = await mkdtemp(join(tmpdir(), 'maskito-snippets-'));

        await writeFile(join(folder, 'mask.ts'), 'export default {mask: /\\d+/};\n');
        await writeFile(join(folder, 'app.tsx'), 'export const App = () => null;\n');
        await writeFile(join(folder, 'notes.md'), '```ts\nconst answer = 42;\n```\n');
    });

    // The demo wraps long `Record<string, TuiRawLoaderContent>` annotations over several
    // lines; a newline between the property and its `=` used to hide the whole example.
    it('resolves a record whose type annotation wraps over several lines', async () => {
        const ts = [
            'protected readonly example: Record<',
            '    string,',
            '    TuiRawLoaderContent',
            '> = {',
            "    [DocExamplePrimaryTab.MaskitoOptions]: import('./mask.ts?raw', {with: {loader: 'text'}}),",
            '};',
        ].join('\n');

        const snippets = await getExampleSnippets(ts, folder, 'example', LABELS);

        expect(snippets).toHaveLength(1);
        expect(snippets[0]?.label).toBe('mask');
        expect(snippets[0]?.code).toContain(String.raw`export default {mask: /\d+/};`);
    });

    it('resolves a single-line record', async () => {
        const ts =
            "protected readonly example = {[DocExamplePrimaryTab.MaskitoOptions]: import('./mask.ts?raw')};";

        expect(await getExampleSnippets(ts, folder, 'example', LABELS)).toHaveLength(1);
    });

    it('resolves an object literal written inline in the template', async () => {
        const ts = "protected readonly demo = import('./app.tsx?raw');";
        const [snippet] = await getExampleSnippets(
            ts,
            folder,
            "{'app.tsx': demo}",
            LABELS,
        );

        expect(snippet?.label).toBe('app.tsx');
        expect(snippet?.code).toContain('```tsx');
        expect(snippet?.code).toContain('export const App');
    });

    it('passes a markdown source through without re-fencing it', async () => {
        const ts = "protected readonly notes = import('./notes.md');";

        expect(await getCodeSnippet(ts, folder, 'notes')).toBe(
            '```ts\nconst answer = 42;\n```',
        );
    });

    it('yields nothing for a binding the component does not declare', async () => {
        expect(await getExampleSnippets('', folder, 'missing', LABELS)).toEqual([]);
        expect(await getCodeSnippet('', folder, 'missing')).toBe('');
    });
});
