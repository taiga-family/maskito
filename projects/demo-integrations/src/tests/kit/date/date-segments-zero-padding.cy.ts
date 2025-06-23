import {DemoPath} from '@demo/constants';

import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';

describe('Date | Date segments zero padding (pads digits with zero if date segment exceeds its max possible value)', () => {
    describe('[mode]="dd.mm.yyyy"', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?mode=dd%2Fmm%2Fyyyy&separator=.`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        describe('pads the 1st digit > 3 with zero for days', () => {
            [0, 1, 2, 3].forEach((digit) => {
                it(`Type ${digit} => ${digit}`, () => {
                    cy.get('@input')
                        .type(`${digit}`)
                        .should('have.value', `${digit}`)
                        .should('have.prop', 'selectionStart', 1)
                        .should('have.prop', 'selectionEnd', 1);
                });
            });

            [4, 5, 6, 7, 8, 9].forEach((digit) => {
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

        describe('pads the 1st digit > 1 with zero for months', () => {
            [0, 1].forEach((digit) => {
                it(`Type 01.${digit} => 01.${digit}`, () => {
                    cy.get('@input')
                        .type(`01${digit}`)
                        .should('have.value', `01.${digit}`)
                        .should('have.prop', 'selectionStart', `01.${digit}`.length)
                        .should('have.prop', 'selectionEnd', `01.${digit}`.length);
                });
            });

            [2, 3, 4, 5, 6, 7, 8, 9].forEach((digit) => {
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

        describe('if users enters two digits and its combination exceeds the first (and only first!) non-year date segment - pad the first digit with zero', () => {
            it('Empty input => Type 35 => 03.05|', () => {
                cy.get('@input')
                    .type('35')
                    .should('have.value', '03.05')
                    .should('have.prop', 'selectionStart', '03.05'.length)
                    .should('have.prop', 'selectionEnd', '03.05'.length);
            });

            it('|19.01.2025 => Type 3 => 3|0.01.2025', () => {
                cy.get('@input')
                    .type('19012025')
                    .should('have.value', '19.01.2025')
                    .type('{moveToStart}')
                    .should('have.prop', 'selectionStart', 0)
                    .should('have.prop', 'selectionEnd', 0)
                    .type('3')
                    .should('have.value', '30.01.2025')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('31.1| => Type 3 => 31.1|', () => {
                cy.get('@input')
                    .type('311')
                    .should('have.value', '31.1')
                    .type('3')
                    .should('have.value', '31.1')
                    .should('have.prop', 'selectionStart', '31.1'.length)
                    .should('have.prop', 'selectionEnd', '31.1'.length);
            });
        });
    });

    describe('[mode]="mm/dd/yyyy"', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?mode=mm%2Fdd%2Fyyyy&separator=/`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        describe('handles month value exceeding maximum', () => {
            it('Type 13 => 01/3', () => {
                cy.get('@input')
                    .type('13')
                    .should('have.value', '01/3')
                    .should('have.prop', 'selectionStart', '01/3'.length)
                    .should('have.prop', 'selectionEnd', '01/3'.length);
            });
        });
    });

    describe('[mode]="yyyy/mm/dd"', () => {
        beforeEach(() => {
            cy.visit(
                `/${DemoPath.Date}/API?mode=${encodeURIComponent('yyyy/mm/dd')}&separator=${encodeURIComponent('/')}`,
            );
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        describe('if users enters two digits and its combination exceeds the first (and only first!) non-year date segment - pad the first digit with zero', () => {
            it('2025 => Type 35 => 2025/03/05|', () => {
                cy.get('@input')
                    .type('202535')
                    .should('have.value', '2025/03/05')
                    .should('have.prop', 'selectionStart', '2025/03/05'.length)
                    .should('have.prop', 'selectionEnd', '2025/03/05'.length);
            });

            it('2025/|09/30 => Type 1 => 2025/1|0/30', () => {
                cy.get('@input')
                    .type('2025930')
                    .should('have.value', '2025/09/30')
                    .type('{leftArrow}'.repeat('09/30'.length))
                    .should('have.prop', 'selectionStart', '2025/'.length)
                    .should('have.prop', 'selectionEnd', '2025/'.length)
                    .type('1')
                    .should('have.value', '2025/10/30')
                    .should('have.prop', 'selectionStart', '2025/1'.length)
                    .should('have.prop', 'selectionEnd', '2025/1'.length);
            });

            it('2025.01.3| => Type 5 => 2025.01.3|', () => {
                cy.get('@input')
                    .type('2025013')
                    .should('have.value', '2025/01/3')
                    .type('5')
                    .should('have.value', '2025/01/3')
                    .should('have.prop', 'selectionStart', '2025/01/3'.length)
                    .should('have.prop', 'selectionEnd', '2025/01/3'.length);
            });
        });
    });
});
