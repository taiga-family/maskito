/// <reference types="cypress" />

import {smartTick} from './smart-tick';

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            smartTick(durationMs: number, frequencyMs?: number): Chainable<Subject>;
        }
    }
}

Cypress.Commands.add(
    'smartTick',
    {prevSubject: ['optional', 'element', 'window', 'document']},
    smartTick,
);
