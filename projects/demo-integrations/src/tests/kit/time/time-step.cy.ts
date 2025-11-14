import {DemoPath} from '@demo/constants';
import {BROWSER_SUPPORTS_REAL_EVENTS} from 'projects/demo-integrations/src/support/constants';

import {withCaretLabel} from '../../utils';

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

                it('{downArrow} => |23 => 23| => type {upArrow} => 23:01', () => {
                    cy.get('@input')
                        .type('{downArrow}')
                        .should('have.value', '23')
                        .should('have.a.prop', 'selectionStart', 0)
                        .should('have.a.prop', 'selectionEnd', 0)
                        .type('{rightArrow}'.repeat(2))
                        .type(':{upArrow}')
                        .should('have.value', '23:01');
                });

                it('{downArrow} => |23 => 23| => type :{downArrow} => 23:59', () => {
                    cy.get('@input')
                        .type('{downArrow}')
                        .should('have.value', '23')
                        .should('have.a.prop', 'selectionStart', 0)
                        .should('have.a.prop', 'selectionEnd', 0)
                        .type('{rightArrow}'.repeat(2))
                        .type(':{downArrow}')
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
                        .should('have.a.prop', 'selectionEnd', 1)
                        .type('{upArrow}')
                        .should('have.value', '13')
                        .should('have.a.prop', 'selectionStart', 1)
                        .should('have.a.prop', 'selectionEnd', 1)
                        .type('{rightArrow}')
                        .should('have.a.prop', 'selectionStart', 2)
                        .should('have.a.prop', 'selectionEnd', 2)
                        .type('{downArrow}')
                        .should('have.value', '12')
                        .should('have.a.prop', 'selectionStart', 2)
                        .should('have.a.prop', 'selectionEnd', 2);
                });

                it('type 12:{upArrow}{rightArrow}{downArrow}{rightArrow}{downArrow} => 12:59', () => {
                    cy.get('@input')
                        .type('12:{upArrow}')
                        .type('{rightArrow}{downArrow}'.repeat(2))
                        .should('have.value', '12:59');
                });

                it('12|:0 => {upArrow} => 13|:0', () => {
                    cy.get('@input')
                        .type('12:0')
                        .type('{leftArrow}'.repeat(2))
                        .type('{upArrow}')
                        .should('have.value', '13:0')
                        .should('have.a.prop', 'selectionStart', 2)
                        .should('have.a.prop', 'selectionEnd', 2);
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
        });

        describe('HH:MM AA', () => {
            describe('step = 1', () => {
                beforeEach(() => {
                    cy.visit(`/${DemoPath.Time}/API?mode=HH:MM%20AA&step=1`);
                    cy.get('#demo-content input')
                        .should('be.visible')
                        .first()
                        .focus()
                        .clear()
                        .as('textfield');
                });

                describe('time segment digits stepping', () => {
                    [
                        {value: '12:34 AM', caretIndex: 0, newValue: '01:34 AM'},
                        {value: '12:34 AM', caretIndex: '1'.length, newValue: '01:34 AM'},
                        {
                            value: '12:34 AM',
                            caretIndex: '12'.length,
                            newValue: '01:34 AM',
                        },
                        {
                            value: '12:34 AM',
                            caretIndex: '12:'.length,
                            newValue: '12:35 AM',
                        },
                        {
                            value: '12:34 AM',
                            caretIndex: '12:3'.length,
                            newValue: '12:35 AM',
                        },
                        {
                            value: '12:34 AM',
                            caretIndex: '12:34'.length,
                            newValue: '12:35 AM',
                        },
                    ].forEach(({value, caretIndex, newValue}) => {
                        it(`${withCaretLabel(value, caretIndex)} --- ↑ --- ${withCaretLabel(newValue, caretIndex)}`, () => {
                            cy.get('@textfield')
                                .type(value)
                                .type(`{moveToStart}${'{rightArrow}'.repeat(caretIndex)}`)
                                .type('{upArrow}')
                                .should('have.value', newValue)
                                .should('have.a.prop', 'selectionStart', caretIndex)
                                .should('have.a.prop', 'selectionEnd', caretIndex);
                        });
                    });

                    [
                        {value: '12:34 PM', caretIndex: 0, newValue: '11:34 PM'},
                        {value: '12:34 PM', caretIndex: '1'.length, newValue: '11:34 PM'},
                        {
                            value: '12:34 PM',
                            caretIndex: '12'.length,
                            newValue: '11:34 PM',
                        },
                        {
                            value: '12:34 PM',
                            caretIndex: '12:'.length,
                            newValue: '12:33 PM',
                        },
                        {
                            value: '12:34 PM',
                            caretIndex: '12:3'.length,
                            newValue: '12:33 PM',
                        },
                        {
                            value: '12:34 PM',
                            caretIndex: '12:34'.length,
                            newValue: '12:33 PM',
                        },
                    ].forEach(({value, caretIndex, newValue}) => {
                        it(`${withCaretLabel(value, caretIndex)} --- ↓ --- ${withCaretLabel(newValue, caretIndex)}`, () => {
                            cy.get('@textfield')
                                .type(value)
                                .type(`{moveToStart}${'{rightArrow}'.repeat(caretIndex)}`)
                                .type('{downArrow}')
                                .should('have.value', newValue)
                                .should('have.a.prop', 'selectionStart', caretIndex)
                                .should('have.a.prop', 'selectionEnd', caretIndex);
                        });
                    });
                });

                describe('meridiem switching', () => {
                    [
                        {
                            value: '12:34 AM',
                            caretIndex: '12:34 '.length,
                            newValue: '12:34 PM',
                        },
                        {
                            value: '12:34 AM',
                            caretIndex: '12:34 A'.length,
                            newValue: '12:34 PM',
                        },
                        {
                            value: '12:34 AM',
                            caretIndex: '12:34 AM'.length,
                            newValue: '12:34 PM',
                        },
                    ].forEach(({value, caretIndex, newValue}) => {
                        it(`${withCaretLabel(value, caretIndex)} --- ↑ --- ${withCaretLabel(newValue, caretIndex)}`, () => {
                            cy.get('@textfield')
                                .type(value)
                                .type(`{moveToStart}${'{rightArrow}'.repeat(caretIndex)}`)
                                .type('{upArrow}')
                                .should('have.value', newValue)
                                .should('have.a.prop', 'selectionStart', caretIndex)
                                .should('have.a.prop', 'selectionEnd', caretIndex);
                        });
                    });

                    [
                        {
                            value: '12:34 PM',
                            caretIndex: '12:34 '.length,
                            newValue: '12:34 AM',
                        },
                        {
                            value: '12:34 PM',
                            caretIndex: '12:34 P'.length,
                            newValue: '12:34 AM',
                        },
                        {
                            value: '12:34 PM',
                            caretIndex: '12:34 PM'.length,
                            newValue: '12:34 AM',
                        },
                    ].forEach(({value, caretIndex, newValue}) => {
                        it(`${withCaretLabel(value, caretIndex)} --- ↓ --- ${withCaretLabel(newValue, caretIndex)}`, () => {
                            cy.get('@textfield')
                                .type(value)
                                .type(`{moveToStart}${'{rightArrow}'.repeat(caretIndex)}`)
                                .type('{downArrow}')
                                .should('have.value', newValue)
                                .should('have.a.prop', 'selectionStart', caretIndex)
                                .should('have.a.prop', 'selectionEnd', caretIndex);
                        });
                    });
                });
            });
        });

        describe('HH:MM:SS', () => {
            describe('step = 1', () => {
                beforeEach(() => {
                    cy.visit(`/${DemoPath.Time}/API?mode=HH:MM:SS&step=1`);
                    cy.get('#demo-content input')
                        .should('be.visible')
                        .first()
                        .focus()
                        .clear()
                        .as('input');
                });

                it('12|:0 => {upArrow} => 13|:0', () => {
                    cy.get('@input')
                        .type('12:0')
                        .type('{leftArrow}'.repeat(2))
                        .type('{upArrow}')
                        .should('have.value', '13:0')
                        .should('have.a.prop', 'selectionStart', 2)
                        .should('have.a.prop', 'selectionEnd', 2);
                });

                it('12:34|:5 => {downArrow} => 12:33|:5 ', () => {
                    cy.get('@input')
                        .type('12:34:5')
                        .type('{leftArrow}'.repeat(2))
                        .type('{downArrow}')
                        .should('have.value', '12:33:5')
                        .should('have.a.prop', 'selectionStart', 5)
                        .should('have.a.prop', 'selectionEnd', 5);
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

                it('correctly works for hour segments', () => {
                    cy.get('@input')
                        .type('{upArrow}')
                        .should('have.value', '01')
                        .type('{rightArrow}{upArrow}')
                        .should('have.value', '02')
                        .should('have.a.prop', 'selectionStart', 1)
                        .should('have.a.prop', 'selectionEnd', 1)
                        .type('{rightArrow}')
                        .type('{downArrow}'.repeat(3))
                        .should('have.value', '23')
                        .should('have.a.prop', 'selectionStart', 2)
                        .should('have.a.prop', 'selectionEnd', 2);
                });

                it('correctly works for minute segments', () => {
                    cy.get('@input')
                        .type('12:')
                        .should('have.value', '12:')
                        .should('have.a.prop', 'selectionStart', '12:'.length)
                        .should('have.a.prop', 'selectionEnd', '12:'.length)
                        .type('{upArrow}')
                        .should('have.a.prop', 'selectionStart', '12:'.length)
                        .should('have.a.prop', 'selectionEnd', '12:'.length)
                        .should('have.value', '12:01')
                        .type('{rightArrow}')
                        .type('{downArrow}'.repeat(2))
                        .should('have.a.prop', 'selectionStart', '12:5'.length)
                        .should('have.a.prop', 'selectionEnd', '12:5'.length)
                        .should('have.value', '12:59')
                        .type('{rightArrow}')
                        .type('{downArrow}'.repeat(4))
                        .should('have.a.prop', 'selectionStart', '12:55'.length)
                        .should('have.a.prop', 'selectionEnd', '12:55'.length)
                        .should('have.value', '12:55');
                });

                it('correctly works for second segments', () => {
                    cy.get('@input')
                        .type('1234:')
                        .should('have.value', '12:34:')
                        .should('have.a.prop', 'selectionStart', '12:34:'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:'.length)
                        .type('{upArrow}'.repeat(5))
                        .should('have.a.prop', 'selectionStart', '12:34:'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:'.length)
                        .should('have.value', '12:34:05')
                        .type('{rightArrow}')
                        .type('{downArrow}'.repeat(8))
                        .should('have.a.prop', 'selectionStart', '12:34:5'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:5'.length)
                        .should('have.value', '12:34:57')
                        .type('{rightArrow}')
                        .type('{upArrow}'.repeat(3))
                        .should('have.a.prop', 'selectionStart', '12:34:00'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:00'.length)
                        .should('have.value', '12:34:00');
                });

                it('correctly works for millisecond segments', () => {
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
                        .type('{rightArrow}')
                        .type('{upArrow}'.repeat(3))
                        .should('have.value', '12:34:56.025')
                        .should('have.a.prop', 'selectionStart', '12:34:56.02'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:56.02'.length)
                        .type('{rightArrow}')
                        .type('{downArrow}'.repeat(29))
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

                it('correctly works for millisecond segments', () => {
                    cy.get('@input')
                        .type('123456.')
                        .should('have.value', '12:34:56.')
                        .type('{upArrow}'.repeat(20))
                        .should('have.value', '12:34:56.200')
                        .type('{downArrow}'.repeat(30))
                        .should('have.value', '12:34:56.900');
                });

                it('correctly works for each time segment', () => {
                    cy.get('@input')
                        .type('123456000')
                        .should('have.value', '12:34:56.000')
                        .should('have.a.prop', 'selectionStart', '12:34:56.000'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:56.000'.length)
                        .type('{downArrow}')
                        .should('have.value', '12:34:56.990')
                        .should('have.a.prop', 'selectionStart', '12:34:56.990'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:56.990'.length)
                        .type('{leftArrow}'.repeat(4))
                        .type('{downArrow}')
                        .should('have.value', '12:34:46.990')
                        .should('have.a.prop', 'selectionStart', '12:34:46'.length)
                        .should('have.a.prop', 'selectionEnd', '12:34:46'.length)
                        .type('{leftArrow}'.repeat(3))
                        .type('{upArrow}')
                        .should('have.value', '12:44:46.990')
                        .should('have.a.prop', 'selectionStart', '12:44'.length)
                        .should('have.a.prop', 'selectionEnd', '12:44'.length)
                        .type('{leftArrow}'.repeat(3))
                        .type('{upArrow}')
                        .should('have.value', '22:44:46.990')
                        .should('have.a.prop', 'selectionStart', '22'.length)
                        .should('have.a.prop', 'selectionEnd', '22'.length);
                });
            });
        });
    });
});
