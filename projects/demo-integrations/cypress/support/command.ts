import {pasteFromClipboard} from './commands/paste-from-clipboard';
import {writeTextToClipboard} from './commands/write-text-to-clipboard';

declare global {
    namespace Cypress {
        interface Chainable {
            writeTextToClipboard(text: string): Chainable;

            pasteFromClipboard(): Chainable;
        }
    }
}

Cypress.Commands.add(
    `writeTextToClipboard`,
    {prevSubject: [`optional`, `element`, `window`, `document`]},
    writeTextToClipboard,
);
Cypress.Commands.add(`pasteFromClipboard`, {prevSubject: `element`}, pasteFromClipboard);
