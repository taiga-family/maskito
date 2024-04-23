import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Number | should drop decimal separator if all digits are erased', () => {
    beforeEach(() => {
        cy.mount(TestInput, {
            componentProperties: {
                maskitoOptions: maskitoNumberOptionsGenerator({
                    precision: 2,
                    minusSign: '-',
                }),
            },
        });
        cy.get('input').focus().should('have.value', '');
    });

    it('empty integer part & NOT empty decimal part => keeps decimal separator untouched', () => {
        cy.get('input')
            .type('0.12')
            .type('{backspace}'.repeat(2))
            .should('have.value', '0.');
    });

    it('NOT empty integer part & empty decimal part => keeps decimal separator untouched', () => {
        cy.get('input')
            .type('0.12')
            .type('{moveToStart}')
            .type('{del}')
            .should('have.value', '.12');
    });

    describe('empty integer part & empty decimal part => drops decimal separator', () => {
        [
            {minusSign: '', testTitle: 'Without minus'},
            {minusSign: '-', testTitle: 'With minus'},
        ].forEach(({testTitle, minusSign}) => {
            it(testTitle, () => {
                cy.get('input')
                    .type(`${minusSign}0.12`)
                    .type('{backspace}'.repeat(2))
                    .type(`{moveToStart}${'{rightArrow}'.repeat(minusSign.length)}`)
                    .type('{del}')
                    .should('have.value', minusSign)
                    // and then repeat everything in reversed order
                    .type('0.12')
                    .type(`{moveToStart}${'{rightArrow}'.repeat(minusSign.length)}`)
                    .type('{del}')
                    .type('{moveToEnd}')
                    .type('{backspace}'.repeat(2))
                    .should('have.value', minusSign);
            });
        });
    });
});
