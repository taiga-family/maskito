import {DemoPath} from '@demo/constants';

import {range, withCaretLabel} from '../../utils';

describe('DateTime | time modes with meridiem', () => {
    describe('HH:MM AA', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateTime}/API?timeMode=HH:MM%20AA`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('textfield');
        });

        describe('basic text insertion works', () => {
            it('Empty textfield => Type 1234AM => 12:34 AM', () => {
                cy.get('@textfield')
                    .type('9920001234AM')
                    .should('have.value', '09.09.2000, 12:34 AM')
                    .should('have.prop', 'selectionStart', '09.09.2000, 12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '09.09.2000, 12:34 AM'.length);
            });

            it('<any date>12:34| => Type lowercase `a` => <any date>12:34 AM', () => {
                cy.get('@textfield')
                    .type('01.01.20001234a')
                    .should('have.value', '01.01.2000, 12:34 AM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 AM'.length);
            });

            it('<any date>12:34| => Type uppercase `A` => <any date>12:34 AM', () => {
                cy.get('@textfield')
                    .type('01.01.20001234A')
                    .should('have.value', '01.01.2000, 12:34 AM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 AM'.length);
            });

            it('<any date>12:34| => Type lowercase `p` => <any date>12:34 PM', () => {
                cy.get('@textfield')
                    .type('01.01.20001234p')
                    .should('have.value', '01.01.2000, 12:34 PM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 PM'.length);
            });

            it('<any date>12:34| => Type uppercase `P` => <any date>12:34 PM', () => {
                cy.get('@textfield')
                    .type('01.01.20001234P')
                    .should('have.value', '01.01.2000, 12:34 PM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 PM'.length);
            });

            it('<any date>12:34| => Type lowercase `m` => <any date>12:34|', () => {
                cy.get('@textfield')
                    .type('01.01.20001234m')
                    .should('have.value', '01.01.2000, 12:34')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34'.length);
            });

            it('<any date>12:34| => Type uppercase `M` => <any date>12:34|', () => {
                cy.get('@textfield')
                    .type('01.01.20001234M')
                    .should('have.value', '01.01.2000, 12:34')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34'.length);
            });
        });

        describe('deletion of any meridiem characters deletes all meridiem character', () => {
            [
                {caretIndex: '01.01.2000, 12:34 AM'.length, action: '{backspace}'},
                {caretIndex: '01.01.2000, 12:34 A'.length, action: '{backspace}'},
                {caretIndex: '01.01.2000, 12:34 '.length, action: '{del}'},
                {caretIndex: '01.01.2000, 12:34 A'.length, action: '{del}'},
            ].forEach(({caretIndex, action}) => {
                const initialValue = '01.01.2000, 12:34 AM';

                it(`${withCaretLabel(initialValue, caretIndex)} => ${action} => 12:34|`, () => {
                    cy.get('@textfield')
                        .type('01.01.2000 1234a')
                        .should('have.value', initialValue)
                        .type('{moveToStart}')
                        .type('{rightArrow}'.repeat(caretIndex))
                        .type(action)
                        .should('have.value', '01.01.2000, 12:34')
                        .should('have.prop', 'selectionStart', '01.01.2000, 12:34'.length)
                        .should('have.prop', 'selectionEnd', '01.01.2000, 12:34'.length);
                });
            });
        });

        describe('type new meridiem value when textfield already has another one', () => {
            it('<any date>12:34 AM| => Type P => <any date>12:34 PM|', () => {
                cy.get('@textfield')
                    .type('01.01.2000 1234a')
                    .should('have.value', '01.01.2000, 12:34 AM')
                    .type('{moveToEnd}')
                    .type('p')
                    .should('have.value', '01.01.2000, 12:34 PM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 PM'.length);
            });

            it('<any date>12:34 A|M => Type P => <any date>12:34 PM|', () => {
                cy.get('@textfield')
                    .type('01.01.2000 1234a')
                    .should('have.value', '01.01.2000, 12:34 AM')
                    .type('{moveToEnd}{leftArrow}')
                    .type('p')
                    .should('have.value', '01.01.2000, 12:34 PM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 PM'.length);
            });

            it('<any date>12:34 |AM => Type P => <any date>12:34 PM|', () => {
                cy.get('@textfield')
                    .type('01.01.2000 1234a')
                    .should('have.value', '01.01.2000, 12:34 AM')
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat(2))
                    .type('p')
                    .should('have.value', '01.01.2000, 12:34 PM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 PM'.length);
            });

            it('<any date>12:34| AM => Type P => <any date>12:34 PM|', () => {
                cy.get('@textfield')
                    .type('01.01.2000 1234a')
                    .should('have.value', '01.01.2000, 12:34 AM')
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat(' AM'.length))
                    .type('p')
                    .should('have.value', '01.01.2000, 12:34 PM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 PM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 PM'.length);
            });

            it('<any date>12:34 PM| => Type A => <any date>12:34 AM|', () => {
                cy.get('@textfield')
                    .type('01.01.2000 1234p')
                    .should('have.value', '01.01.2000, 12:34 PM')
                    .type('{moveToEnd}')
                    .type('a')
                    .should('have.value', '01.01.2000, 12:34 AM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 AM'.length);
            });

            it('<any date>12:34 P|M => Type A => <any date>12:34 AM|', () => {
                cy.get('@textfield')
                    .type('01.01.2000 1234p')
                    .should('have.value', '01.01.2000, 12:34 PM')
                    .type('{moveToEnd}{leftArrow}')
                    .type('A')
                    .should('have.value', '01.01.2000, 12:34 AM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 AM'.length);
            });

            it('<any date>12:34 |PM => Type A => <any date>12:34 AM|', () => {
                cy.get('@textfield')
                    .type('01.01.2000 1234p')
                    .should('have.value', '01.01.2000, 12:34 PM')
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat(2))
                    .type('a')
                    .should('have.value', '01.01.2000, 12:34 AM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 AM'.length);
            });

            it('<any date>12:34| PM => Type A => <any date>12:34 AM|', () => {
                cy.get('@textfield')
                    .type('01.01.2000 1234p')
                    .should('have.value', '01.01.2000, 12:34 PM')
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat(' PM'.length))
                    .type('a')
                    .should('have.value', '01.01.2000, 12:34 AM')
                    .should('have.prop', 'selectionStart', '01.01.2000, 12:34 AM'.length)
                    .should('have.prop', 'selectionEnd', '01.01.2000, 12:34 AM'.length);
            });
        });

        describe('hour segment bounds', () => {
            const beforeTimeValue = '01.01.2000, ';

            beforeEach(() => {
                cy.get('@textfield')
                    .type('01.01.2000 ')
                    .should('have.value', beforeTimeValue);
            });

            it('cannot be less than 01 (rejects zero as the 2nd hour segment)', () => {
                cy.get('@textfield')
                    .type('00')
                    .should('have.value', `${beforeTimeValue}0`)
                    .should('have.prop', 'selectionStart', beforeTimeValue.length + 1)
                    .should('have.prop', 'selectionEnd', beforeTimeValue.length + 1);
            });

            it('can be 1 (as the 1st digit segment)', () => {
                cy.get('@textfield')
                    .type('1')
                    .should('have.value', `${beforeTimeValue}1`)
                    .should('have.prop', 'selectionStart', beforeTimeValue.length + 1)
                    .should('have.prop', 'selectionEnd', beforeTimeValue.length + 1);
            });

            describe('automatically pads with zero', () => {
                range(2, 9).forEach((x) => {
                    it(`on attempt to enter ${x} as the first hour segment`, () => {
                        cy.get('@textfield')
                            .type(String(x))
                            .should('have.value', `${beforeTimeValue}0${x}`)
                            .should(
                                'have.prop',
                                'selectionStart',
                                beforeTimeValue.length + 2,
                            )
                            .should(
                                'have.prop',
                                'selectionEnd',
                                beforeTimeValue.length + 2,
                            );
                    });
                });
            });

            range(10, 12).forEach((x) => {
                const value = String(x);

                it(`can be ${x}`, () => {
                    cy.get('@textfield')
                        .type(value)
                        .should('have.value', beforeTimeValue + value)
                        .should('have.prop', 'selectionStart', beforeTimeValue.length + 2)
                        .should('have.prop', 'selectionEnd', beforeTimeValue.length + 2);
                });
            });

            describe('rejects insertion', () => {
                range(13, 19).forEach((x) => {
                    it(`on attempt to enter ${x} as the last hour segment`, () => {
                        cy.get('@textfield')
                            .type(String(x))
                            .should('have.value', `${beforeTimeValue}1`)
                            .should(
                                'have.prop',
                                'selectionStart',
                                beforeTimeValue.length + 1,
                            )
                            .should(
                                'have.prop',
                                'selectionEnd',
                                beforeTimeValue.length + 1,
                            );
                    });
                });
            });
        });

        describe('toggle meridiem value on ArrowUp / ArrowDown', () => {
            describe('Initial value === "<any date>12:34 |"', () => {
                const beforeMeridiemValue = '01.01.2000, 12:34 ';

                beforeEach(() => {
                    cy.get('@textfield')
                        .type('01.01.2000 1234 ')
                        .should('have.value', beforeMeridiemValue);
                });

                it('↑ --- 12:34 |AM', () => {
                    cy.get('@textfield')
                        .type('{upArrow}')
                        .should('have.value', `${beforeMeridiemValue}AM`)
                        .should('have.prop', 'selectionStart', beforeMeridiemValue.length)
                        .should('have.prop', 'selectionEnd', beforeMeridiemValue.length);
                });

                it('↓ --- 12:34 |PM', () => {
                    cy.get('@textfield')
                        .type('{downArrow}')
                        .should('have.value', `${beforeMeridiemValue}PM`)
                        .should('have.prop', 'selectionStart', beforeMeridiemValue.length)
                        .should('have.prop', 'selectionEnd', beforeMeridiemValue.length);
                });
            });

            describe('Initial value === "<anyDate>12:34 AM"', () => {
                const beforeTimeValue = '01.01.2000, ';
                const initialValue = `${beforeTimeValue}12:34 AM`;
                const toggledValue = `${beforeTimeValue}12:34 PM`;

                beforeEach(() => {
                    cy.get('@textfield')
                        .type('01.01.2000 1234a')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                [
                    `${beforeTimeValue}12:34 `.length,
                    `${beforeTimeValue}12:34 A`.length,
                    `${beforeTimeValue}12:34 AM`.length,
                ].forEach((initialCaretIndex) => {
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
                });
            });

            describe('Initial value === "01:01 PM"', () => {
                const beforeTimeValue = '01.01.2000, ';
                const initialValue = `${beforeTimeValue}01:01 PM`;
                const toggledValue = `${beforeTimeValue}01:01 AM`;

                beforeEach(() => {
                    cy.get('@textfield')
                        .type('01.01.2000 0101p')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                [
                    `${beforeTimeValue}01:01 `.length,
                    `${beforeTimeValue}01:01 P`.length,
                    `${beforeTimeValue}01:01 PM`.length,
                ].forEach((initialCaretIndex) => {
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
                });
            });

            describe('do nothing when caret is put after any time segment', () => {
                it('Empty time part --- ↑↓ --- Empty time part', () => {
                    cy.get('@textfield')
                        .type('01.01.2000 ')
                        .should('have.value', '01.01.2000, ')
                        .type('{upArrow}')
                        .should('have.value', '01.01.2000, ')
                        .type('{downArrow}')
                        .should('have.value', '01.01.2000, ');
                });

                ['1', '12', '12:', '12:3', '12:34'].forEach((textfieldValue) => {
                    it(`${textfieldValue} --- ↑↓ --- ${textfieldValue}`, () => {
                        cy.get('@textfield')
                            .type(`01.01.2000 ${textfieldValue}`)
                            .should('have.value', `01.01.2000, ${textfieldValue}`)
                            .type('{upArrow}')
                            .should('have.value', `01.01.2000, ${textfieldValue}`)
                            .type('{downArrow}')
                            .should('have.value', `01.01.2000, ${textfieldValue}`);
                    });
                });
            });
        });
    });
});
