import {DemoPath} from '@demo/path';

describe('Number | Prefix & Postfix', () => {
    beforeEach(() => {
        cy.visit(
            `/${DemoPath.Number}/API?decimalSeparator=.&thousandSeparator=_&precision=2&prefix=$`,
        );
        cy.get('#demo-content input').should('be.visible').first().as('input');

        cy.get('tr')
            .contains('[postfix]')
            .parents('tr')
            .find('tui-primitive-textfield')
            .type(' per day');

        cy.get('@input')
            .focus()
            .should('have.value', '$ per day')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    describe('thousand separators correctly works with prefix', () => {
        it('Type 1000000', () => {
            cy.get('@input')
                .type('1000000')
                .should('have.value', '$1_000_000 per day')
                .should('have.prop', 'selectionStart', '$1_000_000'.length)
                .should('have.prop', 'selectionEnd', '$1_000_000'.length);
        });

        it('$1_000_000| per day => Backspace => Backspace x2', () => {
            cy.get('@input')
                .type('1000000')
                .type('{backspace}')
                .should('have.value', '$100_000 per day')
                .should('have.prop', 'selectionStart', '$100_000'.length)
                .should('have.prop', 'selectionEnd', '$100_000'.length)
                .type('{backspace}'.repeat(2))
                .should('have.value', '$1_000 per day')
                .should('have.prop', 'selectionStart', '$1_000'.length)
                .should('have.prop', 'selectionEnd', '$1_000'.length)
                .type('{backspace}')
                .should('have.value', '$100 per day')
                .should('have.prop', 'selectionStart', '$100'.length)
                .should('have.prop', 'selectionEnd', '$100'.length);
        });

        // TODO: BUG!
        // https://github.com/Tinkoff/maskito/issues/263
        it.skip('$|1_234 per day => Del => $|234 per day', () => {
            cy.get('@input')
                .type('1234')
                .should('have.value', '$1_234 per day')
                .should('have.prop', 'selectionStart', '$1_234'.length)
                .should('have.prop', 'selectionEnd', '$1_234'.length)
                .type('{moveToStart}{rightArrow}{del}')
                .should('have.value', '$234 per day')
                .should('have.prop', 'selectionStart', '$234'.length)
                .should('have.prop', 'selectionEnd', '$234'.length);
        });

        it('$1_2|34 per day => Del => $|234 per day', () => {
            cy.get('@input')
                .type('1234')
                .should('have.value', '$1_234 per day')
                .should('have.prop', 'selectionStart', '$1_234'.length)
                .should('have.prop', 'selectionEnd', '$1_234'.length)
                .type('{leftArrow}{leftArrow}{backspace}')
                .should('have.value', '$134 per day')
                .should('have.prop', 'selectionStart', '$1'.length)
                .should('have.prop', 'selectionEnd', '$1'.length);
        });
    });

    it('pads integer part with zero if user types decimal separator (for empty input)', () => {
        cy.get('@input')
            .type('.45')
            .should('have.value', '$0.45 per day')
            .should('have.prop', 'selectionStart', '$0.45'.length)
            .should('have.prop', 'selectionEnd', '$0.45'.length);
    });

    it('precision works', () => {
        cy.get('@input')
            .type('.12345678')
            .should('have.value', '$0.12 per day')
            .should('have.prop', 'selectionStart', '$0.12'.length)
            .should('have.prop', 'selectionEnd', '$0.12'.length);
    });

    describe('it removes repeated leading zeroes for integer part', () => {
        it('Type 000000 => $0| per day', () => {
            cy.get('@input')
                .type('000000')
                .should('have.value', '$0 per day')
                .should('have.prop', 'selectionStart', '$0'.length)
                .should('have.prop', 'selectionEnd', '$0'.length);
        });

        it('$0| per day => Type 5 => $5| per day', () => {
            cy.get('@input')
                .type('0')
                .should('have.value', '$0 per day')
                .should('have.prop', 'selectionStart', '$0'.length)
                .should('have.prop', 'selectionEnd', '$0'.length)
                .type('5')
                .should('have.value', '$5 per day')
                .should('have.prop', 'selectionStart', '$5'.length)
                .should('have.prop', 'selectionEnd', '$5'.length);
        });

        it('$0.|05 per day => Backspace => $|5 per day', () => {
            cy.get('@input')
                .type('0.05')
                .type('{leftArrow}'.repeat('05'.length))
                .type('{backspace}')
                .should('have.value', '$5 per day')
                .should('have.prop', 'selectionStart', '$'.length)
                .should('have.prop', 'selectionEnd', '$'.length);
        });
    });

    describe('cannot erase prefix', () => {
        it('Select all + Backspace', () => {
            cy.get('@input')
                .type('{selectAll}{backspace}')
                .should('have.value', '$ per day')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('$|42 per day => Backspace => $|42 per day', () => {
            cy.get('@input')
                .type('42')
                .type('{moveToStart}{rightArrow}')
                .type('{backspace}'.repeat(5))
                .should('have.value', '$42 per day')
                .should('have.prop', 'selectionStart', '$'.length)
                .should('have.prop', 'selectionEnd', '$'.length);
        });

        it('|$42 per day => Delete => $|42 per day', () => {
            cy.get('@input')
                .type('42')
                .type('{moveToStart}{del}')
                .should('have.value', '$42 per day')
                .should('have.prop', 'selectionStart', '$'.length)
                .should('have.prop', 'selectionEnd', '$'.length);
        });
    });

    describe('cannot erase postfix', () => {
        it('Select all + Delete', () => {
            cy.get('@input')
                .type('{selectAll}{backspace}')
                .should('have.value', '$ per day')
                .should('have.prop', 'selectionStart', 1)
                .should('have.prop', 'selectionEnd', 1);
        });

        it('$42 per day| => Backspace => $42 per| day', () => {
            cy.get('@input')
                .type('42')
                .type('{moveToEnd}')
                .type('{backspace}'.repeat(4))
                .should('have.value', '$42 per day')
                .should('have.prop', 'selectionStart', '$42 per'.length)
                .should('have.prop', 'selectionEnd', '$42 per'.length);
        });
    });
});
