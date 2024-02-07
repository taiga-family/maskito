import {DemoPath} from '@demo/constants';

import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';

describe('Date | Date segments zero padding (pads digits with zero if date segment exceeds its max possible value)', () => {
    describe('[mode]="dd.mm.yyyy"', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?mode=dd%2Fmm%2Fyyyy&dateSeparator=.`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        describe('pads digit > 3 with zero for days', () => {
            [0, 1, 2, 3].forEach(digit => {
                it(`Type ${digit} => ${digit}`, () => {
                    cy.get('@input')
                        .type(`${digit}`)
                        .should('have.value', `${digit}`)
                        .should('have.prop', 'selectionStart', 1)
                        .should('have.prop', 'selectionEnd', 1);
                });
            });

            [4, 5, 6, 7, 8, 9].forEach(digit => {
                it(`Type ${digit} => 0${digit}`, () => {
                    cy.get('@input')
                        .type(`${digit}`)
                        .should('have.value', `0${digit}`)
                        .should('have.prop', 'selectionStart', `0${digit}`.length)
                        .should('have.prop', 'selectionEnd', `0${digit}`.length);
                });
            });

            it(
                '|11|.11.2011 => Type 7 => 07.|11.2011',
                BROWSER_SUPPORTS_REAL_EVENTS,
                () => {
                    cy.get('@input')
                        .type('11.11.2011')
                        .type('{moveToStart}')
                        .realPress(['Shift', 'ArrowRight', 'ArrowRight']);

                    cy.get('@input')
                        .should('have.prop', 'selectionStart', 0)
                        .should('have.prop', 'selectionEnd', '07'.length)
                        .type('7')
                        .should('have.value', '07.11.2011')
                        .should('have.prop', 'selectionStart', '07.'.length)
                        .should('have.prop', 'selectionEnd', '07.'.length);
                },
            );
        });

        describe('pads digit > 1 with zero for months', () => {
            [0, 1].forEach(digit => {
                it(`Type 01.${digit} => 01.${digit}`, () => {
                    cy.get('@input')
                        .type(`01${digit}`)
                        .should('have.value', `01.${digit}`)
                        .should('have.prop', 'selectionStart', `01.${digit}`.length)
                        .should('have.prop', 'selectionEnd', `01.${digit}`.length);
                });
            });

            [2, 3, 4, 5, 6, 7, 8, 9].forEach(digit => {
                it(`Type 01.${digit} => 01.0${digit}`, () => {
                    cy.get('@input')
                        .type(`01${digit}`)
                        .should('have.value', `01.0${digit}`)
                        .should('have.prop', 'selectionStart', `01.0${digit}`.length)
                        .should('have.prop', 'selectionEnd', `01.0${digit}`.length);
                });
            });

            it(
                '11.|11|.2011 => Type 2 => 11.02.|2011',
                BROWSER_SUPPORTS_REAL_EVENTS,
                () => {
                    cy.get('@input')
                        .type('11.11.2011')
                        .type('{moveToEnd}')
                        .type('{leftArrow}'.repeat('.2011'.length))
                        .realPress(['Shift', 'ArrowLeft', 'ArrowLeft']);

                    cy.get('@input')
                        .should('have.prop', 'selectionStart', '11.'.length)
                        .should('have.prop', 'selectionEnd', '11.11'.length)
                        .type('2')
                        .should('have.value', '11.02.2011')
                        .should('have.prop', 'selectionStart', '01.02.'.length)
                        .should('have.prop', 'selectionEnd', '01.02.'.length);
                },
            );
        });
    });
});
