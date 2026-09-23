// Resolves `[content]` / `[code]` bindings of a doc page back to the files they import.
import * as fs from 'node:fs/promises';
import {extname, resolve} from 'node:path';

export interface Snippet {
    readonly label: string;
    readonly code: string;
}

const LANGUAGE_BY_EXTENSION: Record<string, string> = {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'js',
    '.jsx': 'jsx',
    '.vue': 'vue',
    '.html': 'html',
    '.less': 'less',
    '.css': 'css',
};

function escapeReg(value: string): string {
    return value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

export async function readIfExists(file: string): Promise<string | null> {
    try {
        return await fs.readFile(file, 'utf8');
    } catch {
        return null;
    }
}

/** Content inside the `{…}` or `[…]` pair opening at `openIndex`, respecting nesting. */
function readBalanced(source: string, openIndex: number): string | null {
    const open = source[openIndex] ?? '';
    const close = {'{': '}', '[': ']'}[open];

    if (!close) {
        return null;
    }

    let depth = 0;

    for (let index = openIndex; index < source.length; index++) {
        if (source[index] === open) {
            depth += 1;
        } else if (source[index] === close) {
            depth -= 1;

            if (depth === 0) {
                return source.slice(openIndex + 1, index);
            }
        }
    }

    return null;
}

/**
 * Body of the `<binding> = { … }` object literal declared in the page's component.
 *
 * The type annotation in between may wrap over several lines, so only `=` and `;` bound the
 * search — an annotation can contain neither, which keeps the match anchored to this property.
 */
function readAssignedObject(ts: string, binding: string): string | null {
    const assignment = new RegExp(
        String.raw`\b${escapeReg(binding)}\b[^=;]*(?:=\s*)\{`,
    ).exec(ts);

    return assignment
        ? readBalanced(ts, assignment.index + assignment[0].length - 1)
        : null;
}

/** The path of the single `import(...)` a binding is assigned, if it is assigned one. */
function resolveDirectImport(ts: string, binding: string): string | null {
    return (
        new RegExp(
            String.raw`\b${escapeReg(binding)}\b\s*=\s*import\(\s*['"]([^'"]+)['"]`,
        ).exec(ts)?.[1] ?? null
    );
}

/**
 * The `{tabLabel: import('…')}` entries a `[content]` expression resolves to, in source order.
 *
 * Accepts both shapes used across the docs: an inline object literal written in the template
 * (`[content]="{'app.tsx': controlledInput}"`) and a component field holding the record.
 */
function resolveContentEntries(
    ts: string,
    expression: string,
    labels: ReadonlyMap<string, string>,
): ReadonlyArray<{label: string; importPath: string}> {
    const inline = expression.trim().startsWith('{')
        ? readBalanced(expression.trim(), 0)
        : null;

    const body = inline ?? readAssignedObject(ts, expression.trim());

    if (body === null) {
        const direct = resolveDirectImport(ts, expression.trim());

        return direct ? [{label: '', importPath: direct}] : [];
    }

    // Keys are located first and each value is then the slice up to the next key, which keeps
    // the match linear — one regex spanning both has super-linear backtracking.
    const keys = [
        ...body.matchAll(/(?:'([^']+)'|"([^"]+)"|\[([^\]]+)\]|([a-z_$][\w$]*))\s*:/gi),
    ];

    return keys.flatMap((match, index) => {
        const [, single, double, computed, plain] = match;
        const label =
            single ?? double ?? (computed && labels.get(computed)) ?? plain ?? '';

        const value = body.slice(
            match.index + match[0].length,
            keys[index + 1]?.index ?? body.length,
        );

        const importPath =
            /import\(\s*['"]([^'"]+)['"]/.exec(value)?.[1] ??
            resolveDirectImport(ts, value.replace(/,\s*$/, '').trim());

        return label && importPath ? [{label, importPath}] : [];
    });
}

/** `{DocExamplePrimaryTab.MaskitoOptions: 'mask', …}` as written in the demo's constants. */
export async function readTabLabels(constantsFile: string): Promise<Map<string, string>> {
    const source = (await readIfExists(constantsFile)) ?? '';
    const labels = new Map<string, string>();

    for (const [, key = '', value = ''] of source.matchAll(/(\w+)\s*:\s*'([^']+)'/g)) {
        labels.set(`DocExamplePrimaryTab.${key}`, value);
    }

    return labels;
}

async function readSnippet(
    folder: string,
    importPath: string,
): Promise<{code: string; extension: string} | null> {
    const [relative = ''] = importPath.split('?');
    const file = resolve(folder, relative);
    const code = (await readIfExists(file))?.trim();

    return code ? {code, extension: extname(file)} : null;
}

/** A snippet's Markdown: `.md` sources are already fenced, everything else gets a fence. */
export function fence(code: string, extension: string, label = ''): string {
    if (extension === '.md') {
        return code;
    }

    const language = LANGUAGE_BY_EXTENSION[extension] ?? '';
    const caption = label && !/^(?:mask|Angular|React|Vue|JavaScript)$/.test(label);
    // Sources may quote a fence themselves (a JSDoc example, say), so the wrapper has to be
    // longer than the longest backtick run inside them.
    const longest = Math.max(
        0,
        ...[...code.matchAll(/`+/g)].map(([match]) => match.length),
    );

    const wrapper = '`'.repeat(Math.max(3, longest + 1));

    return `${caption ? `_${label}_\n\n` : ''}${wrapper}${language}\n${code}\n${wrapper}`;
}

/** Every code sample a `<tui-doc-example [content]>` shows, as fenced Markdown blocks. */
export async function getExampleSnippets(
    ts: string,
    folder: string,
    expression: string,
    labels: ReadonlyMap<string, string>,
): Promise<Snippet[]> {
    const snippets: Snippet[] = [];

    for (const {label, importPath} of resolveContentEntries(ts, expression, labels)) {
        const snippet = await readSnippet(folder, importPath);

        if (snippet) {
            snippets.push({
                label,
                code: fence(snippet.code, snippet.extension, label),
            });
        }
    }

    return snippets;
}

/** The Markdown a `<tui-doc-code [code]>` renders, or an empty string when unresolvable. */
export async function getCodeSnippet(
    ts: string,
    folder: string,
    expression: string,
): Promise<string> {
    const importPath = resolveDirectImport(ts, expression.trim());
    const snippet = importPath ? await readSnippet(folder, importPath) : null;

    return snippet ? fence(snippet.code, snippet.extension) : '';
}
