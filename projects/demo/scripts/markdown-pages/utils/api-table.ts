// Renders the `<table tuiDocAPI>` of a page's API tab as a Markdown table.
import {htmlToMarkdown} from './html-to-markdown';

// Attribute values may themselves contain `>` (e.g. type="ReadonlyArray<string>"), so the
// alternatives below stay quote-aware — and mutually exclusive, to keep matching linear.
const ATTRIBUTES = '(?:[^>"\']|"[^"]*"|\'[^\']*\')*';
const TABLE_REGEX = new RegExp(
    String.raw`<table\s${ATTRIBUTES}tuiDocAPI(?![\w-])${ATTRIBUTES}>([\s\S]*?)<\/table>`,
    'gi',
);

const ROW_REGEX = new RegExp(String.raw`<tr\b(${ATTRIBUTES})>([\s\S]*?)<\/tr>`, 'gi');

/**
 * A pipe would end the cell early (`number | bigint`), and angle brackets survive into the
 * caller's own pass over the page, where they would read as tags (`ReadonlyArray<string>`).
 */
function escape(value: string): string {
    return value
        .replaceAll('|', String.raw`\|`)
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}

function cell(html: string): string {
    return escape(htmlToMarkdown(html).replaceAll(/\s+/g, ' ').trim());
}

function table(header: string, rows: readonly string[]): string {
    return rows.length
        ? `| ${header} | Type | Description |\n| --- | --- | --- |\n${rows.join('\n')}`
        : '';
}

/** Replaces every API table in `html` with its Markdown equivalent. */
export function renderApiTables(html: string): string {
    return html.replaceAll(TABLE_REGEX, (_match, body: string) => {
        const inputs: string[] = [];
        const outputs: string[] = [];

        for (const [, attributes = '', inner = ''] of body.matchAll(ROW_REGEX)) {
            const name = /\bname="([^"]+)"/i.exec(attributes)?.[1]?.trim();
            const type = /\btype="([^"]+)"/i.exec(attributes)?.[1]?.trim();

            if (!name) {
                continue;
            }

            const row = `| \`${escape(name)}\` | ${type ? `\`${escape(type)}\`` : '—'} | ${cell(inner) || '—'} |`;

            if (name.startsWith('(')) {
                outputs.push(row);
            } else {
                inputs.push(row);
            }
        }

        return [table('Property', inputs), table('Event', outputs)]
            .filter(Boolean)
            .join('\n\n');
    });
}
