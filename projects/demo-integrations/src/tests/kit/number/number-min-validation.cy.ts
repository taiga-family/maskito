import {openNumberPage} from './utils';

describe('Number | Min validation', () => {
    describe('Min = -100', () => {
        beforeEach(() => {
            openNumberPage('min=-100&precision=4');
        });

        ['−1', '−10', '−42', '−100', '0', '1', '5', '99'].forEach(value => {
            it(`accepts ${value}`, () => {
                cy.get('@input')
                    .type(value)
                    .should('have.value', value)
                    .should('have.prop', 'selectionStart', value.length)
                    .should('have.prop', 'selectionEnd', value.length);
            });
        });

        ['-101', '-256', '-512'].forEach(value => {
            it(`rejects ${value} (replace it with min value)`, () => {
                cy.get('@input')
                    .type(value)
                    .should('have.value', '−100')
                    .should('have.prop', 'selectionStart', '−100'.length)
                    .should('have.prop', 'selectionEnd', '−100'.length);
            });
        });

        describe('accepts any decimal value (integer part is less than max one)', () => {
            it('-99,9999', () => {
                cy.get('@input')
                    .type('−99,9999')
                    .should('have.value', '−99.9999')
                    .should('have.prop', 'selectionStart', '−99.9999'.length)
                    .should('have.prop', 'selectionEnd', '−99.9999'.length);
            });

            it('-0,0500', () => {
                cy.get('@input')
                    .type('-0,0500')
                    .should('have.value', '−0.0500')
                    .should('have.prop', 'selectionStart', '−0.0500'.length)
                    .should('have.prop', 'selectionEnd', '−0.0500'.length);
            });
        });

        it('rejects decimal part is integer part is already equal to max', () => {
            cy.get('@input')
                .type('-100,0001')
                .should('have.value', '−100')
                .should('have.prop', 'selectionStart', '−100'.length)
                .should('have.prop', 'selectionEnd', '−100'.length);
        });

        it('-|50 => Type 1 => -100|', () => {
            cy.get('@input')
                .type('-50')
                .type('{moveToStart}{rightArrow}')
                .should('have.value', '−50')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .type('1')
                .should('have.value', '−100')
                .should('have.prop', 'selectionStart', '−100'.length)
                .should('have.prop', 'selectionEnd', '−100'.length);
        });
    });

    describe('Min = 5', () => {
        beforeEach(() => {
            openNumberPage('min=5&precision=4');
        });

        it('can type 10 (via keyboard, 1 character per keydown)', () => {
            cy.get('@input')
                .type('1')
                .should('have.value', '1')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .type('0')
                .should('have.value', '10')
                .should('have.prop', 'selectionStart', '10'.length)
                .should('have.prop', 'selectionEnd', '10'.length);
        });

        it('replaces 1 with 5 on blur', () => {
            cy.get('@input')
                .type('1')
                .wait(100) // to be sure that value is not changed even in case of some async validation
                .should('have.value', '1')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .blur()
                .should('have.value', '5');
        });

        it('keeps 6 untouched on blur', () => {
            cy.get('@input')
                .type('6')
                .wait(100) // to be sure that value is not changed even in case of some async validation
                .should('have.value', '6')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .blur()
                .wait(100)
                .should('have.value', '6');
        });
    });
});
