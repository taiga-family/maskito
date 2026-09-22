import {DemoPath} from '@demo/constants';

describe('DateTime | timeSeparators', () => {
    describe('Documentation example (fr-CA locale)', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateTime}`);
            cy.get('#time-separators input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('displays pre-filled fr-CA value correctly', () => {
            cy.get('@input').should('have.value', '2025-05-10 18 h 30 min 05');
        });

        it('typing replaces pre-filled value digit by digit', () => {
            cy.get('@input')
                .clear()
                .type('20250510')
                .should('have.value', '2025-05-10')
                .type('1')
                .should('have.value', '2025-05-10 1')
                .type('8')
                .should('have.value', '2025-05-10 18')
                .type('3')
                .should('have.value', '2025-05-10 18 h 3')
                .type('0')
                .should('have.value', '2025-05-10 18 h 30')
                .type('0')
                .should('have.value', '2025-05-10 18 h 30 min 0')
                .type('5')
                .should('have.value', '2025-05-10 18 h 30 min 05')
                .should('have.prop', 'selectionStart', '2025-05-10 18 h 30 min 05'.length)
                .should('have.prop', 'selectionEnd', '2025-05-10 18 h 30 min 05'.length);
        });

        it('pads invalid time segment with zero', () => {
            cy.get('@input')
                .clear()
                .type('20250510')
                .should('have.value', '2025-05-10')
                .type('9')
                .should('have.value', '2025-05-10 09')
                .type('7')
                .should('have.value', '2025-05-10 09 h 07')
                .should('have.prop', 'selectionStart', '2025-05-10 09 h 07'.length)
                .should('have.prop', 'selectionEnd', '2025-05-10 09 h 07'.length);
        });

        it('Backspace erases digits together with multi-character separators', () => {
            cy.get('@input')
                .type('{moveToEnd}')
                .type('{backspace}')
                .should('have.value', '2025-05-10 18 h 30 min 0')
                .type('{backspace}')
                .should('have.value', '2025-05-10 18 h 30')
                .type('{backspace}')
                .should('have.value', '2025-05-10 18 h 3')
                .type('{backspace}')
                .should('have.value', '2025-05-10 18');
        });
    });

    describe('dot separator via API', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.DateTime}/API?timeMode=HH:MM:SS&timeSeparators$=1`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .as('input');
        });

        it('types "05022004143005" => "05.02.2004, 14.30:05"', () => {
            cy.get('@input')
                .type('05022004143005')
                .should('have.value', '05.02.2004, 14.30:05')
                .should('have.prop', 'selectionStart', '05.02.2004, 14.30:05'.length)
                .should('have.prop', 'selectionEnd', '05.02.2004, 14.30:05'.length);
        });

        it('Backspace before separator moves caret left without deleting separator', () => {
            cy.get('@input')
                .type('050220041430')
                .should('have.value', '05.02.2004, 14.30')
                .type('{leftArrow}'.repeat('30'.length))
                .should('have.prop', 'selectionStart', '05.02.2004, 14.'.length)
                .type('{backspace}')
                .should('have.value', '05.02.2004, 14.30')
                .should('have.prop', 'selectionStart', '05.02.2004, 14'.length);
        });
    });

    describe('multi-character separators + time stepping via API', () => {
        beforeEach(() => {
            cy.visit(
                `/${DemoPath.DateTime}/API?timeMode=HH:MM:SS&timeSeparators$=3&timeStep=1`,
            );
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .type('05022004143005')
                .should('have.value', '05.02.2004, 14 h 30 min 05')
                .as('input');
        });

        it('increments minutes segment by ArrowUp', () => {
            cy.get('@input')
                .type('{leftArrow}'.repeat(' min 05'.length))
                .type('{upArrow}')
                .should('have.value', '05.02.2004, 14 h 31 min 05');
        });

        it('decrements seconds segment by ArrowDown', () => {
            cy.get('@input')
                .type('{downArrow}')
                .should('have.value', '05.02.2004, 14 h 30 min 04');
        });

        it('increments hours segment by ArrowUp', () => {
            cy.get('@input')
                .type('{leftArrow}'.repeat(' h 30 min 05'.length))
                .type('{upArrow}')
                .should('have.value', '05.02.2004, 15 h 30 min 05');
        });
    });
});
