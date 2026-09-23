import {htmlToMarkdown} from './html-to-markdown';

describe('htmlToMarkdown', () => {
    it('folds an inline-element-per-line paragraph back onto one line', () => {
        const html = `
            <p>
                Use
                <code>maskitoTime</code>
                to create a mask.
            </p>
        `;

        expect(htmlToMarkdown(html)).toBe('Use `maskitoTime` to create a mask.');
    });

    it('closes the gaps folding leaves around punctuation', () => {
        const html = `
            <p>
                Pass
                <code>['AM', 'PM']</code>
                ,
                <code>['', '']</code>
                (default).
            </p>
        `;

        expect(htmlToMarkdown(html)).toBe("Pass `['AM', 'PM']`, `['', '']` (default).");
    });

    it('keeps external links and drops router ones', () => {
        const html = `
            <a href="https://maskito.dev" tuiLink>Maskito</a>
            <a routerLink="/kit/number" tuiLink>Number</a>
        `;

        expect(htmlToMarkdown(html)).toBe('[Maskito](https://maskito.dev) Number');
    });

    it('renders a list item per <li>', () => {
        const html =
            '<ul><li>Zero dependencies</li><li>SSR and <strong>Shadow DOM</strong></li></ul>';

        expect(htmlToMarkdown(html)).toBe(
            '- Zero dependencies\n\n- SSR and **Shadow DOM**',
        );
    });

    it('turns a card anchor into a titled list item', () => {
        const html = `
            <a tuiCardLarge [routerLink]="librariesPage">
                <h1 tuiTitle>
                    Explore libraries
                    <span tuiSubtitle>Maskito consists of several libraries.</span>
                </h1>
            </a>
        `;

        expect(htmlToMarkdown(html)).toBe(
            '- **Explore libraries** — Maskito consists of several libraries.',
        );
    });

    it('maps the shallowest heading in the block onto the requested level', () => {
        const html = '<h3>Write less code</h3><p>Body</p><h4>Detail</h4>';

        expect(htmlToMarkdown(html, 2)).toBe('## Write less code\n\nBody\n\n### Detail');
        expect(htmlToMarkdown(html, 3)).toBe(
            '### Write less code\n\nBody\n\n#### Detail',
        );
    });

    it('leaves a fenced block untouched, including one that quotes a fence', () => {
        const code = [
            '````ts',
            '/**',
            ' * ```',
            ' * value = 0;',
            ' * ```',
            ' */',
            '````',
        ].join('\n');

        expect(htmlToMarkdown(`<p>Before</p>${code}<p>After</p>`)).toBe(
            `Before\n\n${code}\n\nAfter`,
        );
    });

    it('drops live-only markup', () => {
        const html = `
            <tui-doc-demo [control]="control"><ng-template><input /></ng-template></tui-doc-demo>
            <p>Kept</p>
        `;

        expect(htmlToMarkdown(html)).toBe('Kept');
    });

    // Closers are only matched on a line of their own, which is how Prettier formats
    // every template in the repo.
    it('unwraps Angular control flow but keeps its content', () => {
        const html = ['@if (countryIsoCode) {', '<p>Flag shown</p>', '}'].join('\n');

        expect(htmlToMarkdown(html)).toBe('Flag shown');
    });
});
