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

    it('"pasteFromClipboard"-commands changes value of input-element', () => {
        cy.writeTextToClipboard('1111');

        cy.get('@input')
            .focus()
            .type('2359')
            .type('{selectall}')
            .pasteFromClipboard()
            .should('have.value', '11:11');
    });

    it('"pasteFromClipboard"-commands triggers InputEvent', () => {
        cy.writeTextToClipboard('22:22');

        cy.document().then(doc => {
            doc.addEventListener('input', cy.stub().as('inputEvent'));
        });

        cy.get('@input').focus().type('{selectall}').pasteFromClipboard();

        cy.get('@inputEvent').should('have.been.calledOnce');
        cy.get('@inputEvent').should('have.been.calledWithMatch', {
            inputType: 'insertFromPaste',
            data: '22:22', // If you change it to `null`, it will pass :(
        });
    });

    it('"pasteFromClipboard"-commands triggers BeforeInputEvent', () => {
        cy.writeTextToClipboard('22:22');

        cy.document().then(doc => {
            doc.addEventListener('beforeinput', cy.stub().as('beforeInputEvent'));
        });

        cy.get('@input').focus().type('{selectall}').pasteFromClipboard();

        cy.get('@beforeInputEvent').should('have.been.calledOnce');
    });
});
