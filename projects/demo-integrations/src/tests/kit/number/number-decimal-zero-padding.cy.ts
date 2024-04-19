import {BROWSER_SUPPORTS_REAL_EVENTS} from 'projects/demo-integrations/src/support/constants';

import {openNumberPage} from './utils';

describe('Number | decimalZeroPadding', () => {
    describe('[precision]=4', () => {
        beforeEach(() => {
            openNumberPage('decimalSeparator=,&precision=4&decimalZeroPadding=true');
        });

        it('Type 42 => 42,0000', () => {
            cy.get('@input')
                .type('42')
                .should('have.value', '42,0000')
                .should('have.prop', 'selectionStart', '42'.length)
                .should('have.prop', 'selectionEnd', '42'.length);
        });

        it('Type , => 0,0000', () => {
            cy.get('@input')
                .type(',')
                .should('have.value', '0,0000')
                .should('have.prop', 'selectionStart', '0,'.length)
                .should('have.prop', 'selectionEnd', '0,'.length);
        });

        it('Type 42,27 => 42,2700', () => {
            cy.get('@input')
                .type('42,27')
                .should('have.value', '42,2700')
                .should('have.prop', 'selectionStart', '42,27'.length)
                .should('have.prop', 'selectionEnd', '42,27'.length);
        });

        it('Integer part has `overwriteMode: shift`', () => {
            cy.get('@input')
                .type('42,27')
                .type('{leftArrow}'.repeat('2,27'.length))
                .type('55')
                .should('have.value', '4 552,2700')
                .should('have.prop', 'selectionStart', '4 55'.length)
                .should('have.prop', 'selectionEnd', '4 55'.length);
        });

        it('Decimal part has `overwriteMode: replace`', () => {
            cy.get('@input')
                .type('42,27')
                .type('{leftArrow}'.repeat('27'.length))
                .type('55')
                .should('have.value', '42,5500')
                .should('have.prop', 'selectionStart', '42,55'.length)
                .should('have.prop', 'selectionEnd', '42,55'.length);
        });

        it('42,|2700 => Backspace => 42|,2700', () => {
            cy.get('@input')
                .type('42,27')
                .type('{leftArrow}'.repeat('27'.length))
                .type('{backspace}')
                .should('have.value', '42,2700')
                .should('have.prop', 'selectionStart', '42'.length)
                .should('have.prop', 'selectionEnd', '42'.length);
        });

        it('42|,2700 => Delete => 42,|2700', () => {
            cy.get('@input')
                .type('42,27')
                .type('{leftArrow}'.repeat(',27'.length))
                .type('{del}')
                .should('have.value', '42,2700')
                .should('have.prop', 'selectionStart', '42,'.length)
                .should('have.prop', 'selectionEnd', '42,'.length);
        });

        it('0|,4242 => Backspace => |,4242 => ,4242| => Backspace x4 => ,|0000', () => {
            cy.get('@input')
                .type('0,4242')
                .type('{moveToStart}{rightArrow}')
                .type('{backspace}')
                .should('have.value', ',4242')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0)
                .type('{moveToEnd}')
                .type('{backspace}'.repeat(2))
                .should('have.value', ',4200')
                .should('have.prop', 'selectionStart', ',42'.length)
                .should('have.prop', 'selectionEnd', ',42'.length)
                .type('{backspace}'.repeat(2))
                .should('have.value', ',0000')
                .should('have.prop', 'selectionStart', ','.length)
                .should('have.prop', 'selectionEnd', ','.length);
        });

        describe('Extra decimal separator insertion', () => {
            it('42,|2700 => Type , => 42,|2700', () => {
                cy.get('@input')
                    .type('42,27')
                    .type('{leftArrow}'.repeat('27'.length))
                    .should('have.value', '42,2700')
                    .should('have.prop', 'selectionStart', '42,'.length)
                    .should('have.prop', 'selectionEnd', '42,'.length)
                    .type(',')
                    .should('have.value', '42,2700')
                    .should('have.prop', 'selectionStart', '42,'.length)
                    .should('have.prop', 'selectionEnd', '42,'.length);
            });

            it('42|,2700 => Type , => 42,|2700', () => {
                cy.get('@input')
                    .type('42,27')
                    .type('{leftArrow}'.repeat(',27'.length))
                    .should('have.value', '42,2700')
                    .should('have.prop', 'selectionStart', '42'.length)
                    .should('have.prop', 'selectionEnd', '42'.length)
                    .type(',')
                    .should('have.value', '42,2700')
                    .should('have.prop', 'selectionStart', '42,'.length)
                    .should('have.prop', 'selectionEnd', '42,'.length);
            });

            it('42,2|700 => Type , => 42,2|700', () => {
                cy.get('@input')
                    .type('42,27')
                    .type('{leftArrow}')
                    .should('have.value', '42,2700')
                    .should('have.prop', 'selectionStart', '42,2'.length)
                    .should('have.prop', 'selectionEnd', '42,2'.length)
                    .type(',')
                    .should('have.value', '42,2700')
                    .should('have.prop', 'selectionStart', '42,2'.length)
                    .should('have.prop', 'selectionEnd', '42,2'.length);
            });

            it('9|9,1234 => Type , => 9|9,1234 (no changes)', () => {
                cy.get('@input')
                    .type('99,1234')
                    .type('{moveToStart}{rightArrow}')
                    .should('have.value', '99,1234')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1)
                    .type(',')
                    .should('have.value', '99,1234')
                    .should('have.prop', 'selectionStart', 1)
                    .should('have.prop', 'selectionEnd', 1);
            });
        });

        describe('Move caret when user tries to delete non-removable zeroes in decimal part', () => {
            beforeEach(() => {
                cy.get('@input').type(',').should('have.value', '0,0000');
            });

            describe('Via `Backspace` button', () => {
                it('0,0000| => Backspace => 0,000|0', () => {
                    cy.get('@input')
                        .type('{moveToEnd}{backspace}')
                        .should('have.value', '0,0000')
                        .should('have.prop', 'selectionStart', '0,000'.length)
                        .should('have.prop', 'selectionEnd', '0,000'.length);
                });

                it('0,000|0 => Backspace => 0,00|00', () => {
                    cy.get('@input')
                        .type('{moveToEnd}{leftArrow}{backspace}')
                        .should('have.value', '0,0000')
                        .should('have.prop', 'selectionStart', '0,00'.length)
                        .should('have.prop', 'selectionEnd', '0,00'.length);
                });

                it('0,00|00 => Backspace => 0,0|000', () => {
                    cy.get('@input')
                        .type('{moveToEnd}')
                        .type('{leftArrow}'.repeat(2))
                        .type('{backspace}')
                        .should('have.value', '0,0000')
                        .should('have.prop', 'selectionStart', '0,0'.length)
                        .should('have.prop', 'selectionEnd', '0,0'.length);
                });

                it('0,0|000 => Backspace => 0,|0000', () => {
                    cy.get('@input')
                        .type('{moveToEnd}')
                        .type('{leftArrow}'.repeat(3))
                        .type('{backspace}')
                        .should('have.value', '0,0000')
                        .should('have.prop', 'selectionStart', '0,'.length)
                        .should('have.prop', 'selectionEnd', '0,'.length);
                });
            });

            describe('Via `Delete` button', () => {
                it('0,|0000 => Delete => 0,0|000', () => {
                    cy.get('@input')
                        .type('{moveToStart}')
                        .type('{rightArrow}'.repeat('0,'.length))
                        .type('{del}')
                        .should('have.value', '0,0000')
                        .should('have.prop', 'selectionStart', '0,0'.length)
                        .should('have.prop', 'selectionEnd', '0,0'.length);
                });

                it('0,0|000 => Delete => 0,00|00', () => {
                    cy.get('@input')
                        .type('{moveToStart}')
                        .type('{rightArrow}'.repeat('0,0'.length))
                        .type('{del}')
                        .should('have.value', '0,0000')
                        .should('have.prop', 'selectionStart', '0,00'.length)
                        .should('have.prop', 'selectionEnd', '0,00'.length);
                });

                it('0,00|00 => Delete => 0,000|0', () => {
                    cy.get('@input')
                        .type('{moveToStart}')
                        .type('{rightArrow}'.repeat('0,00'.length))
                        .type('{del}')
                        .should('have.value', '0,0000')
                        .should('have.prop', 'selectionStart', '0,000'.length)
                        .should('have.prop', 'selectionEnd', '0,000'.length);
                });

                it('0,000|0 => Delete => 0,0000|', () => {
                    cy.get('@input')
                        .type('{moveToStart}')
                        .type('{rightArrow}'.repeat('0,000'.length))
                        .type('{del}')
                        .should('have.value', '0,0000')
                        .should('have.prop', 'selectionStart', '0,0000'.length)
                        .should('have.prop', 'selectionEnd', '0,0000'.length);
                });
            });
        });
    });

    describe('[decimalZeroPadding] is compatible with [postfix]', () => {
        it('Type 42', () => {
            openNumberPage('prefix=$&postfix=$&decimalZeroPadding=true&precision=2');

            cy.get('@input')
                .type('42')
                .should('have.value', '$42.00$')
                .should('have.prop', 'selectionStart', '$42'.length)
                .should('have.prop', 'selectionEnd', '$42'.length);
        });

        it('Type 42,24', () => {
            openNumberPage('prefix=$&postfix=$&decimalZeroPadding=true&precision=2');

            cy.get('@input')
                .type('42,24')
                .should('have.value', '$42.24$')
                .should('have.prop', 'selectionStart', '$42.24'.length)
                .should('have.prop', 'selectionEnd', '$42.24'.length);
        });

        it('Type 42.24', () => {
            openNumberPage('prefix=$&postfix=kg&decimalZeroPadding=true&precision=2');

            cy.get('@input')
                .type('42.24')
                .should('have.value', '$42.24kg')
                .should('have.prop', 'selectionStart', '$42.24'.length)
                .should('have.prop', 'selectionEnd', '$42.24'.length);
        });
    });

    describe('conditions for empty textfield', () => {
        beforeEach(() => {
            openNumberPage(
                'thousandSeparator=_&precision=4&decimalZeroPadding=true&minusSign=-',
            );
        });

        it('12|.3014 => backspace * 2 => |.3014 => moveToEnd + backspace => .301|0 => backspace => .30|00 => backspace => .3|000 => backspace => .|0000 => backspace => empty', () => {
            cy.get('@input')
                .type('12.3014')
                .should('have.value', '12.3014')
                .type('{moveToStart}{rightArrow}{rightArrow}')
                .should('have.a.prop', 'selectionStart', 2)
                .should('have.a.prop', 'selectionEnd', 2)
                .type('{backspace}')
                .should('have.value', '1.3014')
                .should('have.a.prop', 'selectionStart', 1)
                .should('have.a.prop', 'selectionEnd', 1)
                .type('{backspace}')
                .should('have.value', '.3014')
                .should('have.a.prop', 'selectionStart', 0)
                .should('have.a.prop', 'selectionEnd', 0)
                .type('{moveToEnd}{backspace}')
                .should('have.value', '.3010')
                .should('have.a.prop', 'selectionStart', 4)
                .should('have.a.prop', 'selectionEnd', 4)
                .type('{backspace}')
                .should('have.value', '.3000')
                .should('have.a.prop', 'selectionStart', 3)
                .should('have.a.prop', 'selectionEnd', 3)
                .type('{backspace}')
                .should('have.value', '.3000')
                .should('have.a.prop', 'selectionStart', 2)
                .should('have.a.prop', 'selectionEnd', 2)
                .type('{backspace}')
                .should('have.value', '.0000')
                .should('have.a.prop', 'selectionStart', 1)
                .should('have.a.prop', 'selectionEnd', 1)
                .type('{backspace}')
                .should('have.value', '')
                .should('have.a.prop', 'selectionStart', 0)
                .should('have.a.prop', 'selectionEnd', 0);
        });

        it('-2|.0000 => backspace => - => backspace => empty', () => {
            cy.get('@input')
                .type('-2')
                .should('have.value', '-2.0000')
                .should('have.a.prop', 'selectionStart', 2)
                .should('have.a.prop', 'selectionEnd', 2)
                .type('{backspace}')
                .should('have.value', '-')
                .should('have.a.prop', 'selectionStart', 1)
                .should('have.a.prop', 'selectionEnd', 1)
                .type('{backspace}')
                .should('have.value', '')
                .should('have.a.prop', 'selectionStart', 0)
                .should('have.a.prop', 'selectionEnd', 0);
        });
    });

    describe('erase selection which includes both integer and decimal parts', () => {
        beforeEach(() => {
            openNumberPage(
                'thousandSeparator=_&precision=5&decimalZeroPadding=true&minusSign=-',
            );
        });

        it('12|3.14|320 => backspace => 12|.32000', BROWSER_SUPPORTS_REAL_EVENTS, () => {
            cy.get('@input')
                .type('123.1432')
                .type('{leftArrow}'.repeat(2))
                .should('have.value', '123.14320')
                .should('have.a.prop', 'selectionStart', '123.14'.length)
                .should('have.a.prop', 'selectionEnd', '123.14'.length)
                .realPress([
                    'Shift',
                    ...new Array('3.14'.length).fill('ArrowLeft'),
                    'Backspace',
                ]);

            cy.get('@input')
                .should('have.value', '12.32000')
                .should('have.a.prop', 'selectionStart', '12'.length)
                .should('have.a.prop', 'selectionEnd', '12'.length);
        });

        it('13|4.003|00 => backspace => 13|.00000', () => {
            cy.get('@input')
                .type('134.003')
                .should('have.value', '134.00300')
                .realPress([
                    'Shift',
                    ...new Array('4.003'.length).fill('ArrowLeft'),
                    'Backspace',
                ]);

            cy.get('@input')
                .should('have.value', '13.00000')
                .should('have.a.prop', 'selectionStart', '13'.length)
                .should('have.a.prop', 'selectionEnd', '13'.length);
        });

        it('|12_332.10210| => backspace => empty', () => {
            cy.get('@input')
                .type('12332.1021')
                .should('have.value', '12_332.10210')
                .type('{selectAll}{backspace}')
                .should('have.value', '');
        });
    });

    describe('erase selection with includes only integer part', () => {
        beforeEach(() => {
            openNumberPage(
                'thousandSeparator=_&precision=4&decimalZeroPadding=true&minusSign=-',
            );
        });

        it(
            '12|3_123_1|23.0000 => backspace => 1_2|23.0000',
            BROWSER_SUPPORTS_REAL_EVENTS,
            () => {
                cy.get('@input')
                    .type('123123123')
                    .type('{moveToStart}{rightArrow}{rightArrow}')
                    .should('have.value', '123_123_123.0000')
                    .should('have.a.prop', 'selectionStart', '12'.length)
                    .should('have.a.prop', 'selectionEnd', '12'.length)
                    .realPress([
                        'Shift',
                        ...new Array('3_123_1'.length).fill('ArrowRight'),
                        'Backspace',
                    ]);

                cy.get('@input')
                    .should('have.value', '1_223.0000')
                    .should('have.a.prop', 'selectionStart', '1_2'.length)
                    .should('have.a.prop', 'selectionEnd', '1_2'.length);
            },
        );
    });

    describe('erase selection with includes only decimal part', () => {
        beforeEach(() => {
            openNumberPage(
                'thousandSeparator=_&precision=4&decimalZeroPadding=true&minusSign=-',
            );
        });

        it('123.|104|3 => backspace => 123.|3000', BROWSER_SUPPORTS_REAL_EVENTS, () => {
            cy.get('@input')
                .type('123.1043')
                .type('{moveToEnd}{leftArrow}')
                .should('have.value', '123.1043')
                .should('have.a.prop', 'selectionStart', '123.104'.length)
                .should('have.a.prop', 'selectionEnd', '123.104'.length)
                .realPress(['Shift', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'Backspace']);

            cy.get('@input')
                .should('have.value', '123.3000')
                .should('have.a.prop', 'selectionStart', '123.'.length)
                .should('have.a.prop', 'selectionEnd', '123.'.length);
        });
    });
});
