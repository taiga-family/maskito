describe('InputNumber', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input#number').clear().as('inputNumber');
    });

    describe('Invalid characters', () => {
        it('rejects spaces', () => {
            cy.get('@inputNumber')
                .type('1 2  3   4    5')
                .should('have.value', '12345')
                .should('have.prop', 'selectionStart', '12345'.length)
                .should('have.prop', 'selectionEnd', '12345'.length);
        });

        it('rejects lowercase latin letters', () => {
            cy.get('@inputNumber')
                .type('123abcdefghijklmnopqrstuvwxyz456')
                .should('have.value', '123456')
                .should('have.prop', 'selectionStart', '123456'.length)
                .should('have.prop', 'selectionEnd', '123456'.length);
        });

        it('rejects uppercase latin letters', () => {
            cy.get('@inputNumber')
                .type('123ABCDEFGHIJKLMNOPQRSTUVWXYZ456')
                .should('have.value', '123456')
                .should('have.prop', 'selectionStart', '123456'.length)
                .should('have.prop', 'selectionEnd', '123456'.length);
        });

        it('rejects lowercase cyrillics letters', () => {
            cy.get('@inputNumber')
                .type('123авгдеёжзийклмнопрстуфхцчшщъыьэя456') // without "б" and "ю"
                .should('have.value', '123456')
                .should('have.prop', 'selectionStart', '123456'.length)
                .should('have.prop', 'selectionEnd', '123456'.length);
        });

        it('rejects uppercase cyrillics letters', () => {
            cy.get('@inputNumber')
                .type('123АВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЯ456')
                .should('have.value', '123456')
                .should('have.prop', 'selectionStart', '123456'.length)
                .should('have.prop', 'selectionEnd', '123456'.length);
        });

        it('rejects punctuation', () => {
            cy.get('@inputNumber')
                .type('123!"№%:;()_456')
                .should('have.value', '123456')
                .should('have.prop', 'selectionStart', '123456'.length)
                .should('have.prop', 'selectionEnd', '123456'.length);
        });
    });

    describe('Decimal separator (symbol used to separate the integer part from the fractional part)', () => {
        it('accepts comma (as the last character)', () => {
            cy.get('@inputNumber')
                .type('123,')
                .should('have.value', '123,')
                .should('have.prop', 'selectionStart', '123,'.length)
                .should('have.prop', 'selectionEnd', '123,'.length);
        });

        it('accepts comma (in the middle)', () => {
            cy.get('@inputNumber')
                .type('42')
                .type('{leftArrow}')
                .type(',')
                .should('have.value', '4,2')
                .should('have.prop', 'selectionStart', '4,'.length)
                .should('have.prop', 'selectionEnd', '4,'.length);
        });

        it('accepts dot (as the last character) and transforms it to comma', () => {
            cy.get('@inputNumber')
                .type('123.')
                .should('have.value', '123,')
                .should('have.prop', 'selectionStart', '123,'.length)
                .should('have.prop', 'selectionEnd', '123,'.length);
        });

        it('accepts dot (in the middle) and transforms it to comma', () => {
            cy.get('@inputNumber')
                .type('42')
                .type('{leftArrow}')
                .type('.')
                .should('have.value', '4,2')
                .should('have.prop', 'selectionStart', '4,'.length)
                .should('have.prop', 'selectionEnd', '4,'.length);
        });

        it('accepts "б" (as the last character) and transforms it to comma', () => {
            cy.get('@inputNumber')
                .type('123б')
                .should('have.value', '123,')
                .should('have.prop', 'selectionStart', '123,'.length)
                .should('have.prop', 'selectionEnd', '123,'.length);
        });

        it('accepts "б" (in the middle) and transforms it to comma', () => {
            cy.get('@inputNumber')
                .type('42')
                .type('{leftArrow}')
                .type('б')
                .should('have.value', '4,2')
                .should('have.prop', 'selectionStart', '4,'.length)
                .should('have.prop', 'selectionEnd', '4,'.length);
        });

        it('accepts "Ю" (as the last character) and transforms it to comma', () => {
            cy.get('@inputNumber')
                .type('123Ю')
                .should('have.value', '123,')
                .should('have.prop', 'selectionStart', '123,'.length)
                .should('have.prop', 'selectionEnd', '123,'.length);
        });

        it('accepts "Ю" (in the middle) and transforms it to comma', () => {
            cy.get('@inputNumber')
                .type('42')
                .type('{leftArrow}')
                .type('Ю')
                .should('have.value', '4,2')
                .should('have.prop', 'selectionStart', '4,'.length)
                .should('have.prop', 'selectionEnd', '4,'.length);
        });
    });
});
