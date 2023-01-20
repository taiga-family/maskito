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

        it('0|3.06.2020 => type 7 => 05|.05.2020 (max value)', () => {
            cy.get('@input')
                .type('03062020')
                .type('{leftArrow}'.repeat('3.06.2020'.length))
                .type('7')
                .should('have.value', '05.05.2020')
                .should('have.prop', 'selectionStart', '05.'.length)
                .should('have.prop', 'selectionEnd', '05.'.length);
        });

        it('03.0|6.2020 => type 7 => 05.05|.2020 (max value)', () => {
            cy.get('@input')
                .type('03072020')
                .type('{leftArrow}'.repeat('6.2020'.length))
                .type('7')
                .should('have.value', '05.05.2020')
                .should('have.prop', 'selectionStart', '05.06.'.length)
                .should('have.prop', 'selectionEnd', '05.06.'.length);
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
                .type('{leftArrow}'.repeat('7.05.2020'.length))
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
                .should('have.value', '05.05.2020');
        });
    });
});
