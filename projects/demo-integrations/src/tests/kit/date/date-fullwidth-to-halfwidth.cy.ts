import {DemoPath} from '@demo/constants';

/* NOTE: yyyy/mm/dd is very common in Japan */
describe('Date', () => {
    describe('Full width character parsing', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?mode=yyyy%2Fmm%2Fdd&separator=%2F`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        describe('Accepts all of full width characters', () => {
            it('２０１９１２３１ => 2019/12/31', () => {
                cy.get('@input')
                    .type('２０１９１２３１')
                    .should('have.value', '2019/12/31')
                    .should('have.prop', 'selectionStart', '2019/12/31'.length)
                    .should('have.prop', 'selectionEnd', '2019/12/31'.length);
            });
        });

        describe('pads digits with zero if date segment exceeds its max possible value', () => {
            // NOTE: months can be > 12 => pads the first 2 with zero
            it('２０１０２| => type ９ => 2010/02|', () => {
                cy.get('@input')
                    .type('２０１０２')
                    .should('have.value', '2010/02')
                    .should('have.prop', 'selectionStart', '2010/02'.length)
                    .should('have.prop', 'selectionEnd', '2010/02'.length)
                    .type('９')
                    .should('have.value', '2010/02/09')
                    .should('have.prop', 'selectionStart', '2010/02/09'.length)
                    .should('have.prop', 'selectionEnd', '2010/02/09'.length);
            });
        });
    });
});
