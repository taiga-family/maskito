import {DemoPath} from '@demo/path';

describe('DateTime | mode', () => {
    describe('Date mode', () => {
        describe('mm.dd.yyyy', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateTime}/API?dateMode=mm%2Fdd%2Fyyyy`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('12.31.2000, 13:20', () => {
                cy.get('@input')
                    .type('123120001320')
                    .should('have.value', '12.31.2000, 13:20')
                    .should('have.prop', 'selectionStart', '12.31.2000, 13:20'.length)
                    .should('have.prop', 'selectionEnd', '12.31.2000, 13:20'.length);
            });

            it('Empty input => Type 3 => 03|', () => {
                cy.get('@input')
                    .type('3')
                    .should('have.value', '03')
                    .should('have.prop', 'selectionStart', '03'.length)
                    .should('have.prop', 'selectionEnd', '03'.length);
            });

            it('12| => Type 3 => 12.3|', () => {
                cy.get('@input')
                    .type('123')
                    .should('have.value', '12.3')
                    .should('have.prop', 'selectionStart', '12.3'.length)
                    .should('have.prop', 'selectionEnd', '12.3'.length);
            });

            it('12| => Type 4 => 12.04|', () => {
                cy.get('@input')
                    .type('124')
                    .should('have.value', '12.04')
                    .should('have.prop', 'selectionStart', '12.04'.length)
                    .should('have.prop', 'selectionEnd', '12.04'.length);
            });
        });

        describe('yyyy.mm.dd', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateTime}/API?dateMode=yyyy%2Fmm%2Fdd`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('2000.12.31, 12:20', () => {
                cy.get('@input')
                    .type('20001231,1220')
                    .should('have.value', '2000.12.31, 12:20')
                    .should('have.prop', 'selectionStart', '2000.12.31, 12:20'.length)
                    .should('have.prop', 'selectionEnd', '2000.12.31, 12:20'.length);
            });

            it('2000| => Type 3 => 2000.03|', () => {
                cy.get('@input')
                    .type('20003')
                    .should('have.value', '2000.03')
                    .should('have.prop', 'selectionStart', '2000.03'.length)
                    .should('have.prop', 'selectionEnd', '2000.03'.length);
            });

            it('2000.03| => Type 5 => 2000.03.05|', () => {
                cy.get('@input')
                    .type('200035')
                    .should('have.value', '2000.03.05')
                    .should('have.prop', 'selectionStart', '2000.03.05'.length)
                    .should('have.prop', 'selectionEnd', '2000.03.05'.length);
            });
        });
    });

    describe('Time', () => {
        describe('HH:MM', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateTime}/API?timeMode=HH:MM`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('12.01.2000, 13:20 => type 12 => no value changes', () => {
                cy.get('@input')
                    .type('120120001320')
                    .should('have.value', '12.01.2000, 13:20')
                    .should('have.prop', 'selectionStart', '12.01.2000, 13:20'.length)
                    .should('have.prop', 'selectionEnd', '12.01.2000, 13:20'.length)
                    .type('12')
                    .should('have.value', '12.01.2000, 13:20')
                    .should('have.prop', 'selectionStart', '12.01.2000, 13:20'.length)
                    .should('have.prop', 'selectionEnd', '12.01.2000, 13:20'.length);
            });
        });

        describe('HH:MM:SS', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateTime}/API?timeMode=HH:MM:SS`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('12.01.2000, 13:20:30 => type 12 => no value changes', () => {
                cy.get('@input')
                    .type('12012000132030')
                    .should('have.value', '12.01.2000, 13:20:30')
                    .should('have.prop', 'selectionStart', '12.01.2000, 13:20:30'.length)
                    .should('have.prop', 'selectionEnd', '12.01.2000, 13:20:30'.length)
                    .type('12')
                    .should('have.value', '12.01.2000, 13:20:30')
                    .should('have.prop', 'selectionStart', '12.01.2000, 13:20:30'.length)
                    .should('have.prop', 'selectionEnd', '12.01.2000, 13:20:30'.length);
            });
        });

        describe('HH:MM:SS.MSS', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.DateTime}/API?timeMode=HH:MM:SS.MSS`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('12.01.2000, 13:20:30.123', () => {
                cy.get('@input')
                    .type('12012000132030123')
                    .should('have.value', '12.01.2000, 13:20:30.123')
                    .should(
                        'have.prop',
                        'selectionStart',
                        '12.01.2000, 13:20:30.123'.length,
                    )
                    .should(
                        'have.prop',
                        'selectionEnd',
                        '12.01.2000, 13:20:30.123'.length,
                    );
            });
        });
    });
});
