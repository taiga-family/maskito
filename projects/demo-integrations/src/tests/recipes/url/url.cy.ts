import {DemoPath} from '@demo/constants';

describe('URL', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Url);
        cy.get('#url input').should('have.length', 3);
        cy.get('#url input').eq(0).as('absolute');
        cy.get('#url input').eq(1).as('httpsOnly');
        cy.get('#url input').eq(2).as('relative');
    });

    it('accepts common absolute URL forms', () => {
        const urls = [
            'http://www.test.com',
            'https://www.test.com',
            'http://test.com',
            'https://test.com',
            'http://subtest.test.com/',
            'www.test.com/sub/sub2',
        ];

        for (const url of urls) {
            cy.get('@absolute').clear().type(url).should('have.value', url);
        }
    });

    it('rejects whitespace', () => {
        cy.get('@absolute')
            .type('https://test .com')
            .should('have.value', 'https://test.com');
    });

    it('supports https-only mode', () => {
        cy.get('@httpsOnly').type('https://test.com').should('have.value', 'https://test.com');
        cy.get('@httpsOnly').clear().type('www.test.com').should('have.value', '');
    });

    it('supports relative URLs when enabled', () => {
        cy.get('@relative').type('/test/test').should('have.value', '/test/test');
    });
});
