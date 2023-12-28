/// <reference types="cypress" />

import {smartTick} from './commands/smart-tick';

declare global {
    namespace Cypress {
        interface Chainable {
            smartTick(durationMs: number, frequencyMs?: number): Chainable;
        }
    }
}

Cypress.Commands.add(
    'smartTick',
    {prevSubject: ['optional', 'element', 'window', 'document']},
    smartTick,
);
