import {DemoPath} from '@demo/constants';

describe('DateRange | Date segments zero padding (pads digits with zero if date segment exceeds its max possible value)', () => {
    describe('[mode]="dd.mm.yyyy"', () => {
        const mode = encodeURIComponent('dd/mm/yyyy');
        const FIRST_DATE = '01.01.2000';

        beforeEach(() => {
            cy.visit(
                `/${DemoPath.DateRange}/API?mode=${mode}&dateSeparator=.&rangeSeparator=-`,
            );
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .type('01012000')
                .should('have.value', FIRST_DATE)
                .as('input');
        });

        describe('if users enters two digits and its combination exceeds the first (and only first!) non-year date segment - pad the first digit with zero', () => {
            it('{firstDate} => Type 35 => {firstDate}-03.05|', () => {
                cy.get('@input')
                    .type('35')
                    .should('have.value', `${FIRST_DATE}-03.05`)
                    .should('have.prop', 'selectionStart', `${FIRST_DATE}-03.05`.length)
                    .should('have.prop', 'selectionEnd', `${FIRST_DATE}-03.05`.length);
            });

            it('{firstDate}-|19.01.2025 => Type 3 => {firstDate}-3|0.01.2025', () => {
                cy.get('@input')
                    .type('19012025')
                    .should('have.value', `${FIRST_DATE}-19.01.2025`)
                    .type('{leftArrow}'.repeat('19.01.2025'.length))
                    .should('have.prop', 'selectionStart', `${FIRST_DATE}-`.length)
                    .should('have.prop', 'selectionEnd', `${FIRST_DATE}-`.length)
                    .type('3')
                    .should('have.value', `${FIRST_DATE}-30.01.2025`)
                    .should('have.prop', 'selectionStart', `${FIRST_DATE}-3`.length)
                    .should('have.prop', 'selectionEnd', `${FIRST_DATE}-3`.length);
            });

            it('{firstDate}-31.1| => Type 3 => {firstDate}-31.1|', () => {
                cy.get('@input')
                    .type('311')
                    .should('have.value', `${FIRST_DATE}-31.1`)
                    .type('3')
                    .should('have.value', `${FIRST_DATE}-31.1`)
                    .should('have.prop', 'selectionStart', `${FIRST_DATE}-31.1`.length)
                    .should('have.prop', 'selectionEnd', `${FIRST_DATE}-31.1`.length);
            });
        });
    });

    describe('[mode]="mm/dd/yyyy"', () => {
        const mode = encodeURIComponent('mm/dd/yyyy');
        const dateSeparator = encodeURIComponent('/');
        const FIRST_DATE = '01/01/2000';

        beforeEach(() => {
            cy.visit(
                `/${DemoPath.DateRange}/API?mode=${mode}&dateSeparator=${dateSeparator}&rangeSeparator=-`,
            );
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .type('01012000')
                .should('have.value', FIRST_DATE)
                .as('input');
        });

        describe('handles month value exceeding maximum', () => {
            it('{firstDate} => Type 13 => {firstDate}-01/3', () => {
                cy.get('@input')
                    .type('13')
                    .should('have.value', `${FIRST_DATE}-01/3`)
                    .should('have.prop', 'selectionStart', `${FIRST_DATE}-01/3`.length)
                    .should('have.prop', 'selectionEnd', `${FIRST_DATE}-01/3`.length);
            });
        });
    });

    describe('[mode]="yyyy/mm/dd"', () => {
        const mode = encodeURIComponent('yyyy/mm/dd');
        const dateSeparator = encodeURIComponent('/');
        const FIRST_DATE = '2000/01/01';

        beforeEach(() => {
            cy.visit(
                `/${DemoPath.DateRange}/API?mode=${mode}&dateSeparator=${dateSeparator}&&rangeSeparator=-`,
            );
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .type('20000101')
                .should('have.value', FIRST_DATE)
                .as('input');
        });

        describe('if users enters two digits and its combination exceeds the first (and only first!) non-year date segment - pad the first digit with zero', () => {
            it('2025 => Type 35 => 2025/03/05|', () => {
                cy.get('@input')
                    .type('202535')
                    .should('have.value', `${FIRST_DATE}-2025/03/05`)
                    .should(
                        'have.prop',
                        'selectionStart',
                        `${FIRST_DATE}-2025/03/05`.length,
                    )
                    .should(
                        'have.prop',
                        'selectionEnd',
                        `${FIRST_DATE}-2025/03/05`.length,
                    );
            });

            it('2025/|09/30 => Type 1 => 2025/1|0/30', () => {
                cy.get('@input')
                    .type('2025930')
                    .should('have.value', `${FIRST_DATE}-2025/09/30`)
                    .type('{leftArrow}'.repeat('09/30'.length))
                    .should('have.prop', 'selectionStart', `${FIRST_DATE}-2025/`.length)
                    .should('have.prop', 'selectionEnd', `${FIRST_DATE}-2025/`.length)
                    .type('1')
                    .should('have.value', `${FIRST_DATE}-2025/10/30`)
                    .should('have.prop', 'selectionStart', `${FIRST_DATE}-2025/1`.length)
                    .should('have.prop', 'selectionEnd', `${FIRST_DATE}-2025/1`.length);
            });

            it('2025.01.3| => Type 5 => 2025.01.3|', () => {
                cy.get('@input')
                    .type('2025013')
                    .should('have.value', `${FIRST_DATE}-2025/01/3`)
                    .type('5')
                    .should('have.value', `${FIRST_DATE}-2025/01/3`)
                    .should(
                        'have.prop',
                        'selectionStart',
                        `${FIRST_DATE}-2025/01/3`.length,
                    )
                    .should(
                        'have.prop',
                        'selectionEnd',
                        `${FIRST_DATE}-2025/01/3`.length,
                    );
            });
        });
    });
});
