import {DemoPath} from '@demo/constants';

describe('URL', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Url);
        cy.get('#url input').should('have.length', 3);
        cy.get('#url input').eq(0).as('absolute');
        cy.get('#url input').eq(1).as('httpsOnly');
        cy.get('#url input').eq(2).as('relative');
    });

    [
        'http://www.test.com',
        'https://www.test.com',
        'http://test.com',
        'https://test.com',
        'http://subtest.test.com/',
        'www.test.com/sub/sub2',
    ].forEach((url) => {
        it(`accepts absolute URL ${url}`, () => {
            cy.get('@absolute').type(url).should('have.value', url);
        });
    });

    it('rejects whitespace', () => {
        cy.get('@absolute')
            .type('https://test .com')
            .should('have.value', 'https://test.com');
    });

    it('accepts URL with HTTPS protocol in https-only mode', () => {
        cy.get('@httpsOnly')
            .type('https://test.com')
            .should('have.value', 'https://test.com');
    });

    it('rejects URL without HTTPS protocol in https-only mode', () => {
        cy.get('@httpsOnly').type('www.test.com').should('have.value', '');
    });

    it('supports relative URLs when enabled', () => {
        cy.get('@relative').type('/test/test').should('have.value', '/test/test');
    });
});
