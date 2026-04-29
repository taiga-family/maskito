import {DemoPath} from '@demo/constants';

describe('Time with [separators] property', () => {
    describe('Documentation example (fr-CA locale)', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Time}`);
            cy.get('#separator input').should('be.visible').first().focus().as('input');
        });

        it('displays pre-filled fr-CA value correctly', () => {
            cy.get('@input').should('have.value', '18 h 05 min 05,766');
        });

        it('typing replaces pre-filled value digit by digit', () => {
            cy.get('@input')
                .clear()
                .type('1')
                .should('have.value', '1')
                .type('4')
                .should('have.value', '14')
                .type('3')
                .should('have.value', '14 h 3')
                .type('0')
                .should('have.value', '14 h 30')
                .type('0')
                .should('have.value', '14 h 30 min 0')
                .type('5')
                .should('have.value', '14 h 30 min 05');
        });
    });

    describe('dot separator via API', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Time}/API?mode=HH:MM&separators$=1`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .as('input');
        });

        it('types "1430" => "14.30"', () => {
            cy.get('@input')
                .type('1430')
                .should('have.value', '14.30')
                .should('have.prop', 'selectionStart', '14.30'.length)
                .should('have.prop', 'selectionEnd', '14.30'.length);
        });

        it('inserts dot separator automatically after 2 digits', () => {
            cy.get('@input')
                .type('14')
                .should('have.value', '14')
                .type('3')
                .should('have.value', '14.3')
                .should('have.prop', 'selectionStart', '14.3'.length)
                .should('have.prop', 'selectionEnd', '14.3'.length);
        });

        it('Backspace erases digit, not separator', () => {
            cy.get('@input')
                .type('1430')
                .should('have.value', '14.30')
                .type('{backspace}')
                .should('have.value', '14.3')
                .type('{backspace}')
                .should('have.value', '14');
        });

        it('Backspace before separator moves caret left without deleting separator', () => {
            cy.get('@input')
                .type('1430')
                .type('{leftArrow}'.repeat('30'.length))
                .should('have.prop', 'selectionStart', '14.'.length)
                .type('{backspace}')
                .should('have.value', '14.30')
                .should('have.prop', 'selectionStart', '14'.length);
        });
    });

    describe('h separator via API', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Time}/API?mode=HH:MM&separators$=2`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .as('input');
        });

        it('types "1430" => "14h30"', () => {
            cy.get('@input')
                .type('1430')
                .should('have.value', '14h30')
                .should('have.prop', 'selectionStart', '14h30'.length)
                .should('have.prop', 'selectionEnd', '14h30'.length);
        });

        it('inserts h separator automatically after hours', () => {
            cy.get('@input')
                .type('14')
                .should('have.value', '14')
                .type('3')
                .should('have.value', '14h3');
        });
    });

    describe('slash separator via API', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Time}/API?mode=HH:MM&separators$=3`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .as('input');
        });

        it('types "0930" => "09/30"', () => {
            cy.get('@input')
                .type('0930')
                .should('have.value', '09/30')
                .should('have.prop', 'selectionStart', '09/30'.length)
                .should('have.prop', 'selectionEnd', '09/30'.length);
        });
    });

    describe('colon-colon-comma separators via API (HH:MM:SS.MSS)', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Time}/API?mode=HH:MM:SS.MSS&separators$=4`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .as('input');
        });

        it('types digits => "14:30:45,678"', () => {
            cy.get('@input')
                .type('143045678')
                .should('have.value', '14:30:45,678')
                .should('have.prop', 'selectionStart', '14:30:45,678'.length)
                .should('have.prop', 'selectionEnd', '14:30:45,678'.length);
        });

        it('Backspace erases last millisecond digit', () => {
            cy.get('@input')
                .type('143045678')
                .type('{backspace}')
                .should('have.value', '14:30:45,67');
        });
    });
});
