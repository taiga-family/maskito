import {DemoPath} from '@demo/constants';

import {range} from '../../utils';

describe('Time | [timeSegmentMaxValues] property', () => {
    describe('{hours: 5, minutes: 5, seconds: 5, milliseconds: 5}', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Time}/API?mode=HH:MM&timeSegmentMaxValues$=3`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('textfield');
        });

        describe('hour segment', () => {
            describe('rejects all digits > 5 as the 1st digit (and does not pad them)', () => {
                range(6, 9).forEach((digit) => {
                    it(`Empty textfield => type ${digit} => empty textfield`, () => {
                        cy.get('@textfield')
                            .type(`${digit}`)
                            .should('have.value', '')
                            .should('have.prop', 'selectionStart', 0)
                            .should('have.prop', 'selectionEnd', 0);
                    });
                });
            });

            describe('pads the first hour digit with zero for typed digits <=5', () => {
                range(1, 5).forEach((digit) => {
                    it(`Empty textfield => type ${digit} => 0${digit}`, () => {
                        cy.get('@textfield')
                            .type(`${digit}`)
                            .should('have.value', `0${digit}`)
                            .should('have.prop', 'selectionStart', 2)
                            .should('have.prop', 'selectionEnd', 2);
                    });
                });
            });

            it('accepts 0 as the 1st hour digit', () => {
                cy.get('@textfield')
                    .type('0')
                    .should('have.value', '0')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            describe('rejects all digits > 5 as the 2nd digit', () => {
                range(6, 9).forEach((digit) => {
                    it(`Empty textfield => type 0${digit} => 0`, () => {
                        cy.get('@textfield')
                            .type(`0${digit}`)
                            .should('have.value', '0')
                            .should('have.prop', 'selectionStart', 1)
                            .should('have.prop', 'selectionEnd', 1);
                    });
                });
            });

            describe('accepts all digits <=5 as the 2nd hour digit', () => {
                range(0, 5).forEach((digit) => {
                    it(`Empty textfield => type 0${digit} => 0${digit}`, () => {
                        cy.get('@textfield')
                            .type(`0${digit}`)
                            .should('have.value', `0${digit}`)
                            .should('have.prop', 'selectionStart', 2)
                            .should('have.prop', 'selectionEnd', 2);
                    });
                });
            });

            it('05:05 => type 1 => 00:01', () => {
                cy.get('@textfield')
                    .type('0505')
                    .should('have.value', '05:05')
                    .type('{moveToStart}')
                    .type('1')
                    .should('have.value', '01:05')
                    .should('have.prop', 'selectionStart', '01:'.length)
                    .should('have.prop', 'selectionEnd', '01:'.length);
            });
        });

        describe('minute segment', () => {
            describe('rejects all digits > 5 as the 1st minute digit (and does not pad them)', () => {
                range(6, 9).forEach((digit) => {
                    it(`00 => type ${digit} => 00`, () => {
                        cy.get('@textfield')
                            .type(`00${digit}`)
                            .should('have.value', '00')
                            .should('have.prop', 'selectionStart', 2)
                            .should('have.prop', 'selectionEnd', 2);
                    });
                });
            });

            describe('pads the first minute digit with zero for typed digits <=5', () => {
                range(1, 5).forEach((digit) => {
                    it(`00 => type ${digit} => 0${digit}`, () => {
                        cy.get('@textfield')
                            .type(`00${digit}`)
                            .should('have.value', `00:0${digit}`)
                            .should('have.prop', 'selectionStart', `00:0${digit}`.length)
                            .should('have.prop', 'selectionEnd', `00:0${digit}`.length);
                    });
                });
            });

            it('accepts 0 as the 1st minute digit', () => {
                cy.get('@textfield')
                    .type('000')
                    .should('have.value', '00:0')
                    .should('have.prop', 'selectionStart', '00:0'.length)
                    .should('have.prop', 'selectionEnd', '00:0'.length);
            });

            describe('rejects all digits > 5 as the 2nd minute digit', () => {
                range(6, 9).forEach((digit) => {
                    it(`00 => type 0${digit} => 0`, () => {
                        cy.get('@textfield')
                            .type(`000${digit}`)
                            .should('have.value', '00:0')
                            .should('have.prop', 'selectionStart', '00:0'.length)
                            .should('have.prop', 'selectionEnd', '00:0'.length);
                    });
                });
            });

            describe('accepts all digits <=5 as the 2nd hour digit', () => {
                range(0, 5).forEach((digit) => {
                    it(`00:0 => type 0${digit} => 0${digit}`, () => {
                        cy.get('@textfield')
                            .type(`000${digit}`)
                            .should('have.value', `00:0${digit}`)
                            .should('have.prop', 'selectionStart', `00:0${digit}`.length)
                            .should('have.prop', 'selectionEnd', `00:0${digit}`.length);
                    });
                });
            });

            it('00:|02 => type 1 => 00:01', () => {
                cy.get('@textfield')
                    .type('0002')
                    .should('have.value', '00:02')
                    .type('{leftArrow}'.repeat(2))
                    .should('have.prop', 'selectionStart', '00:'.length)
                    .should('have.prop', 'selectionEnd', '00:'.length)
                    .type('1')
                    .should('have.value', '00:01')
                    .should('have.prop', 'selectionStart', '00:01'.length)
                    .should('have.prop', 'selectionEnd', '00:01'.length);
            });
        });
    });
});
