import {DemoPath} from '@demo/constants';

import {BROWSER_SUPPORTS_REAL_EVENTS} from '../../../support/constants';

describe('Time', () => {
    describe('Mode', () => {
        describe('HH:MM', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Time}/API?mode=HH:MM`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .clear()
                    .as('input');
            });

            describe('Typing new character overwrite character after cursor', () => {
                it('new character is different from the next one', () => {
                    cy.get('@input')
                        .type('2359')
                        .type('{moveToStart}')
                        .type('00')
                        .should('have.value', '00:59')
                        .should('have.prop', 'selectionStart', '00:'.length)
                        .should('have.prop', 'selectionEnd', '00:'.length)
                        .type('00')
                        .should('have.value', '00:00')
                        .should('have.prop', 'selectionStart', '00:00'.length)
                        .should('have.prop', 'selectionEnd', '00:00'.length);
                });

                it('moves cursor behind next character if new character is the same with the next one', () => {
                    cy.get('@input')
                        .type('0259')
                        .type('{moveToStart}{rightArrow}')
                        .type('2')
                        .should('have.value', '02:59')
                        .should('have.prop', 'selectionStart', '02:'.length)
                        .should('have.prop', 'selectionEnd', '02:'.length);
                });
            });

            describe('Select range and press new digit', () => {
                it('|23|:59 => Type 1 => 1|0:59', BROWSER_SUPPORTS_REAL_EVENTS, () => {
                    cy.get('@input')
                        .type('235959')
                        .should('have.value', '23:59')
                        .realPress([
                            ...new Array(':59'.length).fill('ArrowLeft'),
                            'Shift',
                            ...new Array('23'.length).fill('ArrowLeft'),
                        ]);

                    cy.get('@input')
                        .type('1')
                        .should('have.value', '10:59')
                        .should('have.prop', 'selectionStart', 1)
                        .should('have.prop', 'selectionEnd', 1);
                });

                it('|23|:59 => Type 0 => 0|0:59', BROWSER_SUPPORTS_REAL_EVENTS, () => {
                    cy.get('@input')
                        .type('235959')
                        .should('have.value', '23:59')
                        .realPress([
                            ...new Array(':59'.length).fill('ArrowLeft'),
                            'Shift',
                            ...new Array('23'.length).fill('ArrowLeft'),
                        ]);

                    cy.get('@input')
                        .type('0')
                        .should('have.value', '00:59')
                        .should('have.prop', 'selectionStart', 1)
                        .should('have.prop', 'selectionEnd', 1);
                });
            });

            it('Pad typed value with zero if digit exceeds the first digit of time segment', () => {
                cy.get('@input')
                    .type('9')
                    .should('have.value', '09')
                    .should('have.prop', 'selectionStart', '09'.length)
                    .should('have.prop', 'selectionEnd', '09'.length)
                    .type('9')
                    .should('have.value', '09:09')
                    .should('have.prop', 'selectionStart', '09:09'.length)
                    .should('have.prop', 'selectionEnd', '09:09'.length);
            });

            it('cannot insert >23 hours', () => {
                cy.get('@input')
                    .type('2')
                    .should('have.value', '2')
                    .type('7')
                    .should('have.value', '2')
                    .should('have.prop', 'selectionStart', '2'.length)
                    .should('have.prop', 'selectionEnd', '2'.length);
            });
        });

        describe('HH:MM:SS', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Time}/API?mode=HH:MM:SS`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .clear()
                    .as('input');
            });

            describe('Typing new character overwrite character after cursor', () => {
                it('new character is different from the next one', () => {
                    cy.get('@input')
                        .type('235959')
                        .type('{moveToStart}')
                        .type('0')
                        .should('have.value', '03:59:59')
                        .should('have.prop', 'selectionStart', '0'.length)
                        .should('have.prop', 'selectionEnd', '0'.length)
                        .type('000')
                        .should('have.value', '00:00:59')
                        .should('have.prop', 'selectionStart', '00:00:'.length)
                        .should('have.prop', 'selectionEnd', '00:00:'.length)
                        .type('00')
                        .should('have.value', '00:00:00')
                        .should('have.prop', 'selectionStart', '00:00:00'.length)
                        .should('have.prop', 'selectionEnd', '00:00:00'.length);
                });

                it('moves cursor behind next character if new character is the same with the next one', () => {
                    cy.get('@input')
                        .type('02:59:59')
                        .should('have.value', '02:59:59')
                        .type('{moveToStart}')
                        .type('{rightArrow}'.repeat('02:'.length))
                        .type('5')
                        .should('have.value', '02:59:59')
                        .should('have.prop', 'selectionStart', '02:5'.length)
                        .should('have.prop', 'selectionEnd', '02:5'.length);
                });
            });

            describe('Select range and press new digit', () => {
                it(
                    '23:|59|:59 => Type 2 => 23:2|0:59',
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type('235959')
                            .should('have.value', '23:59:59')
                            .realPress([
                                ...new Array(':59'.length).fill('ArrowLeft'),
                                'Shift',
                                ...new Array('59'.length).fill('ArrowLeft'),
                            ]);

                        cy.get('@input')
                            .type('2')
                            .should('have.value', '23:20:59')
                            .should('have.prop', 'selectionStart', '23:2'.length)
                            .should('have.prop', 'selectionEnd', '23:2'.length);
                    },
                );

                it(
                    '23:|59|:59 => Type 0 => 23:0|0:59',
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type('235959')
                            .should('have.value', '23:59:59')
                            .realPress([
                                ...new Array(':59'.length).fill('ArrowLeft'),
                                'Shift',
                                ...new Array('59'.length).fill('ArrowLeft'),
                            ]);

                        cy.get('@input')
                            .type('0')
                            .should('have.value', '23:00:59')
                            .should('have.prop', 'selectionStart', '23:0'.length)
                            .should('have.prop', 'selectionEnd', '23:0'.length);
                    },
                );
            });

            it('Pad typed value with zero if digit exceeds the first digit of time segment', () => {
                cy.get('@input')
                    .type('9')
                    .should('have.value', '09')
                    .should('have.prop', 'selectionStart', '09'.length)
                    .should('have.prop', 'selectionEnd', '09'.length)
                    .type('9')
                    .should('have.value', '09:09')
                    .should('have.prop', 'selectionStart', '09:09'.length)
                    .should('have.prop', 'selectionEnd', '09:09'.length)
                    .type('9')
                    .should('have.value', '09:09:09')
                    .should('have.prop', 'selectionStart', '09:09:09'.length)
                    .should('have.prop', 'selectionEnd', '09:09:09'.length);
            });
        });

        describe('HH:MM:SS.MSS', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Time}/API?mode=HH:MM:SS.MSS`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .clear()
                    .as('input');
            });

            describe('Typing new character overwrite character after cursor', () => {
                it('new character is different from the next one', () => {
                    cy.get('@input')
                        .type('235959999')
                        .type('{moveToStart}')
                        .type('0')
                        .should('have.value', '03:59:59.999')
                        .should('have.prop', 'selectionStart', '0'.length)
                        .should('have.prop', 'selectionEnd', '0'.length)
                        .type('000')
                        .should('have.value', '00:00:59.999')
                        .should('have.prop', 'selectionStart', '00:00:'.length)
                        .should('have.prop', 'selectionEnd', '00:00:'.length)
                        .type('00')
                        .should('have.value', '00:00:00.999')
                        .should('have.prop', 'selectionStart', '00:00:00.'.length)
                        .should('have.prop', 'selectionEnd', '00:00:00.'.length)
                        .type('0')
                        .should('have.value', '00:00:00.099')
                        .should('have.prop', 'selectionStart', '00:00:00.0'.length)
                        .should('have.prop', 'selectionEnd', '00:00:00.0'.length);
                });

                it('moves cursor behind next character if new character is the same with the next one', () => {
                    cy.get('@input')
                        .type('02:59:59.999')
                        .type('{moveToStart}')
                        .type('{rightArrow}'.repeat('02:59:59.'.length))
                        .type('9')
                        .should('have.value', '02:59:59.999')
                        .should('have.prop', 'selectionStart', '02:59:59.9'.length)
                        .should('have.prop', 'selectionEnd', '02:59:59.9'.length);
                });
            });

            describe('Select range and press new digit', () => {
                it(
                    '23:|59|:59.999 => Type 2 => 23:2|0:59.999',
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type('235959999')
                            .should('have.value', '23:59:59.999')
                            .realPress([
                                ...new Array(':59.999'.length).fill('ArrowLeft'),
                                'Shift',
                                ...new Array('59'.length).fill('ArrowLeft'),
                            ]);

                        cy.get('@input')
                            .type('2')
                            .should('have.value', '23:20:59.999')
                            .should('have.prop', 'selectionStart', '23:2'.length)
                            .should('have.prop', 'selectionEnd', '23:2'.length);
                    },
                );

                it(
                    '23:|59|:59.999 => Type 0 => 23:0|0:59.999',
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type('235959999')
                            .should('have.value', '23:59:59.999')
                            .realPress([
                                ...new Array(':59.999'.length).fill('ArrowLeft'),
                                'Shift',
                                ...new Array('59'.length).fill('ArrowLeft'),
                            ]);

                        cy.get('@input')
                            .type('0')
                            .should('have.value', '23:00:59.999')
                            .should('have.prop', 'selectionStart', '23:0'.length)
                            .should('have.prop', 'selectionEnd', '23:0'.length);
                    },
                );
            });

            it('Pad typed value with zero if digit exceeds the first digit of time segment', () => {
                cy.get('@input')
                    .type('9')
                    .should('have.value', '09')
                    .should('have.prop', 'selectionStart', '09'.length)
                    .should('have.prop', 'selectionEnd', '09'.length)
                    .type('9')
                    .should('have.value', '09:09')
                    .should('have.prop', 'selectionStart', '09:09'.length)
                    .should('have.prop', 'selectionEnd', '09:09'.length)
                    .type('9')
                    .should('have.value', '09:09:09')
                    .should('have.prop', 'selectionStart', '09:09:09'.length)
                    .should('have.prop', 'selectionEnd', '09:09:09'.length);
            });

            describe('accepts time segment separators typed by user', () => {
                it('23 => Type : => 23:', () => {
                    cy.get('@input')
                        .type('23')
                        .should('have.value', '23')
                        .type(':')
                        .should('have.value', '23:')
                        .should('have.prop', 'selectionStart', '23:'.length)
                        .should('have.prop', 'selectionEnd', '23:'.length);
                });

                it('23:59 => Type : => 23:59:', () => {
                    cy.get('@input')
                        .type('2359')
                        .should('have.value', '23:59')
                        .type(':')
                        .should('have.value', '23:59:')
                        .should('have.prop', 'selectionStart', '23:59:'.length)
                        .should('have.prop', 'selectionEnd', '23:59:'.length);
                });

                it('23:59:59 => Type . => 23:59:59.', () => {
                    cy.get('@input')
                        .type('235959')
                        .should('have.value', '23:59:59')
                        .type('.')
                        .should('have.value', '23:59:59.')
                        .should('have.prop', 'selectionStart', '23:59:59.'.length)
                        .should('have.prop', 'selectionEnd', '23:59:59.'.length);
                });
            });
        });

        describe('HH', () => {
            describe('default segments', () => {
                beforeEach(() => {
                    cy.visit(`/${DemoPath.Time}/API?mode=HH`);
                    cy.get('#demo-content input')
                        .should('be.visible')
                        .first()
                        .focus()
                        .clear()
                        .as('input');
                });

                it('2| => type 5 => 2|', () => {
                    cy.get('@input')
                        .type('2')
                        .should('have.value', '2')
                        .should('have.prop', 'selectionStart', '2'.length)
                        .should('have.prop', 'selectionEnd', '2'.length)
                        .type('5')
                        .should('have.value', '2')
                        .should('have.prop', 'selectionStart', '2'.length)
                        .should('have.prop', 'selectionEnd', '2'.length);
                });

                it('2| => type 3 => 23|', () => {
                    cy.get('@input')
                        .type('2')
                        .should('have.value', '2')
                        .should('have.prop', 'selectionStart', '2'.length)
                        .should('have.prop', 'selectionEnd', '2'.length)
                        .type('3')
                        .should('have.value', '23')
                        .should('have.prop', 'selectionStart', '23'.length)
                        .should('have.prop', 'selectionEnd', '23'.length);
                });

                it('23| => type 5 => 23|', () => {
                    cy.get('@input')
                        .type('23')
                        .should('have.value', '23')
                        .should('have.prop', 'selectionStart', '23'.length)
                        .should('have.prop', 'selectionEnd', '23'.length)
                        .type('5')
                        .should('have.value', '23')
                        .should('have.prop', 'selectionStart', '23'.length)
                        .should('have.prop', 'selectionEnd', '23'.length);
                });
            });

            describe('max hours 11', () => {
                beforeEach(() => {
                    cy.visit(`/${DemoPath.Time}/API?mode=HH&timeSegmentMaxValues$=2`);
                    cy.get('#demo-content input')
                        .should('be.visible')
                        .first()
                        .focus()
                        .clear()
                        .as('input');
                });

                it('type 2 => 02', () => {
                    cy.get('@input')
                        .type('2')
                        .should('have.value', '02')
                        .should('have.prop', 'selectionStart', '02'.length)
                        .should('have.prop', 'selectionEnd', '02'.length);
                });
            });
        });

        describe('MM:SS.MSS', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Time}/API?mode=MM:SS.MSS`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .clear()
                    .as('input');
            });

            describe('Typing new character overwrite character after cursor', () => {
                it('new character is different from the next one', () => {
                    cy.get('@input')
                        .type('5959999')
                        .type('{moveToStart}')
                        .type('0')
                        .should('have.value', '09:59.999')
                        .should('have.prop', 'selectionStart', '0'.length)
                        .should('have.prop', 'selectionEnd', '0'.length)
                        .type('000')
                        .should('have.value', '00:00.999')
                        .should('have.prop', 'selectionStart', '00:00.'.length)
                        .should('have.prop', 'selectionEnd', '00:00.'.length)
                        .type('00')
                        .should('have.value', '00:00.009')
                        .should('have.prop', 'selectionStart', '00:00.00'.length)
                        .should('have.prop', 'selectionEnd', '00:00.00'.length);
                });

                it('moves cursor behind next character if new character is the same with the next one', () => {
                    cy.get('@input')
                        .type('59:59.999')
                        .type('{moveToStart}')
                        .type('{rightArrow}'.repeat('59:59.'.length))
                        .type('9')
                        .should('have.value', '59:59.999')
                        .should('have.prop', 'selectionStart', '59:59.9'.length)
                        .should('have.prop', 'selectionEnd', '59:59.9'.length);
                });
            });

            it('Pad typed value with zero if digit exceeds the first digit of time segment', () => {
                cy.get('@input')
                    .type('6')
                    .should('have.value', '06')
                    .should('have.prop', 'selectionStart', '06'.length)
                    .should('have.prop', 'selectionEnd', '06'.length)
                    .type('6')
                    .should('have.value', '06:06')
                    .should('have.prop', 'selectionStart', '06:06'.length)
                    .should('have.prop', 'selectionEnd', '06:06'.length)
                    .type('999')
                    .should('have.value', '06:06.999')
                    .should('have.prop', 'selectionStart', '06:06.999'.length)
                    .should('have.prop', 'selectionEnd', '06:06.999'.length);
            });

            describe('Select range and press new digit', () => {
                it(
                    '|59|:59.999 => Type 2 => 2|0:59.999',
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type('5959999')
                            .should('have.value', '59:59.999')
                            .realPress([
                                ...new Array(':59.999'.length).fill('ArrowLeft'),
                                'Shift',
                                ...new Array('59'.length).fill('ArrowLeft'),
                            ]);

                        cy.get('@input')
                            .type('2')
                            .should('have.value', '20:59.999')
                            .should('have.prop', 'selectionStart', '2'.length)
                            .should('have.prop', 'selectionEnd', '2'.length);
                    },
                );

                it(
                    '|59|:59.999 => Type 6 => 06:|59.999',
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type('5959999')
                            .should('have.value', '59:59.999')
                            .realPress([
                                ...new Array(':59.999'.length).fill('ArrowLeft'),
                                'Shift',
                                ...new Array('59'.length).fill('ArrowLeft'),
                            ]);

                        cy.get('@input')
                            .type('6')
                            .should('have.value', '06:59.999')
                            .should('have.prop', 'selectionStart', '06:'.length)
                            .should('have.prop', 'selectionEnd', '06:'.length);
                    },
                );
            });

            describe('accepts time segment separators typed by user', () => {
                it('59 => Type : => 59:', () => {
                    cy.get('@input')
                        .type('59')
                        .should('have.value', '59')
                        .type(':')
                        .should('have.value', '59:')
                        .should('have.prop', 'selectionStart', '59:'.length)
                        .should('have.prop', 'selectionEnd', '59:'.length);
                });

                it('59:59 => Type . => 59:59.', () => {
                    cy.get('@input')
                        .type('5959')
                        .should('have.value', '59:59')
                        .type('.')
                        .should('have.value', '59:59.')
                        .should('have.prop', 'selectionStart', '59:59.'.length)
                        .should('have.prop', 'selectionEnd', '59:59.'.length);
                });
            });

            it('type 5959999 => 59:59.999', () => {
                cy.get('@input').type('5959999').should('have.value', '59:59.999');
            });
        });

        describe('SS.MSS', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Time}/API?mode=SS.MSS`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .clear()
                    .as('input');
            });

            describe('Typing new character overwrite character after cursor', () => {
                it('new character is different from the next one', () => {
                    cy.get('@input')
                        .type('59999')
                        .type('{moveToStart}')
                        .type('0')
                        .should('have.value', '09.999')
                        .should('have.prop', 'selectionStart', '0'.length)
                        .should('have.prop', 'selectionEnd', '0'.length)
                        .type('0')
                        .should('have.value', '00.999')
                        .should('have.prop', 'selectionStart', '00.'.length)
                        .should('have.prop', 'selectionEnd', '00.'.length)
                        .type('00')
                        .should('have.value', '00.009')
                        .should('have.prop', 'selectionStart', '00.00'.length)
                        .should('have.prop', 'selectionEnd', '00.00'.length);
                });

                it('moves cursor behind next character if new character is the same with the next one', () => {
                    cy.get('@input')
                        .type('59.999')
                        .type('{moveToStart}')
                        .type('{rightArrow}'.repeat('59.'.length))
                        .type('9')
                        .should('have.value', '59.999')
                        .should('have.prop', 'selectionStart', '59.9'.length)
                        .should('have.prop', 'selectionEnd', '59.9'.length);
                });
            });

            it('Pad typed value with zero if digit exceeds the first digit of time segment', () => {
                cy.get('@input')
                    .type('6')
                    .should('have.value', '06')
                    .should('have.prop', 'selectionStart', '06'.length)
                    .should('have.prop', 'selectionEnd', '06'.length)
                    .type('999')
                    .should('have.value', '06.999')
                    .should('have.prop', 'selectionStart', '06.999'.length)
                    .should('have.prop', 'selectionEnd', '06:999'.length);
            });

            describe('Select range and press new digit', () => {
                it('|59|.999 => Type 2 => 2|0.999', BROWSER_SUPPORTS_REAL_EVENTS, () => {
                    cy.get('@input')
                        .type('59999')
                        .should('have.value', '59.999')
                        .realPress([
                            ...new Array('.999'.length).fill('ArrowLeft'),
                            'Shift',
                            ...new Array('59'.length).fill('ArrowLeft'),
                        ]);

                    cy.get('@input')
                        .type('2')
                        .should('have.value', '20.999')
                        .should('have.prop', 'selectionStart', '2'.length)
                        .should('have.prop', 'selectionEnd', '2'.length);
                });

                it('|59|.999 => Type 6 => 06.|999', BROWSER_SUPPORTS_REAL_EVENTS, () => {
                    cy.get('@input')
                        .type('59999')
                        .should('have.value', '59.999')
                        .realPress([
                            ...new Array('.999'.length).fill('ArrowLeft'),
                            'Shift',
                            ...new Array('59'.length).fill('ArrowLeft'),
                        ]);

                    cy.get('@input')
                        .type('6')
                        .should('have.value', '06.999')
                        .should('have.prop', 'selectionStart', '06.'.length)
                        .should('have.prop', 'selectionEnd', '06.'.length);
                });
            });

            describe('accepts time segment separators typed by user', () => {
                it('59 => Type . => 59.', () => {
                    cy.get('@input')
                        .type('59')
                        .should('have.value', '59')
                        .type('.')
                        .should('have.value', '59.')
                        .should('have.prop', 'selectionStart', '59.'.length)
                        .should('have.prop', 'selectionEnd', '59.'.length);
                });
            });

            it('type 59999 => 59.999', () => {
                cy.get('@input').type('59999').should('have.value', '59.999');
            });
        });
    });
});
