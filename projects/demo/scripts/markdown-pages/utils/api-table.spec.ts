import {renderApiTables} from './api-table';

describe('renderApiTables', () => {
    it('keeps generic arguments that would otherwise read as tags', () => {
        const html = `
            <table tuiDocAPI>
                <tr name="[separators]" tuiDocAPIItem type="ReadonlyArray<string>">
                    Separators between time segments
                </tr>
            </table>
        `;

        expect(renderApiTables(html).trim()).toBe(
            [
                '| Property | Type | Description |',
                '| --- | --- | --- |',
                '| `[separators]` | `ReadonlyArray&lt;string&gt;` | Separators between time segments |',
            ].join('\n'),
        );
    });

    it('splits inputs from outputs and renders rich descriptions', () => {
        const html = `
            <table tuiDocAPI>
                <tr name="[step]" tuiDocAPIItem type="number">
                    Increment
                    <p><strong>Default:</strong> <code>0</code></p>
                </tr>
                <tr name="(valueChange)" tuiDocAPIItem type="EventEmitter">Fires on change</tr>
            </table>
        `;

        expect(renderApiTables(html).trim()).toBe(
            [
                '| Property | Type | Description |',
                '| --- | --- | --- |',
                '| `[step]` | `number` | Increment **Default:** `0` |',
                '',
                '| Event | Type | Description |',
                '| --- | --- | --- |',
                '| `(valueChange)` | `EventEmitter` | Fires on change |',
            ].join('\n'),
        );
    });

    it('escapes a pipe so a union type cannot break out of its cell', () => {
        const html =
            '<table tuiDocAPI><tr name="[min]" tuiDocAPIItem type="number | bigint">Lower bound</tr></table>';

        expect(renderApiTables(html)).toContain(
            '| `[min]` | `number \\| bigint` | Lower bound |',
        );
    });

    it('leaves markup without an API table alone', () => {
        expect(renderApiTables('<p>Nothing here</p>')).toBe('<p>Nothing here</p>');
    });
});
