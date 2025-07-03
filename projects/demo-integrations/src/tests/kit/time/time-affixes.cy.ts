import {DemoPath} from '@demo/constants';

describe('Time | Prefix & Postfix', () => {
    describe('[postfix]=" left" + WITH caret guard', () => {
        beforeEach(() => {
            cy.visit(DemoPath.Time);
            cy.get('#affixes input').should('be.visible').first().focus().as('textfield');
        });

        it('basic typing works', () => {
            cy.get('@textfield')
                .type('{moveToStart}')
                .type('1234')
                .should('have.value', '12:34 left')
                .should('have.prop', 'selectionStart', '12:34'.length)
                .should('have.prop', 'selectionEnd', '12:34'.length);
        });

        it('replaces deleted character by zero', () => {
            cy.get('@textfield')
                .type('{moveToStart}')
                .type('{rightArrow}'.repeat(2))
                .type('{backspace}')
                .should('have.value', '00:00 left')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('zero-padding for minute segment works', () => {
            cy.get('@textfield')
                .type('{moveToStart}')
                .type('9')
                .should('have.value', '09:00 left')
                .should('have.prop', 'selectionStart', '09:'.length)
                .should('have.prop', 'selectionEnd', '09:'.length);
        });

        it('zero-padding for second segment works', () => {
            cy.get('@textfield')
                .type('{moveToStart}')
                .type('97')
                .should('have.value', '09:07 left')
                .should('have.prop', 'selectionStart', '09:07'.length)
                .should('have.prop', 'selectionEnd', '09:07'.length);
        });

        it('replaceAll + delete => only non-removable postfix', () => {
            cy.get('@textfield')
                .type('{selectAll}{backspace}')
                .should('have.value', ' left')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('move caret left on attempt to remove colon by Backspace', () => {
            cy.get('@textfield')
                .type('{moveToStart}')
                .type('{rightArrow}'.repeat(3))
                .should('have.prop', 'selectionStart', '05:'.length)
                .should('have.prop', 'selectionEnd', '05:'.length)
                .type('{backspace}')
                .should('have.value', '05:00 left')
                .should('have.prop', 'selectionStart', '05'.length)
                .should('have.prop', 'selectionEnd', '05'.length);
        });

        it('move caret right on attempt to remove colon by Delete', () => {
            cy.get('@textfield')
                .type('{moveToStart}')
                .type('{rightArrow}'.repeat(2))
                .should('have.prop', 'selectionStart', '05'.length)
                .should('have.prop', 'selectionEnd', '05'.length)
                .type('{del}')
                .should('have.value', '05:00 left')
                .should('have.prop', 'selectionStart', '05:'.length)
                .should('have.prop', 'selectionEnd', '05:'.length);
        });

        it('allows to delete last digit without zero placeholder', () => {
            cy.get('@textfield')
                .type('{moveToStart}')
                .type('1234')
                .should('have.value', '12:34 left')
                .should('have.prop', 'selectionStart', '12:34'.length)
                .should('have.prop', 'selectionEnd', '12:34'.length)
                .type('{backspace}')
                .should('have.value', '12:3 left')
                .should('have.prop', 'selectionStart', '12:3'.length)
                .should('have.prop', 'selectionEnd', '12:3'.length)
                .type('{backspace}')
                .should('have.value', '12 left')
                .should('have.prop', 'selectionStart', '12'.length)
                .should('have.prop', 'selectionEnd', '12'.length)
                .type('{backspace}')
                .should('have.value', '1 left')
                .should('have.prop', 'selectionStart', '1'.length)
                .should('have.prop', 'selectionEnd', '1'.length)
                .type('{backspace}')
                .should('have.value', ' left')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        describe('with maskitoAddOnFocusPlugin + maskitoRemoveOnBlurPlugin', () => {
            it('removes postfix on blur if there are no more digits except postfix', () => {
                cy.get('@textfield')
                    .type('{selectAll}{backspace}')
                    .should('have.value', ' left')
                    .blur()
                    .should('have.value', '');
            });

            it('adds postfix on focus for empty textfield', () => {
                cy.get('@textfield')
                    .type('{selectAll}{backspace}')
                    .blur()
                    .should('have.value', '')
                    .focus()
                    .should('have.value', ' left');
            });
        });
    });

    describe('[postfix]="left" + WITHOUT caret guard', () => {
        beforeEach(() => {
            cy.visit(`${DemoPath.Time}/API?mode=HH:MM&postfix=left`);
            cy.get('#demo-content input')
                .should('be.visible')
                .should('have.value', '')
                .first()
                .focus()
                .as('textfield');
        });

        it('basic typing works', () => {
            cy.get('@textfield')
                .type('1234')
                .should('have.value', '12:34left')
                .should('have.prop', 'selectionStart', '12:34'.length)
                .should('have.prop', 'selectionEnd', '12:34'.length);
        });

        it('replaces deleted character by zero', () => {
            cy.get('@textfield')
                .type('1234')
                .type('{leftArrow}'.repeat(':34'.length))
                .type('{backspace}')
                .should('have.value', '10:34left')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('zero-padding for hour segment works', () => {
            cy.get('@textfield')
                .type('9')
                .should('have.value', '09left')
                .should('have.prop', 'selectionStart', '09'.length)
                .should('have.prop', 'selectionEnd', '09'.length);
        });

        it('zero-padding for minutes segment works', () => {
            cy.get('@textfield')
                .type('97')
                .should('have.value', '09:07left')
                .should('have.prop', 'selectionStart', '09:07'.length)
                .should('have.prop', 'selectionEnd', '09:07'.length);
        });

        it('replaceAll + delete => only non-removable postfix', () => {
            cy.get('@textfield')
                .type('1234')
                .should('have.value', '12:34left')
                .type('{selectAll}{backspace}')
                .should('have.value', 'left')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });

        it('move caret left on attempt to remove colon by Backspace', () => {
            cy.get('@textfield')
                .type('1234')
                .type('{leftArrow}'.repeat('34'.length))
                .should('have.prop', 'selectionStart', '12:'.length)
                .should('have.prop', 'selectionEnd', '12:'.length)
                .type('{backspace}')
                .should('have.value', '12:34left')
                .should('have.prop', 'selectionStart', '12'.length)
                .should('have.prop', 'selectionEnd', '12'.length);
        });

        it('move caret right on attempt to remove colon by Delete', () => {
            cy.get('@textfield')
                .type('1234')
                .type('{leftArrow}'.repeat(':34'.length))
                .should('have.prop', 'selectionStart', '12'.length)
                .should('have.prop', 'selectionEnd', '12'.length)
                .type('{del}')
                .should('have.value', '12:34left')
                .should('have.prop', 'selectionStart', '12:'.length)
                .should('have.prop', 'selectionEnd', '12:'.length);
        });

        it('allows to delete last digit without zero placeholder', () => {
            cy.get('@textfield')
                .type('1234')
                .should('have.value', '12:34left')
                .should('have.prop', 'selectionStart', '12:34'.length)
                .should('have.prop', 'selectionEnd', '12:34'.length)
                .type('{backspace}')
                .should('have.value', '12:3left')
                .should('have.prop', 'selectionStart', '12:3'.length)
                .should('have.prop', 'selectionEnd', '12:3'.length)
                .type('{backspace}')
                .should('have.value', '12left')
                .should('have.prop', 'selectionStart', '12'.length)
                .should('have.prop', 'selectionEnd', '12'.length)
                .type('{backspace}')
                .should('have.value', '1left')
                .should('have.prop', 'selectionStart', '1'.length)
                .should('have.prop', 'selectionEnd', '1'.length)
                .type('{backspace}')
                .should('have.value', 'left')
                .should('have.prop', 'selectionStart', 0)
                .should('have.prop', 'selectionEnd', 0);
        });
    });

    describe('[prefix]="Timeout"', () => {
        beforeEach(() => {
            cy.visit(`${DemoPath.Time}/API?mode=HH:MM:SS.MSS&prefix=Timeout`);
            cy.get('#demo-content input')
                .should('be.visible')
                .should('have.value', '')
                .first()
                .focus()
                .as('textfield');
        });

        it('basic typing works', () => {
            cy.get('@textfield')
                .type('123456789')
                .should('have.value', 'Timeout12:34:56.789')
                .should('have.prop', 'selectionStart', 'Timeout12:34:56.789'.length)
                .should('have.prop', 'selectionEnd', 'Timeout12:34:56.789'.length);
        });

        it('replaces deleted character by zero', () => {
            cy.get('@textfield')
                .type('1234')
                .type('{leftArrow}'.repeat(':34'.length))
                .type('{backspace}')
                .should('have.value', 'Timeout10:34')
                .should('have.prop', 'selectionStart', 'Timeout1'.length)
                .should('have.prop', 'selectionEnd', 'Timeout1'.length);
        });

        it('zero-padding for hour segment works', () => {
            cy.get('@textfield')
                .type('9')
                .should('have.value', 'Timeout09')
                .should('have.prop', 'selectionStart', 'Timeout09'.length)
                .should('have.prop', 'selectionEnd', 'Timeout09'.length);
        });

        it('zero-padding for minutes segment works', () => {
            cy.get('@textfield')
                .type('97')
                .should('have.value', 'Timeout09:07')
                .should('have.prop', 'selectionStart', 'Timeout09:07'.length)
                .should('have.prop', 'selectionEnd', 'Timeout09:07'.length);
        });

        it('zero-padding for second segment works', () => {
            cy.get('@textfield')
                .type('976')
                .should('have.value', 'Timeout09:07:06')
                .should('have.prop', 'selectionStart', 'Timeout09:07:06'.length)
                .should('have.prop', 'selectionEnd', 'Timeout09:07:06'.length);
        });

        it('replaceAll + delete => only non-removable postfix', () => {
            cy.get('@textfield')
                .type('123456789')
                .should('have.value', 'Timeout12:34:56.789')
                .type('{selectAll}{backspace}')
                .should('have.value', 'Timeout')
                .should('have.prop', 'selectionStart', 'Timeout'.length)
                .should('have.prop', 'selectionEnd', 'Timeout'.length);
        });

        it('move caret left on attempt to remove colon by Backspace', () => {
            cy.get('@textfield')
                .type('1234')
                .type('{leftArrow}'.repeat('34'.length))
                .should('have.prop', 'selectionStart', 'Timeout12:'.length)
                .should('have.prop', 'selectionEnd', 'Timeout12:'.length)
                .type('{backspace}')
                .should('have.value', 'Timeout12:34')
                .should('have.prop', 'selectionStart', 'Timeout12'.length)
                .should('have.prop', 'selectionEnd', 'Timeout12'.length);
        });

        it('move caret right on attempt to remove colon by Delete', () => {
            cy.get('@textfield')
                .type('1234')
                .type('{leftArrow}'.repeat(':34'.length))
                .should('have.prop', 'selectionStart', 'Timeout12'.length)
                .should('have.prop', 'selectionEnd', 'Timeout12'.length)
                .type('{del}')
                .should('have.value', 'Timeout12:34')
                .should('have.prop', 'selectionStart', 'Timeout12:'.length)
                .should('have.prop', 'selectionEnd', 'Timeout12:'.length);
        });

        it('allows to delete last digit without zero placeholder', () => {
            cy.get('@textfield')
                .type('123456789')
                .should('have.value', 'Timeout12:34:56.789')
                .should('have.prop', 'selectionStart', 'Timeout12:34:56.789'.length)
                .should('have.prop', 'selectionEnd', 'Timeout12:34:56.789'.length)
                .type('{backspace}')
                .should('have.value', 'Timeout12:34:56.78')
                .should('have.prop', 'selectionStart', 'Timeout12:34:56.78'.length)
                .should('have.prop', 'selectionEnd', 'Timeout12:34:56.78'.length)
                .type('{backspace}'.repeat(2))
                .should('have.value', 'Timeout12:34:56')
                .should('have.prop', 'selectionStart', 'Timeout12:34:56'.length)
                .should('have.prop', 'selectionEnd', 'Timeout12:34:56'.length)
                .type('{backspace}'.repeat(3))
                .should('have.value', 'Timeout12:3')
                .should('have.prop', 'selectionStart', 'Timeout12:3'.length)
                .should('have.prop', 'selectionEnd', 'Timeout12:3'.length)
                .type('{backspace}'.repeat(3))
                .should('have.value', 'Timeout')
                .should('have.prop', 'selectionStart', 'Timeout'.length)
                .should('have.prop', 'selectionEnd', 'Timeout'.length)
                .type('{backspace}'.repeat(5))
                .should('have.value', 'Timeout')
                .should('have.prop', 'selectionStart', 'Timeout'.length)
                .should('have.prop', 'selectionEnd', 'Timeout'.length);
        });
    });
});
