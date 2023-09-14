import {smartTick} from './commands/smart-tick';

Cypress.Commands.add(
    'smartTick',
    {prevSubject: ['optional', 'element', 'window', 'document']},
    smartTick,
);
