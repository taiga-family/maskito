// Renders the Angular markup of a doc page template to plain Markdown.

export function decodeEntities(value: string): string {
    return value
        .replaceAll('&#64;', '@')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&quot;', '"')
        .replaceAll(/&#0?39;/g, "'")
        .replaceAll('&pi;', 'π')
        .replaceAll('&nbsp;', ' ')
        .replaceAll(/&#12[35];/g, (match) => (match === '&#123;' ? '{' : '}'))
        .replaceAll('&amp;', '&');
}

export function textOf(html: string): string {
    return decodeEntities(html.replaceAll(/<[^>]+>/g, ''))
        .replaceAll(/\s+/g, ' ')
        .trim();
}

function isUrl(href: string): boolean {
    return /^(?:https?:)?\/\//.test(href);
}

/**
 * Folds a paragraph back onto one line: source templates put every inline element
 * (`<code>`, `<a>`, `<strong>`) on its own line, which would otherwise shred the prose.
 * List items, headings, table rows and code blocks keep their own lines.
 */
function foldBlock(block: string): string {
    const folded: string[] = [];

    for (const line of block.split('\n')) {
        const previous = folded[folded.length - 1];

        if (
            !previous ||
            /^(?:[-*] |#{1,6} |\||\[\[FENCE)/.test(line) ||
            /^(?:#{1,6} |\||\[\[FENCE)/.test(previous)
        ) {
            folded.push(line);
        } else {
            folded[folded.length - 1] = `${previous} ${line}`;
        }
    }

    return folded.join('\n');
}

/**
 * Markdown for the given markup. Fenced code blocks already inlined by the caller
 * are carried through untouched.
 */
export function htmlToMarkdown(html: string, baseLevel = 3): string {
    // Protect fenced code blocks from any tag/whitespace rewriting below. A fence closes on a
    // run of the same length, so a snippet quoting ``` inside a longer fence stays intact.
    const fences: string[] = [];
    let result = html.replaceAll(/(`{3,})[\s\S]*?\1/g, (match) => {
        fences.push(match);

        return `\n\n[[FENCE${fences.length - 1}]]\n\n`;
    });

    result = result
        .replaceAll(/<!--[\s\S]*?-->/g, '')
        .replaceAll(/<(script|style)\b[\s\S]*?<\/\1>/gi, '')
        // Live playgrounds and tab bars are interactive-only: no textual content to keep.
        .replaceAll(/<tui-doc-demo\b[\s\S]*?<\/tui-doc-demo>/gi, ' ')
        .replaceAll(/<tui-tabs\b[\s\S]*?<\/tui-tabs>/gi, ' ');

    // Keep the content of every ng-template (descriptions, tooltips are already filtered out).
    result = result
        .replaceAll(/<ng-template\b[^>]*>([\s\S]*?)<\/ng-template>/gi, '\n$1\n')
        .replaceAll(/<ng-container\b[^>]*>|<\/ng-container>/gi, '')
        .replaceAll(/<ng-content\b[^>]*>(?:\s*<\/ng-content>)?/gi, '');

    // Drop Angular control-flow openers/closers, keep their inner content. The keyword list
    // keeps `@tui.*` icon names and `&#64;maskito/*` package names untouched.
    result = result
        .replaceAll(
            /@(?:for|if|else\s+if|else|switch|case|default|empty|defer|placeholder|loading|error)(?:\s*\([^{}]*\))?\s*\{/gi,
            ' ',
        )
        .replaceAll(/^[^\S\n]*\}[^\S\n]*$/gm, '');

    // Card-style anchors (an <a> wrapping a heading) become list items. Navigation cards bind
    // [routerLink] instead of href, so the heading — not the href — is what identifies them.
    result = result.replaceAll(
        /<a\b([^>]*)>([\s\S]*?)<\/a>/gi,
        (match, attributes: string, inner: string) => {
            if (!/<h[1-6]\b/i.test(inner)) {
                return match;
            }

            const href = /\shref="([^"]+)"/i.exec(attributes)?.[1] ?? '';
            const heading = /<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/i.exec(inner)?.[1] ?? '';
            // Card headings carry their description in a nested `tuiSubtitle`.
            const subtitle = /<span\s[^>]*tuiSubtitle[^>]*>[\s\S]*?<\/span>/i;
            const title = textOf(heading.replace(subtitle, ''));
            const rest = [
                textOf(subtitle.exec(heading)?.[0] ?? ''),
                textOf(inner.replace(/<h[1-6]\b[\s\S]*?<\/h[1-6]>/i, '')),
            ]
                .filter(Boolean)
                .join(' ');

            const link = isUrl(href) ? ` ([link](${href}))` : '';

            return `\n- **${title}**${rest ? ` — ${rest}` : ''}${link}\n`;
        },
    );

    // Inline formatting.
    result = result
        .replaceAll(
            /<code\b[^>]*>([\s\S]*?)<\/code>/gi,
            (_match, inner: string) => `\`${textOf(inner).replaceAll('`', '')}\``,
        )
        .replaceAll(
            /<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi,
            (_match, _tag: string, inner: string) => `**${textOf(inner)}**`,
        )
        .replaceAll(
            /<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi,
            (_match, _tag: string, inner: string) => `_${textOf(inner)}_`,
        );

    // Links with a static external href; routerLink and bound [href] fall through to plain text.
    result = result
        .replaceAll(
            /<a\b[^>]*?\shref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi,
            (_match, href: string, inner: string) => {
                const text = textOf(inner).replace(/^#+\s*/, '');

                return isUrl(href) ? `[${text}](${href})` : text;
            },
        )
        .replaceAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, (_match, inner: string) =>
            textOf(inner),
        );

    // Prose headings nest under whatever level the caller is rendering at. Templates pick
    // heading tags for their looks — some pages start sections at <h2>, others at <h3> — so
    // the shallowest tag present is what maps onto `baseLevel`.
    const levels = [...result.matchAll(/<h([1-6])\b/gi)].map(([, level]) =>
        Number(level),
    );

    const shallowest = levels.length ? Math.min(...levels) : 2;

    result = result.replaceAll(
        /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
        (_match, level: string, inner: string) =>
            `\n\n${'#'.repeat(Math.min(6, baseLevel + Number(level) - shallowest))} ${textOf(inner)}\n\n`,
    );

    // Lists.
    result = result
        .replaceAll(/<input\b[^>]*>/gi, '')
        .replaceAll(/<li\b[^>]*>/gi, '\n- ')
        .replaceAll(/<\/li>/gi, '\n');

    // Block-level breaks.
    result = result
        .replaceAll(/<\/(?:p|div|section|ul|ol|header|hgroup|article|h[1-6])>/gi, '\n\n')
        .replaceAll(/<(?:p|div|section|ul|ol|header|hgroup|article)\b[^>]*>/gi, '\n\n')
        .replaceAll(/<br\s*\/?>/gi, '\n');

    // Drop everything else, then template interpolations and entities.
    result = decodeEntities(
        result.replaceAll(/<[^>]+>/g, '').replaceAll(/\{\{[\s\S]*?\}\}/g, ''),
    );

    result = result
        .replaceAll(/[^\S\n]+/g, ' ')
        .split('\n')
        .map((line) => line.trim())
        .join('\n')
        .replaceAll(/\n{3,}/g, '\n\n')
        // Pull a list item's text back onto its bullet line.
        .replaceAll(/^-[ \t]*\n+(?=\S)/gm, '- ')
        .replaceAll(/^-\s*$/gm, '')
        .replaceAll(/\n{3,}/g, '\n\n')
        .split('\n\n')
        .map(foldBlock)
        .join('\n\n')
        // Inline elements sit on their own source lines, so folding leaves gaps around
        // the punctuation that separated them.
        .replaceAll(/ +([,.;:!?)\]])/g, '$1')
        .replaceAll(/([([]) +/g, '$1')
        .trim();

    return result.replaceAll(/\[\[FENCE(\d+)\]\]/g, (_match, index: string) =>
        (fences[Number(index)] ?? '').trim(),
    );
}
