import {openNumberPage} from './utils';

describe('Number | Max validation', () => {
    describe('Max = 3', () => {
        beforeEach(() => {
            openNumberPage('max=3&precision=4');
        });

        ['0', '1', '2', '3'].forEach(value => {
            it(`accepts ${value}`, () => {
                cy.get('@input')
                    .type(value)
                    .should('have.value', value)
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });
        });

        ['4', '5', '6', '7', '8', '9'].forEach(value => {
            it(`rejects ${value} (replace it with max value)`, () => {
                cy.get('@input')
                    .type(value)
                    .should('have.value', '3')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });
        });

        describe('accepts any decimal value (integer part is less than max one)', () => {
            it('0,9999', () => {
                cy.get('@input')
                    .type(',9999')
                    .should('have.value', '0.9999')
                    .should('have.prop', 'selectionStart', '0.9999'.length)
                    .should('have.prop', 'selectionEnd', '0.9999'.length);
            });

            it('2,777', () => {
                cy.get('@input')
                    .type('2,777')
                    .should('have.value', '2.777')
                    .should('have.prop', 'selectionStart', '2.777'.length)
                    .should('have.prop', 'selectionEnd', '2.777'.length);
            });
        });

        it('rejects decimal part is integer part is already equal to max', () => {
            cy.get('@input')
                .type('3,9')
                .should('have.value', '3')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('|0 => Type 5 => 3|', () => {
            cy.get('@input')
                .type('0')
                .type('{moveToStart}')
                .should('have.value', '0')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0)
                .type('5')
                .should('have.value', '3')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });
    });

    describe('Max=777', () => {
        beforeEach(() => {
            openNumberPage('max=777');
        });

        ['5', '10', '77', '770', '776', '777'].forEach(value => {
            it(`accepts ${value}`, () => {
                cy.get('@input')
                    .type(value)
                    .should('have.value', value)
                    .should('have.prop', 'selectionStart', value.length)
                    .should('have.prop', 'selectionEnd', value.length);
            });
        });

        ['778', '779', '7777', '1000'].forEach(value => {
            it(`rejects ${value} (replace it with max value)`, () => {
                cy.get('@input')
                    .type(value)
                    .should('have.value', '777')
                    .should('have.prop', 'selectionStart', 3)
                    .should('have.prop', 'selectionEnd', 3);
            });
        });

        it('9|9 => Type 7 => 777|', () => {
            cy.get('@input')
                .type('99')
                .type('{leftArrow}')
                .should('have.value', '99')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1)
                .type('0')
                .should('have.value', '777')
                .should('have.prop', 'selectionStart', '777'.length)
                .should('have.prop', 'selectionEnd', '777'.length);
        });
    });

    describe('Max = -5', () => {
        beforeEach(() => {
            openNumberPage('max=-5');
        });

        it('can type -42 (via keyboard, 1 character per keydown)', () => {
            cy.get('@input')
                .type('-4')
                .should('have.value', '−4')
                .should('have.prop', 'selectionStart', '−4'.length)
                .should('have.prop', 'selectionEnd', '−4'.length)
                .type('2')
                .should('have.value', '−42')
                .should('have.prop', 'selectionStart', '−42'.length)
                .should('have.prop', 'selectionEnd', '−42'.length);
        });

        it('replaces -4 with -5 on blur', () => {
            cy.get('@input')
                .type('-4')
                .wait(100) // to be sure that value is not changed even in case of some async validation
                .should('have.value', '−4')
                .should('have.prop', 'selectionStart', '−4'.length)
                .should('have.prop', 'selectionEnd', '−4'.length)
                .blur()
                .should('have.value', '−5');
        });

        it('keeps -6 untouched on blur', () => {
            cy.get('@input')
                .type('-6')
                .wait(100) // to be sure that value is not changed even in case of some async validation
                .should('have.value', '−6')
                .should('have.prop', 'selectionStart', '−6'.length)
                .should('have.prop', 'selectionEnd', '−6'.length)
                .blur()
                .wait(100)
                .should('have.value', '−6');
        });
    });
});
