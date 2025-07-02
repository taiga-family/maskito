import {DemoPath} from '@demo/constants';

import {range, withCaretLabel} from '../../utils';

describe('Time | modes with meridiem', () => {
    describe('HH:MM AA', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Time}/API?mode=HH:MM%20AA`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('textfield');
        });

        describe('basic text insertion works', () => {
            it('Empty textfield => Type 1234AM => 12:34 AM', () => {
                cy.get('@textfield')
                    .type('1234AM')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 AM'.length);
            });

            it('12:34| => Type lowercase `a` => 12:34 AM', () => {
                cy.get('@textfield')
                    .type('1234a')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 AM'.length);
            });

            it('12:34| => Type uppercase `A` => 12:34 AM', () => {
                cy.get('@textfield')
                    .type('1234A')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 AM'.length);
            });

            it('12:34| => Type lowercase `p` => 12:34 AM', () => {
                cy.get('@textfield')
                    .type('1234p')
                    .should('have.value', '12:34 PM')
                    .should('have.prop', 'selectionStart', '12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 PM'.length);
            });

            it('12:34| => Type uppercase `P` => 12:34 AM', () => {
                cy.get('@textfield')
                    .type('1234P')
                    .should('have.value', '12:34 PM')
                    .should('have.prop', 'selectionStart', '12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 PM'.length);
            });

            it('12:34| => Type lowercase `m` => 12:34', () => {
                cy.get('@textfield')
                    .type('1234m')
                    .should('have.value', '12:34')
                    .should('have.prop', 'selectionStart', '12:34'.length)
                    .should('have.prop', 'selectionEnd', '12:34'.length);
            });

            it('12:34| => Type uppercase `M` => 12:34', () => {
                cy.get('@textfield')
                    .type('1234M')
                    .should('have.value', '12:34')
                    .should('have.prop', 'selectionStart', '12:34'.length)
                    .should('have.prop', 'selectionEnd', '12:34'.length);
            });
        });

        describe('deletion of any meridiem characters deletes all meridiem character', () => {
            [
                {caretIndex: '12:34 AM'.length, action: '{backspace}'},
                {caretIndex: '12:34 A'.length, action: '{backspace}'},
                {caretIndex: '12:34 '.length, action: '{del}'},
                {caretIndex: '12:34 A'.length, action: '{del}'},
            ].forEach(({caretIndex, action}) => {
                const initialValue = '12:34 AM';

                it(`${withCaretLabel(initialValue, caretIndex)} => ${action} => 12:34|`, () => {
                    cy.get('@textfield')
                        .type('1234a')
                        .type('{moveToStart}')
                        .type('{rightArrow}'.repeat(caretIndex))
                        .type(action)
                        .should('have.value', '12:34')
                        .should('have.prop', 'selectionStart', '12:34'.length)
                        .should('have.prop', 'selectionEnd', '12:34'.length);
                });
            });
        });

        describe('type new meridiem value when textfield already has another one', () => {
            it('12:34 AM| => Type P => 12:34 PM|', () => {
                cy.get('@textfield')
                    .type('1234a')
                    .type('{moveToEnd}')
                    .type('p')
                    .should('have.value', '12:34 PM')
                    .should('have.prop', 'selectionStart', '12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 PM'.length);
            });

            it('12:34 A|M => Type P => 12:34 PM|', () => {
                cy.get('@textfield')
                    .type('1234a')
                    .type('{moveToEnd}{leftArrow}')
                    .type('p')
                    .should('have.value', '12:34 PM')
                    .should('have.prop', 'selectionStart', '12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 PM'.length);
            });

            it('12:34 |AM => Type P => 12:34 PM|', () => {
                cy.get('@textfield')
                    .type('1234a')
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat(2))
                    .type('p')
                    .should('have.value', '12:34 PM')
                    .should('have.prop', 'selectionStart', '12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 PM'.length);
            });

            it('12:34| AM => Type P => 12:34 PM|', () => {
                cy.get('@textfield')
                    .type('1234a')
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat(' AM'.length))
                    .type('p')
                    .should('have.value', '12:34 PM')
                    .should('have.prop', 'selectionStart', '12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 PM'.length);
            });

            it('12:34 PM| => Type A => 12:34 AM|', () => {
                cy.get('@textfield')
                    .type('1234p')
                    .type('{moveToEnd}')
                    .type('a')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 AM'.length);
            });

            it('12:34 P|M => Type A => 12:34 AM|', () => {
                cy.get('@textfield')
                    .type('1234p')
                    .type('{moveToEnd}{leftArrow}')
                    .type('A')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 AM'.length);
            });

            it('12:34 |PM => Type A => 12:34 AM|', () => {
                cy.get('@textfield')
                    .type('1234p')
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat(2))
                    .type('a')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 AM'.length);
            });

            it('12:34| PM => Type A => 12:34 AM|', () => {
                cy.get('@textfield')
                    .type('1234p')
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat(' PM'.length))
                    .type('a')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 AM'.length);
            });
        });

        describe('press any characters (except part of meridiem ones) when cursor is placed near already existing meridiem', () => {
            beforeEach(() => {
                cy.get('@textfield')
                    .type('1234a')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 AM'.length);
            });

            it('12:34 AM| => Press 1 => Nothing changed', () => {
                cy.get('@textfield')
                    .type('{moveToEnd}')
                    .type('1')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '12:34 AM'.length);
            });

            it('12:34 A|M => Press 1 => Nothing changed', () => {
                cy.get('@textfield')
                    .type('{moveToEnd}{leftArrow}')
                    .type('1')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 A'.length)
                    .should('have.prop', 'selectionEnd', '12:34 A'.length);
            });

            it('12:34 A|M => Press T => Nothing changed', () => {
                cy.get('@textfield')
                    .type('{moveToEnd}{leftArrow}')
                    .type('t')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 A'.length)
                    .should('have.prop', 'selectionEnd', '12:34 A'.length);
            });

            it('12:34 |AM => Press T => Nothing changed', () => {
                cy.get('@textfield')
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat(2))
                    .type('t')
                    .should('have.value', '12:34 AM')
                    .should('have.prop', 'selectionStart', '12:34 '.length)
                    .should('have.prop', 'selectionEnd', '12:34 '.length);
            });
        });

        describe('hour segment bounds', () => {
            it('cannot be less than 01 (rejects zero as the 2nd hour segment)', () => {
                cy.get('@textfield')
                    .type('00')
                    .should('have.value', '0')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            it('can be 1 (as the 1st digit segment)', () => {
                cy.get('@textfield')
                    .type('1')
                    .should('have.value', '1')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });

            describe('automatically pads with zero', () => {
                range(2, 9).forEach((x) => {
                    it(`on attempt to enter ${x} as the first hour segment`, () => {
                        cy.get('@textfield')
                            .type(String(x))
                            .should('have.value', `0${x}`)
                            .should('have.prop', 'selectionStart', 2)
                            .should('have.prop', 'selectionEnd', 2);
                    });
                });
            });

            range(10, 12).forEach((x) => {
                const value = String(x);

                it(`can be ${x}`, () => {
                    cy.get('@textfield')
                        .type(value)
                        .should('have.value', value)
                        .should('have.prop', 'selectionStart', 2)
                        .should('have.prop', 'selectionEnd', 2);
                });
            });

            describe('rejects insertion', () => {
                range(13, 19).forEach((x) => {
                    it(`on attempt to enter ${x} as the last hour segment`, () => {
                        cy.get('@textfield')
                            .type(String(x))
                            .should('have.value', '1')
                            .should('have.prop', 'selectionStart', 1)
                            .should('have.prop', 'selectionEnd', 1);
                    });
                });
            });
        });

        describe('toggle meridiem value on ArrowUp / ArrowDown', () => {
            describe('Initial value === "12:34 |"', () => {
                beforeEach(() => {
                    cy.get('@textfield').type('1234 ');
                });

                it('↑ --- 12:34 |AM', () => {
                    cy.get('@textfield')
                        .type('{upArrow}')
                        .should('have.value', '12:34 AM')
                        .should('have.prop', 'selectionStart', '12:34 '.length)
                        .should('have.prop', 'selectionEnd', '12:34 '.length);
                });

                it('↓ --- 12:34 |PM', () => {
                    cy.get('@textfield')
                        .type('{downArrow}')
                        .should('have.value', '12:34 PM')
                        .should('have.prop', 'selectionStart', '12:34 '.length)
                        .should('have.prop', 'selectionEnd', '12:34 '.length);
                });
            });

            describe('Initial value === "12:34 AM"', () => {
                const initialValue = '12:34 AM';
                const toggledValue = '12:34 PM';

                beforeEach(() => {
                    cy.get('@textfield')
                        .type('1234a')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                ['12:34 '.length, '12:34 A'.length, '12:34 AM'.length].forEach(
                    (initialCaretIndex) => {
                        const initialValueWithCaretLabel = withCaretLabel(
                            initialValue,
                            initialCaretIndex,
                        );
                        const toggledValueWithCaretLabel = withCaretLabel(
                            toggledValue,
                            initialCaretIndex,
                        );

                        it(`${initialValueWithCaretLabel} --- ↑ --- ${toggledValueWithCaretLabel}`, () => {
                            cy.get('@textfield')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{upArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });

                        it(`${initialValueWithCaretLabel} --- ↓ --- ${toggledValueWithCaretLabel}`, () => {
                            cy.get('@textfield')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{downArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });
                    },
                );
            });

            describe('Initial value === "01:01 PM"', () => {
                const initialValue = '01:01 PM';
                const toggledValue = '01:01 AM';

                beforeEach(() => {
                    cy.get('@textfield')
                        .type('0101p')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                ['01:01 '.length, '01:01 P'.length, '01:01 PM'.length].forEach(
                    (initialCaretIndex) => {
                        const initialValueWithCaretLabel = withCaretLabel(
                            initialValue,
                            initialCaretIndex,
                        );
                        const toggledValueWithCaretLabel = withCaretLabel(
                            toggledValue,
                            initialCaretIndex,
                        );

                        it(`${initialValueWithCaretLabel} --- ↑ --- ${toggledValueWithCaretLabel}`, () => {
                            cy.get('@textfield')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{upArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });

                        it(`${initialValueWithCaretLabel} --- ↓ --- ${toggledValueWithCaretLabel}`, () => {
                            cy.get('@textfield')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{downArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });
                    },
                );
            });

            describe('do nothing when caret is put after any time segment', () => {
                it('Empty textfield --- ↑↓ --- Empty textfield', () => {
                    cy.get('@textfield')
                        .should('have.value', '')
                        .type('{upArrow}')
                        .should('have.value', '')
                        .type('{downArrow}')
                        .should('have.value', '');
                });

                ['1', '12', '12:', '12:3', '12:34'].forEach((textfieldValue) => {
                    it(`${textfieldValue} --- ↑↓ --- ${textfieldValue}`, () => {
                        cy.get('@textfield')
                            .type(textfieldValue)
                            .should('have.value', textfieldValue)
                            .type('{upArrow}')
                            .should('have.value', textfieldValue)
                            .type('{downArrow}')
                            .should('have.value', textfieldValue);
                    });
                });
            });
        });
    });
});
