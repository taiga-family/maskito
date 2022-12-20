import {DemoPath} from 'projects/demo/src/app/app.routes';

describe('Time | Paste Event', {browser: 'electron'}, () => {
    beforeEach(() => {
        cy.visit(`/${DemoPath.Time}/API?mode=HH:MM`);
        cy.get('#demoContent input')
            .should('be.visible')
            .first()
            .focus()
            .clear()
            .type('{moveToStart}')
            .as('input');
    });

    it('works', () => {
        cy.writeTextToClipboard('1111');

        cy.get('@input')
            .focus()
            .type('2359')
            .type('{selectall}')
            .pasteFromClipboard()
            .should('have.value', '11:11');
    });
});
