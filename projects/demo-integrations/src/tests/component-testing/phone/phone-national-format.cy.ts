import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

import {TestInput} from '../utils';

describe('Phone | National format', () => {
    describe('United States', () => {
        describe('Typing digits', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: maskitoPhoneOptionsGenerator({
                            countryIsoCode: 'US',
                            metadata,
                            format: 'NATIONAL',
                        }),
                        initialValue: '',
                    },
                });
            });

            it('Type 2123433355 => (212) 343-3355', () => {
                cy.get('input')
                    .focus()
                    .type('2123433355')
                    .should('have.value', '(212) 343-3355');
            });

            it('Type 212 => (212)', () => {
                cy.get('input').focus().type('212').should('have.value', '(212)');
            });

            it('Type 2123 => (212) 3', () => {
                cy.get('input').focus().type('2123').should('have.value', '(212) 3');
            });

            it('Type 212343 => (212) 343', () => {
                cy.get('input').focus().type('212343').should('have.value', '(212) 343');
            });
        });

        describe('Backspace behavior', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: maskitoPhoneOptionsGenerator({
                            countryIsoCode: 'US',
                            metadata,
                            format: 'NATIONAL',
                        }),
                        initialValue: '(212) 343-3355',
                    },
                });
            });

            it('(212) 343-3355| => Backspace => (212) 343-335|', () => {
                cy.get('input')
                    .should('have.value', '(212) 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '(212) 343-335')
                    .should('have.prop', 'selectionStart', '(212) 343-335'.length)
                    .should('have.prop', 'selectionEnd', '(212) 343-335'.length);
            });

            it('(212) 343|-3355 => Backspace => (212) 34|3-355', () => {
                cy.get('input')
                    .should('have.value', '(212) 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('-3355'.length))
                    .type('{backspace}')
                    .should('have.value', '(212) 343-355')
                    .should('have.prop', 'selectionStart', '(212) 34'.length)
                    .should('have.prop', 'selectionEnd', '(212) 34'.length);
            });

            it('(212) 3|43-3355 => Backspace => (212) |433-355', () => {
                cy.get('input')
                    .should('have.value', '(212) 343-3355')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('43-3355'.length))
                    .type('{backspace}')
                    .should('have.value', '(212) 433-355')
                    .should('have.prop', 'selectionStart', '(212) '.length)
                    .should('have.prop', 'selectionEnd', '(212) '.length);
            });
        });
    });

    describe('Russia', () => {
        describe('Typing digits', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: maskitoPhoneOptionsGenerator({
                            countryIsoCode: 'RU',
                            metadata,
                            format: 'NATIONAL',
                        }),
                        initialValue: '',
                    },
                });
            });

            it('Type 9202800155 => 920 280-01-55', () => {
                cy.get('input')
                    .focus()
                    .type('9202800155')
                    .should('have.value', '920 280-01-55');
            });

            it('Type 920 => 920', () => {
                cy.get('input').focus().type('920').should('have.value', '920');
            });

            it('Type 9202 => 920 2', () => {
                cy.get('input').focus().type('9202').should('have.value', '920 2');
            });

            it('Type 920280 => 920 280', () => {
                cy.get('input').focus().type('920280').should('have.value', '920 280');
            });
        });

        describe('Backspace behavior', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: maskitoPhoneOptionsGenerator({
                            countryIsoCode: 'RU',
                            metadata,
                            format: 'NATIONAL',
                        }),
                        initialValue: '920 280-01-55',
                    },
                });
            });

            it('920 280-01-55| => Backspace => 920 280-01-5|', () => {
                cy.get('input')
                    .should('have.value', '920 280-01-55')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '920 280-01-5')
                    .should('have.prop', 'selectionStart', '920 280-01-5'.length)
                    .should('have.prop', 'selectionEnd', '920 280-01-5'.length);
            });

            it('920 280-01|-55 => Backspace => 920 280-0|5-5', () => {
                cy.get('input')
                    .should('have.value', '920 280-01-55')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('-55'.length))
                    .type('{backspace}')
                    .should('have.value', '920 280-05-5')
                    .should('have.prop', 'selectionStart', '920 280-0'.length)
                    .should('have.prop', 'selectionEnd', '920 280-0'.length);
            });

            it('920 2|80-01-55 => Backspace => 920 |800-15-5', () => {
                cy.get('input')
                    .should('have.value', '920 280-01-55')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('80-01-55'.length))
                    .type('{backspace}')
                    .should('have.value', '920 800-15-5')
                    .should('have.prop', 'selectionStart', '920 '.length)
                    .should('have.prop', 'selectionEnd', '920 '.length);
            });
        });
    });

    describe('Spain', () => {
        describe('Typing digits', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: maskitoPhoneOptionsGenerator({
                            countryIsoCode: 'ES',
                            metadata,
                            format: 'NATIONAL',
                        }),
                        initialValue: '',
                    },
                });
            });

            it('Type 612345678 => 612 34-56-78', () => {
                cy.get('input')
                    .focus()
                    .type('612345678')
                    .should('have.value', '612 34-56-78');
            });

            it('Type 612 => 612', () => {
                cy.get('input').focus().type('612').should('have.value', '612');
            });

            it('Type 6123 => 612 3', () => {
                cy.get('input').focus().type('6123').should('have.value', '612 3');
            });

            it('Type 612345 => 612 34-5', () => {
                cy.get('input').focus().type('612345').should('have.value', '612 34-5');
            });
        });

        describe('Backspace behavior', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: maskitoPhoneOptionsGenerator({
                            countryIsoCode: 'ES',
                            metadata,
                            format: 'NATIONAL',
                        }),
                        initialValue: '612 34-56-78',
                    },
                });
            });

            it('612 34-56-78| => Backspace => 612 34-56-7|', () => {
                cy.get('input')
                    .should('have.value', '612 34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '612 34-56-7')
                    .should('have.prop', 'selectionStart', '612 34-56-7'.length)
                    .should('have.prop', 'selectionEnd', '612 34-56-7'.length);
            });

            it('612 34-56|-78 => Backspace => 612 34-5|7-8', () => {
                cy.get('input')
                    .should('have.value', '612 34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('-78'.length))
                    .type('{backspace}')
                    .should('have.value', '612 34-57-8')
                    .should('have.prop', 'selectionStart', '612 34-5'.length)
                    .should('have.prop', 'selectionEnd', '612 34-5'.length);
            });

            it('612 3|4-56-78 => Backspace => 612 |45-67-8', () => {
                cy.get('input')
                    .should('have.value', '612 34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('4-56-78'.length))
                    .type('{backspace}')
                    .should('have.value', '612 45-67-8')
                    .should('have.prop', 'selectionStart', '612 '.length)
                    .should('have.prop', 'selectionEnd', '612 '.length);
            });
        });
    });

    describe('France', () => {
        describe('Typing digits', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: maskitoPhoneOptionsGenerator({
                            countryIsoCode: 'FR',
                            metadata,
                            format: 'NATIONAL',
                        }),
                        initialValue: '',
                    },
                });
            });

            it('Type 0612345678 => 06 12-34-56-78', () => {
                cy.get('input')
                    .focus()
                    .type('0612345678')
                    .should('have.value', '06 12-34-56-78');
            });

            it('Type 06 => 06', () => {
                cy.get('input').focus().type('06').should('have.value', '06');
            });

            it('Type 0612 => 06 12', () => {
                cy.get('input').focus().type('0612').should('have.value', '06 12');
            });

            it('Type 061234 => 06 12-34', () => {
                cy.get('input').focus().type('061234').should('have.value', '06 12-34');
            });
        });

        describe('Backspace behavior', () => {
            beforeEach(() => {
                cy.mount(TestInput, {
                    componentProperties: {
                        maskitoOptions: maskitoPhoneOptionsGenerator({
                            countryIsoCode: 'FR',
                            metadata,
                            format: 'NATIONAL',
                        }),
                        initialValue: '06 12-34-56-78',
                    },
                });
            });

            it('06 12-34-56-78| => Backspace => 06 12-34-56-7|', () => {
                cy.get('input')
                    .should('have.value', '06 12-34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{backspace}')
                    .should('have.value', '06 12-34-56-7')
                    .should('have.prop', 'selectionStart', '06 12-34-56-7'.length)
                    .should('have.prop', 'selectionEnd', '06 12-34-56-7'.length);
            });

            it('06 12-34-56|-78 => Backspace => 06 12-34-5|7-8', () => {
                cy.get('input')
                    .should('have.value', '06 12-34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('-78'.length))
                    .type('{backspace}')
                    .should('have.value', '06 12-34-57-8')
                    .should('have.prop', 'selectionStart', '06 12-34-5'.length)
                    .should('have.prop', 'selectionEnd', '06 12-34-5'.length);
            });

            it('06 12-3|4-56-78 => Backspace => 06 12-|45-67-8', () => {
                cy.get('input')
                    .should('have.value', '06 12-34-56-78')
                    .focus()
                    .type('{moveToEnd}')
                    .type('{leftArrow}'.repeat('4-56-78'.length))
                    .type('{backspace}')
                    .should('have.value', '06 12-45-67-8')
                    .should('have.prop', 'selectionStart', '06 12-'.length)
                    .should('have.prop', 'selectionEnd', '06 12-'.length);
            });
        });
    });

    describe('Custom separator', () => {
        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions: maskitoPhoneOptionsGenerator({
                        countryIsoCode: 'US',
                        metadata,
                        format: 'NATIONAL',
                        separator: ' ',
                    }),
                    initialValue: '',
                },
            });
        });

        it('Type 2123433355 with space separator => (212) 343 3355', () => {
            cy.get('input')
                .focus()
                .type('2123433355')
                .should('have.value', '(212) 343 3355');
        });
    });
});
