import {DemoPath} from '@demo/routes';

describe('Date', () => {
    describe('Max date', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?max=2020-05-05`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('Input less than max value', () => {
            cy.get('@input')
                .type('31122019')
                .should('have.value', '31.12.2019')
                .should('have.prop', 'selectionStart', '31.12.2019'.length)
                .should('have.prop', 'selectionEnd', '31.12.2019'.length);
        });

        it('05.12.202| => type 5 => 05.05.2020 (max value)', () => {
            cy.get('@input')
                .type('0512202')
                .should('have.value', '05.12.202')
                .should('have.prop', 'selectionStart', '05.12.202'.length)
                .should('have.prop', 'selectionEnd', '05.12.202'.length)
                .type('5')
                .should('have.value', '05.05.2020')
                .should('have.prop', 'selectionStart', '05.05.2020'.length)
                .should('have.prop', 'selectionEnd', '05.05.2020'.length);
        });

        it('0|3.05.2020 => type 7 => 05|.05.2020 (max value)', () => {
            cy.get('@input')
                .type('03052020')
                .type('{moveToStart}{rightArrow}')
                .type('7')
                .should('have.value', '05.05.2020')
                .should('have.prop', 'selectionStart', '05.'.length)
                .should('have.prop', 'selectionEnd', '05.'.length);
        });

        it('03.0|5.2020 => type 7 => 05.05|.2020 (max value)', () => {
            cy.get('@input')
                .type('03052020')
                .type('{leftArrow}'.repeat('5.2020'.length))
                .type('7')
                .should('have.value', '05.05.2020')
                .should('have.prop', 'selectionStart', '05.05.'.length)
                .should('have.prop', 'selectionEnd', '05.05.'.length);
        });
    });

    describe('Min date', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?min=2020-05-05`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('Input more than min value', () => {
            cy.get('@input')
                .type('20102022')
                .should('have.value', '20.10.2022')
                .should('have.prop', 'selectionStart', '20.10.2022'.length)
                .should('have.prop', 'selectionEnd', '20.10.2022'.length);
        });

        it('05.12.201| => type 9 => 05.05.2020 (min value)', () => {
            cy.get('@input')
                .type('0512201')
                .should('have.value', '05.12.201')
                .should('have.prop', 'selectionStart', '05.12.201'.length)
                .should('have.prop', 'selectionEnd', '05.12.201'.length)
                .type('9')
                .should('have.value', '05.05.2020')
                .should('have.prop', 'selectionStart', '05.05.2020'.length)
                .should('have.prop', 'selectionEnd', '05.05.2020'.length);
        });

        it('0|7.05.2020 => type 2 => 05|.05.2020 (min value)', () => {
            cy.get('@input')
                .type('07052020')
                .type('{moveToStart}{rightArrow}')
                .type('2')
                .should('have.value', '05.05.2020')
                .should('have.prop', 'selectionStart', '05.'.length)
                .should('have.prop', 'selectionEnd', '05.'.length);
        });

        it('03.0|6.2020 => type 2 => 05.05|.2020 (min value)', () => {
            cy.get('@input')
                .type('03062020')
                .type('{leftArrow}'.repeat('6.2020'.length))
                .type('2')
                .should('have.value', '05.05.2020')
                .should('have.prop', 'selectionStart', '05.05.'.length)
                .should('have.prop', 'selectionEnd', '05.05.'.length);
        });
    });

    describe('Max date, shortened year', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?max=2020-05-05&mode=mm%2Fyy&separator=%2F`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('Input less than max value', () => {
            cy.get('@input')
                .type('0419')
                .should('have.value', '04/19')
                .should('have.prop', 'selectionStart', '04/19'.length)
                .should('have.prop', 'selectionEnd', '04/19'.length);
        });

        it('03/2| => type 9 => 05/20 (max value)', () => {
            cy.get('@input')
                .type('032')
                .should('have.value', '03/2')
                .should('have.prop', 'selectionStart', '03/2'.length)
                .should('have.prop', 'selectionEnd', '03/2'.length)
                .type('9')
                .should('have.value', '05/20')
                .should('have.prop', 'selectionStart', '05/20'.length)
                .should('have.prop', 'selectionEnd', '05/20'.length);
        });
    });

    describe('Min date, shortened year', () => {
        beforeEach(() => {
            cy.visit(`/${DemoPath.Date}/API?min=2020-05-05&mode=mm%2Fyy&separator=%2F`);
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('Input more than min value', () => {
            cy.get('@input')
                .type('0625')
                .should('have.value', '06/25')
                .should('have.prop', 'selectionStart', '06/25'.length)
                .should('have.prop', 'selectionEnd', '06/25'.length);
        });

        it('03/1| => type 9 => 05/20 (min value)', () => {
            cy.get('@input')
                .type('031')
                .should('have.value', '03/1')
                .should('have.prop', 'selectionStart', '03/1'.length)
                .should('have.prop', 'selectionEnd', '03/1'.length)
                .type('9')
                .should('have.value', '05/20')
                .should('have.prop', 'selectionStart', '05/20'.length)
                .should('have.prop', 'selectionEnd', '05/20'.length);
        });
    });
});
