import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Number | postfix consists of many characters', () => {
    describe('postfix = ` lbs. per day`', () => {
        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions: maskitoNumberOptionsGenerator({
                        postfix: ' lbs. per day',
                        thousandSeparator: ' ',
                        decimalSeparator: '.',
                        maximumFractionDigits: 2,
                    }),
                },
            });
            cy.get('input').focus();
        });

        it('Paste 100<space>', () => {
            cy.get('input').paste('100 ').should('have.value', '100 lbs. per day');
        });

        it('Paste 100.<space>', () => {
            cy.get('input').paste('100.').should('have.value', '100. lbs. per day');
        });

        it('Paste 100.42<space>', () => {
            cy.get('input').paste('100.42').should('have.value', '100.42 lbs. per day');
        });

        it('Paste 100 lbs', () => {
            cy.get('input').paste('100 lbs').should('have.value', '100 lbs. per day');
        });

        it('Paste 100 lbs.', () => {
            cy.get('input').paste('100 lbs.').should('have.value', '100 lbs. per day');
        });

        it('Paste 100. lbs.', () => {
            cy.get('input').paste('100. lbs.').should('have.value', '100. lbs. per day');
        });
    });
});
