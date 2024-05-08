import {DemoPath} from '@demo/constants';
import {BROWSER_SUPPORTS_REAL_EVENTS} from 'projects/demo-integrations/src/support/constants';

describe('Time', () => {
    describe('Mode', () => {
        describe('HH:MM', () => {
            describe('step = 1', () => {
                beforeEach(() => {
                    cy.visit(`/${DemoPath.Time}/API?mode=HH:MM&step=1`);
                    cy.get('#demo-content input')
                        .should('be.visible')
                        .first()
                        .focus()
                        .clear()
                        .as('input');
                });

                it('empty field => {upArrow} => 01', () => {
                    cy.get('@input').type('{upArrow}').should('have.value', '01');
                });

                it('type 2 + type {upArrow} => 21', () => {
                    cy.get('@input').type('2{upArrow}').should('have.value', '21');
                });

                it('{downArrow} => |23 => 23| => type :{upArrow} => 23:01', () => {
                    cy.get('@input')
                        .type('{downArrow}')
                        .should('have.value', '23')
                        .should('have.a.prop', 'selectionStart', 0)
                        .should('have.a.prop', 'selectionEnd', 0)
                        .type(`${'{rightArrow}'.repeat(2)}:{upArrow}`)
                        .should('have.value', '23:01');
                });

                it('{downArrow} => |23 => 23| => type :{upDown} => 23:59', () => {
                    cy.get('@input')
                        .type('{downArrow}')
                        .should('have.value', '23')
                        .should('have.a.prop', 'selectionStart', 0)
                        .should('have.a.prop', 'selectionEnd', 0)
                        .type(`${'{rightArrow}'.repeat(2)}:{downArrow}`)
                        .should('have.value', '23:59');
                });

                it('{upArrow}*24 => 00', () => {
                    cy.get('@input')
                        .type('{upArrow}'.repeat(24))
                        .should('have.value', '00');
                });

                it('type {upArrow}*12 => |12 => 1|2 => type {upArrow} => 1|3 => 13| => type {downArrow} => 12|', () => {
                    cy.get('@input')
                        .type('{upArrow}'.repeat(12))
                        .should('have.value', '12')
                        .should('have.a.prop', 'selectionStart', 0)
                        .should('have.a.prop', 'selectionEnd', 0)
                        .type('{rightArrow}')
                        .should('have.a.prop', 'selectionStart', 1)
                        .should('have.a.prop', 'selectionStart', 1)
                        .type('{upArrow}')
                        .should('have.value', '13')
                        .should('have.a.prop', 'selectionStart', 1)
                        .should('have.a.prop', 'selectionStart', 1)
                        .type('{rightArrow}')
                        .should('have.a.prop', 'selectionStart', 2)
                        .should('have.a.prop', 'selectionStart', 2)
                        .type('{downArrow}')
                        .should('have.value', '12')
                        .should('have.a.prop', 'selectionStart', 2)
                        .should('have.a.prop', 'selectionStart', 2);
                });

                it('type 12:{upArrow}{rightArrow}{downArrow}{rightArrow}{downArrow} => 12:59', () => {
                    cy.get('@input')
                        .type(
                            '12:{upArrow}{rightArrow}{downArrow}{rightArrow}{downArrow}',
                        )
                        .should('have.value', '12:59');
                });
            });

            describe('step = 0', () => {
                beforeEach(() => {
                    cy.visit(`/${DemoPath.Time}/API?mode=HH:MM&step=0`);
                    cy.get('#demo-content input')
                        .should('be.visible')
                        .first()
                        .focus()
                        .clear()
                        .as('input');
                });

                it('should be disabled', BROWSER_SUPPORTS_REAL_EVENTS, () => {
                    cy.get('@input').type('1212').realPress('ArrowUp');

                    cy.get('@input')
                        .should('have.a.prop', 'selectionStart', 0)
                        .should('have.a.prop', 'selectionEnd', 0)
                        .realPress('ArrowDown');

                    cy.get('@input')
                        .should('have.a.prop', 'selectionStart', '12:12'.length)
                        .should('have.a.prop', 'selectionEnd', '12:12'.length);
                });
            });

            describe('step = -2', () => {
                beforeEach(() => {
                    cy.visit(`/${DemoPath.Time}/API?mode=HH:MM&step=-2`);
                    cy.get('#demo-content input')
                        .should('be.visible')
                        .first()
                        .focus()
                        .clear()
                        .as('input');
                });

                it('should be disabled', BROWSER_SUPPORTS_REAL_EVENTS, () => {
                    cy.get('@input').type('1212').realPress('ArrowUp');

                    cy.get('@input')
                        .should('have.a.prop', 'selectionStart', 0)
                        .should('have.a.prop', 'selectionEnd', 0)
                        .realPress('ArrowDown');

                    cy.get('@input')
                        .should('have.a.prop', 'selectionStart', '12:12'.length)
                        .should('have.a.prop', 'selectionEnd', '12:12'.length);
                });
            });
        });

        describe('HH:MM:SS.MSS', () => {
            describe('step = 1', () => {
                beforeEach(() => {
                    cy.visit(`/${DemoPath.Time}/API?mode=HH:MM:SS.MSS&step=1`);
                    cy.get('#demo-content input')
                        .should('be.visible')
                        .first()
                        .focus()
                        .clear()
                        .as('input');
                });

                it("type 'up' => |01 => type 'right'+'up' => 0|2 => type 'right' + 'down' * 3 => 23|", () => {
                    cy.get('@input')
                        .type('{upArrow}')
                        .should('have.value', '01')
                        .type('{rightArrow}{upArrow}')
                        .should('have.value', '02')
                        .should('have.a.prop', 'selectionStart', 1)
                        .should('have.a.prop', 'selectionEnd', 1)
                        .type(`{rightArrow}${'{downArrow}'.repeat(3)}`)
                        .should('have.value', '23')
                        .should('have.a.prop', 'selectionStart', 2)
                        .should('have.a.prop', 'selectionEnd', 2);
                });

                it("type 12: => 12:| => 'up' => 12:|01 => 'right' + 'down' * 2 => 12:5|9 => 'right' + 'down' * 4 => 12:55|", () => {
                    cy.get('@input')
                        .type('12:')
                        .should('have.value', '12:')
                        .should('have.a.prop', 'selectionStart', '12:'.length)
                        .should('have.a.prop', 'selectionEnd', '12:'.length)
                        .type('{upArrow}')
                        .should('have.a.prop', 'selectionStart', '12:'.length)
                        .should('have.a.prop', 'selectionEnd', '12:'.length)
                        .should('have.value', '12:01')
                        .type(`{rightArrow}${'{downArrow}'.repeat(2)}`)
                        .should('have.a.prop', 'selectionStart', '12:5'.length)
                        .should('have.a.prop', 'selectionEnd', '12:5'.length)
                        .should('have.value', '12:59')
                        .type(`{rightArrow}${'{downArrow}'.repeat(4)}`)
                        .should('have.a.prop', 'selectionStart', '12:55'.length)
                        .should('have.a.prop', 'selectionEnd', '12:55'.length)
                        .should('have.value', '12:55');
                });

                it("type 1234: => 12:34:| => type 'up' * 5 => 12:34:|05 => type 'right' + 'down' * 8 => 12:34:5|7 => type 'right' + 'up' * 3 => 12:34:00|", () => {
                    cy.get('@input')
                        .type('1234:')
                        .should('have.value', '12:34:')
                        .should('have.a.prop', 'selectionStart', '12:34:'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:'.length)
                        .type('{upArrow}'.repeat(5))
                        .should('have.a.prop', 'selectionStart', '12:34:'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:'.length)
                        .should('have.value', '12:34:05')
                        .type(`{rightArrow}${'{downArrow}'.repeat(8)}`)
                        .should('have.a.prop', 'selectionStart', '12:34:5'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:5'.length)
                        .should('have.value', '12:34:57')
                        .type(`{rightArrow}${'{upArrow}'.repeat(3)}`)
                        .should('have.a.prop', 'selectionStart', '12:34:00'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:00'.length)
                        .should('have.value', '12:34:00');
                });

                it("type 123456. => 12:34:56.| => type 'up' * 23 => 12:34:56.|023 => type 'right' + 'down' => 12:34:56.0|22 => type 'right' + 'up' * 3 => 12:34:56.02|5 => type 'right' + 'down' * 29 => 12:34:56.996", () => {
                    cy.get('@input')
                        .type('123456.')
                        .should('have.value', '12:34:56.')
                        .should('have.a.prop', 'selectionStart', '12:34:56.'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:56.'.length)
                        .type('{upArrow}'.repeat(23))
                        .should('have.value', '12:34:56.023')
                        .should('have.a.prop', 'selectionStart', '12:34:56.'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:56.'.length)
                        .type('{rightArrow}{downArrow}')
                        .should('have.value', '12:34:56.022')
                        .should('have.a.prop', 'selectionStart', '12:34:56.0'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:56.0'.length)
                        .type(`{rightArrow}${'{upArrow}'.repeat(3)}`)
                        .should('have.value', '12:34:56.025')
                        .should('have.a.prop', 'selectionStart', '12:34:56.02'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:56.02'.length)
                        .type(`{rightArrow}${'{downArrow}'.repeat(29)}`)
                        .should('have.value', '12:34:56.996')
                        .should('have.a.prop', 'selectionStart', '12:34:56.996'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:56.996'.length);
                });
            });

            describe('step = 10', () => {
                beforeEach(() => {
                    cy.visit(`/${DemoPath.Time}/API?mode=HH:MM:SS.MSS&step=10`);
                    cy.get('#demo-content input')
                        .should('be.visible')
                        .first()
                        .focus()
                        .clear()
                        .as('input');
                });

                it('type 123456. => 12:34:56. => type {upArrow} * 20 => 12:34.56.200 => type {downArrow} * 30 => 12:34:56.900', () => {
                    cy.get('@input')
                        .type('123456.')
                        .should('have.value', '12:34:56.')
                        .type('{upArrow}'.repeat(20))
                        .should('have.value', '12:34:56.200')
                        .type('{downArrow}'.repeat(30))
                        .should('have.value', '12:34:56.900');
                });

                it('type 123456000 => 12:34:56.000| => type {downArrow} => 12:34:56.990| => type {leftArrow} * 4 + {downArrow} => 12:34:46|.990 => type {leftArrow} * 3 + {upArrow} => 12:44|:46.990 => type {leftArrow} * 3 + {upArrow} => 22|:44:46.990', () => {
                    cy.get('@input')
                        .type('123456000')
                        .should('have.value', '12:34:56.000')
                        .should('have.a.prop', 'selectionStart', '12:34:56.000'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:56.000'.length)
                        .type('{downArrow}')
                        .should('have.value', '12:34:56.990')
                        .should('have.a.prop', 'selectionStart', '12:34:56.990'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:56.990'.length)
                        .type(`${'{leftArrow}'.repeat(4)}{downArrow}`)
                        .should('have.value', '12:34:46.990')
                        .should('have.a.prop', 'selectionStart', '12:34:46'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:46'.length)
                        .type(`${'{leftArrow}'.repeat(3)}{upArrow}`)
                        .should('have.value', '12:44:46.990')
                        .should('have.a.prop', 'selectionStart', '12:44'.length)
                        .should('have.a.prop', 'selectionEnd', '12:44'.length)
                        .type(`${'{leftArrow}'.repeat(3)}{upArrow}`)
                        .should('have.value', '22:44:46.990')
                        .should('have.a.prop', 'selectionStart', '22'.length)
                        .should('have.a.prop', 'selectionEnd', '22'.length);
                });
            });
        });
    });
});
