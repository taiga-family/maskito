import {openNumberPage} from './utils';

describe('Properly using custom minus sign', () => {
    describe('correctly applies \u002D as minus sign', () => {
        beforeEach(() => {
            openNumberPage('minusSign=\u002D');
        });

        it('-32412 => \u002D32 412', () => {
            cy.get('@input').type('-32412').should('have.value', '\u002D32 412');
        });

        it('\u002D32412 => \u002D32 412', () => {
            cy.get('@input').type('-32412').should('have.value', '\u002D32 412');
        });

        it('\u30FC32412 => \u002D32 412', () => {
            cy.get('@input').type('\u30FC32412').should('have.value', '\u002D32 412');
        });

        it('\u201332412 => \u002D32 412', () => {
            cy.get('@input').type('\u201332412').should('have.value', '\u002D32 412');
        });
    });

    describe('correctly works with decimal, and minus sign is i', () => {
        beforeEach(() => {
            openNumberPage('minusSign=i&precision=Infinity');
        });

        it('-324,12 => i324.12', () => {
            cy.get('@input').type('-324,12').should('have.value', 'i 324.12');
        });

        it('\u002D324,12 => i324.12', () => {
            cy.get('@input').type('\u002D324,12').should('have.value', 'i 324.12');
        });

        it('\u30FC324,12 => i324.12', () => {
            cy.get('@input').type('\u30FC324,12').should('have.value', 'i 324.12');
        });

        it('\u2013324,12 => i324.12', () => {
            cy.get('@input').type('\u2013324,12').should('have.value', 'i 324.12');
        });
    });
});
