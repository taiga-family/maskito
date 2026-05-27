import {maskitoTime, type MaskitoTimeParams} from '@maskito/kit';

import {withCaretLabel} from '../../utils';
import {TestInput} from '../utils';

function mount(params: MaskitoTimeParams): void {
    cy.mount(TestInput, {componentProperties: {maskitoOptions: maskitoTime(params)}});
}

describe('Time | locale', () => {
    describe('en-US with AM/PM marker', () => {
        beforeEach(() => {
            mount({mode: 'HH:MM', locale: 'en-US'});
        });

        it('appends AM', () => {
            cy.get('input')
                .type('0930')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length)
                .type('A')
                .should('have.value', '09:30 AM')
                .should('have.prop', 'selectionStart', '09:30 AM'.length)
                .should('have.prop', 'selectionEnd', '09:30 AM'.length);
        });

        it('appends PM', () => {
            cy.get('input')
                .type('0530')
                .should('have.value', '05:30')
                .should('have.prop', 'selectionStart', '05:30'.length)
                .should('have.prop', 'selectionEnd', '05:30'.length)
                .type('P')
                .should('have.value', '05:30 PM')
                .should('have.prop', 'selectionStart', '05:30 PM'.length)
                .should('have.prop', 'selectionEnd', '05:30 PM'.length);
        });

        it('erases meridiem with backspace', () => {
            cy.get('input')
                .type('0930A')
                .should('have.value', '09:30 AM')
                .type('{backspace}')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length);
        });

        it('erases meridiem with delete', () => {
            cy.get('input')
                .type('0930A')
                .should('have.value', '09:30 AM')
                .type('{leftArrow}'.repeat('AM'.length))
                .type('{del}')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length);
        });

        describe('toggle meridiem value on ArrowUp / ArrowDown', () => {
            describe('Initial value === "09:30 AM"', () => {
                const initialValue = '09:30 AM';
                const toggledValue = '09:30 PM';

                beforeEach(() => {
                    cy.get('input')
                        .type('0930a')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                ['09:30 '.length, '09:30 A'.length, '09:30 AM'.length].forEach(
                    (initialCaretIndex) => {
                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↑ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{upArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });

                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↓ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{downArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });
                    },
                );
            });

            describe('Initial value === "05:30 PM"', () => {
                const initialValue = '05:30 PM';
                const toggledValue = '05:30 AM';

                beforeEach(() => {
                    cy.get('input')
                        .type('0530p')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                ['05:30 '.length, '05:30 P'.length, '05:30 PM'.length].forEach(
                    (initialCaretIndex) => {
                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↑ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{upArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });

                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↓ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{downArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });
                    },
                );
            });

            describe('do nothing when caret is placed before meridiem segment', () => {
                it('Empty textfield --- ↑↓ --- Empty textfield', () => {
                    cy.get('input')
                        .should('have.value', '')
                        .type('{upArrow}')
                        .should('have.value', '')
                        .type('{downArrow}')
                        .should('have.value', '');
                });

                ['0', '09', '09:', '09:3', '09:30'].forEach((textfieldValue) => {
                    it(`${textfieldValue} --- ↑↓ --- ${textfieldValue}`, () => {
                        cy.get('input')
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

    describe('hi-IN with lowercase am/pm marker', () => {
        beforeEach(() => {
            mount({mode: 'HH:MM', locale: 'hi-IN'});
        });

        it('appends am', () => {
            cy.get('input')
                .type('0930')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length)
                .type('A')
                .should('have.value', '09:30 am')
                .should('have.prop', 'selectionStart', '09:30 am'.length)
                .should('have.prop', 'selectionEnd', '09:30 am'.length);
        });

        it('erases meridiem with backspace', () => {
            cy.get('input')
                .type('0930A')
                .should('have.value', '09:30 am')
                .type('{backspace}')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length);
        });

        describe('toggle meridiem value on ArrowUp / ArrowDown', () => {
            describe('Initial value === "09:30 am"', () => {
                const initialValue = '09:30 am';
                const toggledValue = '09:30 pm';

                beforeEach(() => {
                    cy.get('input')
                        .type('0930a')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                ['09:30 '.length, '09:30 a'.length, '09:30 am'.length].forEach(
                    (initialCaretIndex) => {
                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↑ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{upArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });

                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↓ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{downArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });
                    },
                );
            });
        });
    });

    describe('ar-EG with Arabic marker', () => {
        beforeEach(() => {
            mount({mode: 'HH:MM', locale: 'ar-EG'});
        });

        it('appends ص', () => {
            cy.get('input')
                .type('0930')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length)
                .type('ص')
                .should('have.value', '09:30 ص')
                .should('have.prop', 'selectionStart', '09:30 ص'.length)
                .should('have.prop', 'selectionEnd', '09:30 ص'.length);
        });

        it('erases meridiem with backspace', () => {
            cy.get('input')
                .type('0930ص')
                .should('have.value', '09:30 ص')
                .type('{backspace}')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length);
        });

        describe('toggle meridiem value on ArrowUp / ArrowDown', () => {
            describe('Initial value === "09:30 ص"', () => {
                const initialValue = '09:30 ص';
                const toggledValue = '09:30 م';

                beforeEach(() => {
                    cy.get('input')
                        .type('0930ص')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                ['09:30 '.length, '09:30 ص'.length].forEach((initialCaretIndex) => {
                    it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↑ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                        cy.get('input')
                            .type('{rightArrow}'.repeat(initialCaretIndex))
                            .type('{upArrow}')
                            .should('have.value', toggledValue)
                            .should('have.prop', 'selectionStart', initialCaretIndex)
                            .should('have.prop', 'selectionEnd', initialCaretIndex);
                    });

                    it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↓ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                        cy.get('input')
                            .type('{rightArrow}'.repeat(initialCaretIndex))
                            .type('{downArrow}')
                            .should('have.value', toggledValue)
                            .should('have.prop', 'selectionStart', initialCaretIndex)
                            .should('have.prop', 'selectionEnd', initialCaretIndex);
                    });
                });
            });
        });
    });

    describe('zh-TW with Chinese marker', () => {
        beforeEach(() => {
            mount({mode: 'HH:MM', locale: 'zh-TW'});
        });

        it('appends 上午', () => {
            cy.get('input')
                .type('0930')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length)
                .type('上')
                .should('have.value', '09:30 上午')
                .should('have.prop', 'selectionStart', '09:30 上午'.length)
                .should('have.prop', 'selectionEnd', '09:30 上午'.length);
        });

        it('erases meridiem with backspace', () => {
            cy.get('input')
                .type('0930 上')
                .should('have.value', '09:30 上午')
                .type('{backspace}')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length);
        });

        describe('toggle meridiem value on ArrowUp / ArrowDown', () => {
            describe('Initial value === "09:30 上午"', () => {
                const initialValue = '09:30 上午';
                const toggledValue = '09:30 下午';

                beforeEach(() => {
                    cy.get('input')
                        .type('0930 上')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                ['09:30 '.length, '09:30 上'.length, '09:30 上午'.length].forEach(
                    (initialCaretIndex) => {
                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↑ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{upArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });

                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↓ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{downArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });
                    },
                );
            });
        });
    });

    describe('el-GR + Greek π.μ./μ.μ. markers with dots', () => {
        beforeEach(() => {
            mount({mode: 'HH:MM', locale: 'el-GR'});
        });

        it('appends π.μ.', () => {
            cy.get('input')
                .type('0930')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length)
                .type('π')
                .should('have.value', '09:30 π.μ.')
                .should('have.prop', 'selectionStart', '09:30 π.μ.'.length)
                .should('have.prop', 'selectionEnd', '09:30 π.μ.'.length);
        });

        it('appends μ.μ.', () => {
            cy.get('input')
                .type('0530')
                .should('have.value', '05:30')
                .should('have.prop', 'selectionStart', '05:30'.length)
                .should('have.prop', 'selectionEnd', '05:30'.length)
                .type('μ')
                .should('have.value', '05:30 μ.μ.')
                .should('have.prop', 'selectionStart', '05:30 μ.μ.'.length)
                .should('have.prop', 'selectionEnd', '05:30 μ.μ.'.length);
        });

        it('erases meridiem with backspace (π.μ.)', () => {
            cy.get('input')
                .type('0930π')
                .should('have.value', '09:30 π.μ.')
                .type('{backspace}')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length);
        });

        it('erases meridiem with backspace (μ.μ.)', () => {
            cy.get('input')
                .type('0530μ')
                .should('have.value', '05:30 μ.μ.')
                .type('{backspace}')
                .should('have.value', '05:30')
                .should('have.prop', 'selectionStart', '05:30'.length)
                .should('have.prop', 'selectionEnd', '05:30'.length);
        });

        describe('toggle meridiem value on ArrowUp / ArrowDown', () => {
            describe('Initial value === "09:30 π.μ."', () => {
                const initialValue = '09:30 π.μ.';
                const toggledValue = '09:30 μ.μ.';

                beforeEach(() => {
                    cy.get('input')
                        .type('0930π')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                ['09:30 '.length, '09:30 π'.length, '09:30 π.μ.'.length].forEach(
                    (initialCaretIndex) => {
                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↑ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{upArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });

                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↓ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{downArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });
                    },
                );
            });

            describe('Initial value === "05:30 μ.μ."', () => {
                const initialValue = '05:30 μ.μ.';
                const toggledValue = '05:30 π.μ.';

                beforeEach(() => {
                    cy.get('input')
                        .type('0530μ')
                        .should('have.value', initialValue)
                        .type('{moveToStart}');
                });

                ['05:30 '.length, '05:30 μ'.length, '05:30 μ.μ.'.length].forEach(
                    (initialCaretIndex) => {
                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↑ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{upArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });

                        it(`${withCaretLabel(initialValue, initialCaretIndex)} --- ↓ --- ${withCaretLabel(toggledValue, initialCaretIndex)}`, () => {
                            cy.get('input')
                                .type('{rightArrow}'.repeat(initialCaretIndex))
                                .type('{downArrow}')
                                .should('have.value', toggledValue)
                                .should('have.prop', 'selectionStart', initialCaretIndex)
                                .should('have.prop', 'selectionEnd', initialCaretIndex);
                        });
                    },
                );
            });
        });
    });

    describe('am-ET appends Amharic ጥዋት/ከሰዓት markers', () => {
        beforeEach(() => {
            mount({mode: 'HH:MM', locale: 'am-ET'});
        });

        it('appends ጥዋት', () => {
            cy.get('input')
                .type('0930')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length)
                .type('ጥ')
                .should('have.value', '09:30 ጥዋት')
                .should('have.prop', 'selectionStart', '09:30 ጥዋት'.length)
                .should('have.prop', 'selectionEnd', '09:30 ጥዋት'.length);
        });

        it('erases meridiem with backspace', () => {
            cy.get('input')
                .type('0930ጥ')
                .should('have.value', '09:30 ጥዋት')
                .type('{backspace}')
                .should('have.value', '09:30')
                .should('have.prop', 'selectionStart', '09:30'.length)
                .should('have.prop', 'selectionEnd', '09:30'.length);
        });
    });

    describe('24-hour locales do not append meridiem', () => {
        ['en-GB', 'de-DE', 'fr-FR', 'ja-JP'].forEach((locale) => {
            it(`${locale} does not append meridiem`, () => {
                mount({mode: 'HH:MM', locale});

                cy.get('input').type('1430ap').should('have.value', '14:30');
            });
        });
    });

    describe('infers separators from locale', () => {
        it('de-DE uses comma before milliseconds', () => {
            mount({mode: 'HH:MM:SS.MSS', locale: 'de-DE'});

            cy.get('input').type('143050789').should('have.value', '14:30:50,789');
        });

        it('da-DK uses dots between hours/minutes/seconds and comma before milliseconds', () => {
            mount({mode: 'HH:MM:SS.MSS', locale: 'da-DK'});

            cy.get('input').type('143050789').should('have.value', '14.30.50,789');
        });

        it('fr-CA uses multi-character separators " h ", " min ", ","', () => {
            mount({mode: 'HH:MM:SS.MSS', locale: 'fr-CA'});

            cy.get('input').type('143050789').should('have.value', '14 h 30 min 50,789');
        });
    });

    describe('explicit overrides', () => {
        it('en-US locale with explicit empty dayPeriod stays 24-hour', () => {
            mount({
                mode: 'HH:MM',
                locale: 'en-US',
                dayPeriod: ['', ''],
            });

            cy.get('input').type('1430').should('have.value', '14:30');
        });

        it('de-DE locale with explicit dot separators ignores locale comma', () => {
            mount({
                mode: 'HH:MM:SS.MSS',
                locale: 'de-DE',
                separators: ['.', '.', '.'],
            });

            cy.get('input').type('143050789').should('have.value', '14.30.50.789');
        });
    });
});
