import {DemoPath} from '@demo/constants';

describe('Documentation page "Number" — maskitoLocaleNumber', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Number);
    });

    describe('Example "maskitoLocaleNumber" (de-DE, maximumFractionDigits: 2)', () => {
        beforeEach(() => {
            cy.get('#locale-number input')
                .should('be.visible')
                .first()
                .focus()
                .clear()
                .as('input');
        });

        it('formats integer with dot as thousand separator: 1234567 => 1.234.567', () => {
            cy.get('@input').type('1234567').should('have.value', '1.234.567');
        });

        it('formats decimal with comma as decimal separator: 1234,56 => 1.234,56', () => {
            cy.get('@input').type('1234,56').should('have.value', '1.234,56');
        });

        it('regroups after backspace: 1.234.567 => 123.456', () => {
            cy.get('@input')
                .type('1234567')
                .type('{backspace}')
                .should('have.value', '123.456');
        });
    });
});

describe('Documentation page "Date" — maskitoLocaleDate', () => {
    beforeEach(() => {
        cy.visit(DemoPath.Date);
    });

    describe('Example "maskitoLocaleDate" (de-DE)', () => {
        beforeEach(() => {
            cy.get('#locale-date input').should('be.visible').first().as('input');
        });

        it('has initial value in dd.mm.yyyy format', () => {
            cy.get('@input').should('have.value', '25.12.2000');
        });

        it('types date and inserts dot separators automatically: 01012024 => 01.01.2024', () => {
            cy.get('@input')
                .focus()
                .clear()
                .type('01012024')
                .should('have.value', '01.01.2024');
        });
    });
});

describe('Documentation page "DateRange" — maskitoLocaleDateRange', () => {
    beforeEach(() => {
        cy.visit(DemoPath.DateRange);
    });

    describe('Example "maskitoLocaleDateRange" (en-US)', () => {
        beforeEach(() => {
            cy.get('#locale-date-range input').should('be.visible').first().as('input');
        });

        it('has initial value in mm/dd/yyyy – mm/dd/yyyy format', () => {
            cy.get('@input').should('have.value', '09/20/2020 – 02/06/2023');
        });

        it('types first date and inserts slash separators: 12252000 => 12/25/2000', () => {
            cy.get('@input')
                .focus()
                .clear()
                .type('12252000')
                .should('have.value', '12/25/2000');
        });
    });
});

describe('Documentation page "DateTime" — maskitoLocaleDateTime', () => {
    beforeEach(() => {
        cy.visit(DemoPath.DateTime);
    });

    describe('Example "maskitoLocaleDateTime" (de-DE)', () => {
        beforeEach(() => {
            cy.get('#locale-date-time input').should('be.visible').first().as('input');
        });

        it('has initial value in dd.mm.yyyy, HH:MM format', () => {
            cy.get('@input').should('have.value', '25.12.2000, 15:30');
        });

        it('types datetime with correct separators: 01012024,1430 => 01.01.2024, 14:30', () => {
            cy.get('@input')
                .focus()
                .clear()
                .type('01012024')
                .type(',')
                .type('1430')
                .should('have.value', '01.01.2024, 14:30');
        });
    });
});
