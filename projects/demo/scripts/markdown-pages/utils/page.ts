// Builds the Markdown twin of a single documentation page.
import {dirname, join} from 'node:path';

import {renderApiTables} from './api-table';
import {htmlToMarkdown, textOf} from './html-to-markdown';
import {fence, getCodeSnippet, getExampleSnippets, readIfExists} from './snippets';

/** Mirrors `TUI_DOC_DEFAULT_TABS` in `app.config.ts`: names for tabs declared without one. */
const DEFAULT_TABS = ['Examples', 'API'];
const DOC_PAGE_REGEX =
    /<tui-doc-page\b((?:[^>"']|"[^"]*"|'[^']*')*)>([\s\S]*)<\/tui-doc-page>/i;
/** `package` values that name a real npm package rather than a documentation section. */
const PACKAGES = new Set(['CORE', 'KIT', 'PHONE']);

function docCodeRegex(): RegExp {
    return /<tui-doc-code\b(?:[^>"']|"[^"]*"|'[^']*')*?\[code\]="([^"]+)"(?:[^>"']|"[^"]*"|'[^']*')*?\/?>(?:\s*<\/tui-doc-code>)?/gi;
}

function exampleTokenRegex(): RegExp {
    return /<tui-doc-example\b((?:[^>"']|"[^"]*"|'[^']*')*?)(\/)?>|<\/tui-doc-example>/gi;
}

export interface PageSource {
    /** Route the page is served at, without a leading slash. */
    readonly route: string;
    /** `title` declared on the route, used when the template has no `tui-doc-page[header]`. */
    readonly title: string;
    readonly template: string;
    readonly component: string;
}

function attribute(attributes: string, name: string): string {
    return (
        new RegExp(String.raw`\s${name}="([^"]*)"`, 'i')
            .exec(attributes)?.[1]
            ?.trim()
            .replaceAll(/\s+/g, ' ')
            .replaceAll('&#64;', '@') ?? ''
    );
}

/** Index of the `</ng-template>` closing the template opened before `from`. */
function findTemplateEnd(html: string, from: number): number {
    const tokens = /<ng-template\b|<\/ng-template>/gi;
    let depth = 1;

    tokens.lastIndex = from;

    for (let match = tokens.exec(html); match; match = tokens.exec(html)) {
        depth += match[0].startsWith('</') ? -1 : 1;

        if (depth === 0) {
            return match.index;
        }
    }

    return -1;
}

/** The page's `<ng-template pageTab>` blocks, in the order the tab bar shows them. */
function splitPageTabs(html: string): Array<{name: string; html: string}> {
    const tabs: Array<{name: string; html: string}> = [];
    const openings = /<ng-template\b((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;

    for (let match = openings.exec(html); match; match = openings.exec(html)) {
        const attributes = match[1] ?? '';

        if (!/\bpageTab\b/i.test(attributes)) {
            continue;
        }

        const end = findTemplateEnd(html, openings.lastIndex);

        if (end < 0) {
            break;
        }

        tabs.push({
            name: attribute(attributes, 'pageTab') || DEFAULT_TABS[tabs.length] || '',
            html: html.slice(openings.lastIndex, end),
        });
        openings.lastIndex = end;
    }

    return tabs;
}

async function inlineDocCode(html: string, ts: string, folder: string): Promise<string> {
    const replacements = new Map<string, string>();

    for (const [match, expression = ''] of html.matchAll(docCodeRegex())) {
        if (!replacements.has(match)) {
            const snippet = await getCodeSnippet(ts, folder, expression);

            replacements.set(match, snippet ? `\n\n${snippet}\n\n` : '');
        }
    }

    return [...replacements].reduce(
        (result, [match, snippet]) => result.replaceAll(match, snippet),
        html,
    );
}

/**
 * Turns every `<tui-doc-example>` into a `###` section: heading, then the projected
 * description, then the sample's code. Code goes last so the Markdown reads in the same
 * order as the rendered page.
 */
async function inlineExamples(
    html: string,
    ts: string,
    folder: string,
    labels: ReadonlyMap<string, string>,
    level: number,
): Promise<{html: string; maskOnly: boolean}> {
    const tokens = exampleTokenRegex();
    const parts: string[] = [];
    const pending: string[][] = [];
    let cursor = 0;
    let maskOnly = false;

    for (let match = tokens.exec(html); match; match = tokens.exec(html)) {
        parts.push(html.slice(cursor, match.index));
        cursor = match.index + match[0].length;

        if (match[0].startsWith('</')) {
            parts.push(`\n\n${(pending.pop() ?? []).join('\n\n')}\n\n`);
            continue;
        }

        const attributes = match[1] ?? '';
        const heading = attribute(attributes, 'heading');
        const description = attribute(attributes, 'description');
        const expression = /\[content\]="([^"]+)"/i.exec(attributes)?.[1] ?? '';
        const snippets = expression
            ? await getExampleSnippets(ts, folder, expression, labels)
            : [];

        maskOnly ||= snippets.length === 1 && snippets[0]?.label === 'mask';

        parts.push(
            `\n\n${heading ? `${'#'.repeat(level)} ${heading}\n\n` : ''}${description ? `${description}\n\n` : ''}`,
        );

        const code = snippets.map(({code}) => code);

        if (match[2]) {
            parts.push(`\n\n${code.join('\n\n')}\n\n`);
        } else {
            pending.push(code);
        }
    }

    parts.push(html.slice(cursor));

    return {html: parts.join(''), maskOnly};
}

/**
 * Boilerplate the demo's `addDefaultTabsProcessor` adds to every `mask`-only example.
 * It is identical for all of them, so the Markdown twin states it once per page.
 */
async function getFrameworkUsage(srcDir: string): Promise<string> {
    const folder = join(srcDir, 'app/utils/add-default-tabs-processor/default-tabs');
    const tabs = [
        ['JavaScript', 'js-default-tab.ts'],
        ['Angular', 'angular-default-tab.ts'],
        ['React', 'react-default-tab.ts'],
        ['Vue', 'vue-default-tab.ts'],
    ] as const;

    const sections: string[] = [];

    for (const [name, file] of tabs) {
        const source = await readIfExists(join(folder, file));
        const code = /`([\s\S]*?)`/.exec(source ?? '')?.[1]?.trim();

        if (code) {
            sections.push(
                `### ${name}\n\n${fence(code, name === 'React' ? '.tsx' : '.ts')}`,
            );
        }
    }

    return sections.length
        ? [
              '## Framework usage',
              'Every `mask` snippet above is a plain `MaskitoOptions` object. Wire it up like this:',
              ...sections,
          ].join('\n\n')
        : '';
}

/** The Markdown for one page, or `null` when the page has no textual content to offer. */
export async function buildPageMarkdown(
    page: PageSource,
    srcDir: string,
    labels: ReadonlyMap<string, string>,
): Promise<string | null> {
    const template = await readIfExists(page.template);

    if (!template) {
        return null;
    }

    const docPage = DOC_PAGE_REGEX.exec(template);

    // The "Copy page" action lives in the `tui-doc-page` header, so a page without one could
    // never offer its Markdown anyway — and its markup is a bare demo, not documentation.
    if (!docPage) {
        return null;
    }

    const ts = (await readIfExists(page.component)) ?? '';
    const folder = dirname(page.component);
    const attributes = docPage[1] ?? '';
    const inner = docPage[2] ?? '';
    const header = attribute(attributes, 'header') || page.title;
    const packageName = attribute(attributes, 'package');
    const tabs = splitPageTabs(inner);
    const blocks: string[] = [];
    let maskOnly = false;

    // A single tab renders no tab bar, so it needs no heading of its own — and everything
    // inside it moves up one level.
    const tabbed = tabs.length > 1;
    const level = tabbed ? 3 : 2;

    for (const tab of tabs.length ? tabs : [{name: '', html: inner}]) {
        const withCode = await inlineDocCode(tab.html, ts, folder);
        const examples = await inlineExamples(withCode, ts, folder, labels, level);
        const body = htmlToMarkdown(renderApiTables(examples.html), level);

        maskOnly ||= examples.maskOnly;

        if (body) {
            blocks.push(tabbed && tab.name ? `## ${tab.name}\n\n${body}` : body);
        }
    }

    if (!blocks.length) {
        return null;
    }

    if (maskOnly) {
        const usage = await getFrameworkUsage(srcDir);

        if (usage) {
            blocks.push(usage);
        }
    }

    const meta = PACKAGES.has(packageName.toUpperCase())
        ? `**Package**: \`@maskito/${packageName.toLowerCase()}\``
        : '';

    return [`# ${textOf(header)}`, meta, ...blocks]
        .filter(Boolean)
        .join('\n\n')
        .replaceAll(/\n{3,}/g, '\n\n')
        .trim();
}
