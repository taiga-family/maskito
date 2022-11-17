describe('InputPhone', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('input#phone').clear().as('inputPhone');
    });

    describe('basic typing (1 character per keydown)', () => {
        const tests = [
            // [Typed value, Masked value]
            ['9', '+7 (9'],
            ['91', '+7 (91'],
            ['912', '+7 (912) '],
            ['9123', '+7 (912) 3'],
            ['91234', '+7 (912) 34'],
            ['912345', '+7 (912) 345-'],
            ['9123456', '+7 (912) 345-6'],
            ['91234567', '+7 (912) 345-67-'],
            ['912345678', '+7 (912) 345-67-8'],
            ['9123456789', '+7 (912) 345-67-89'],
            ['91234567890', '+7 (912) 345-67-89'],
            ['912345678900000000', '+7 (912) 345-67-89'],
        ] as const;

        tests.forEach(([typedValue, maskedValue]) => {
            it(`Typing "${typedValue}" => "${maskedValue}"`, () => {
                cy.get('@inputPhone')
                    .type(typedValue)
                    .should('have.value', maskedValue)
                    .should('have.prop', 'selectionStart', maskedValue.length);
            });
        });
    });

    describe('basic erasing (pressing backspace for the last value)', () => {
        beforeEach(() => {
            cy.get('@inputPhone').type('9123456789');
        });

        const tests = [
            // [How many times "Backspace"-key was pressed, Masked value]
            [1, '+7 (912) 345-67-8'],
            [2, '+7 (912) 345-67-'],
            [3, '+7 (912) 345-6'],
            [4, '+7 (912) 345-'],
            [5, '+7 (912) 34'],
            [6, '+7 (912) 3'],
            [7, '+7 (912) '],
            [8, '+7 (91'],
            [9, '+7 (9'],
            [10, '+7 ('],
        ] as const;

        tests.forEach(([n, maskedValue]) => {
            it(`Backspace x${n} => "${maskedValue}"`, () => {
                cy.get('@inputPhone')
                    .type('{backspace}'.repeat(n))
                    .should('have.value', maskedValue)
                    .should('have.prop', 'selectionStart', maskedValue.length);
            });
        });
    });

    describe('Editing somewhere in the middle of a value (NOT the last character)', () => {
        beforeEach(() => {
            cy.get('@inputPhone').type('9123456789');
        });

        // "|"-symbol is the caret position

        it('+7 (912) 345-67-8|9 => Backspace + 0 => +7 (912) 345-67-0|9', () => {
            cy.get('@inputPhone')
                .focus()
                .type('{leftArrow}')
                .should('have.prop', 'selectionStart', '+7 (912) 345-67-8'.length)
                .type('{backspace}')
                .should('have.value', '+7 (912) 345-67-9')
                .should('have.prop', 'selectionStart', '+7 (912) 345-67-'.length)
                .type('0')
                .should('have.value', '+7 (912) 345-67-09')
                .should('have.prop', 'selectionStart', '+7 (912) 345-67-0'.length);
        });

        it('+7 (912) 345-67|-89 => Backspace + 0 => +7 (912) 345-60-|89', () => {
            cy.get('@inputPhone')
                .focus()
                .type('{leftArrow}{leftArrow}{leftArrow}')
                .should('have.prop', 'selectionStart', '+7 (912) 345-67'.length)
                .type('{backspace}')
                .should('have.value', '+7 (912) 345-68-9')
                .should('have.prop', 'selectionStart', '+7 (912) 345-6'.length)
                .type('0')
                .should('have.value', '+7 (912) 345-60-89')
                .should('have.prop', 'selectionStart', '+7 (912) 345-60-'.length);
        });

        it('+7 (912) 345-6|7-89 => Backspace + 0 => +7 (912) 345-0|7-89', () => {
            cy.get('@inputPhone')
                .focus()
                .type('{leftArrow}'.repeat('7-89'.length))
                .should('have.prop', 'selectionStart', '+7 (912) 345-6'.length)
                .type('{backspace}')
                .should('have.value', '+7 (912) 345-78-9')
                .should('have.prop', 'selectionStart', '+7 (912) 345-'.length)
                .type('0')
                .should('have.value', '+7 (912) 345-07-89')
                .should('have.prop', 'selectionStart', '+7 (912) 345-0'.length);
        });
    });

    describe('Press Backspace after fixed value => no value change => move caret to the left', () => {
        beforeEach(() => {
            cy.get('@inputPhone').type('9123456789');
        });

        it('+7 (912) 345-67-|89 => Backspace => +7 (912) 345-67|-89', () => {
            cy.get('@inputPhone')
                .focus()
                .type('{leftArrow}{leftArrow}')
                .should('have.prop', 'selectionStart', '+7 (912) 345-67-'.length)
                .type('{backspace}')
                .should('have.value', '+7 (912) 345-67-89')
                .should('have.prop', 'selectionStart', '+7 (912) 345-67'.length);
        });

        it('+7 (912) 345-|67-89 => Backspace => +7 (912) 345|-67-89', () => {
            cy.get('@inputPhone')
                .focus()
                .type('{leftArrow}'.repeat('67-89'.length))
                .should('have.prop', 'selectionStart', '+7 (912) 345-'.length)
                .type('{backspace}')
                .should('have.value', '+7 (912) 345-67-89')
                .should('have.prop', 'selectionStart', '+7 (912) 345'.length);
        });

        it('+7 (912) |345-67-89 => Backspace x2 => +7 (912|) 345-67-89', () => {
            cy.get('@inputPhone')
                .focus()
                .type('{leftArrow}'.repeat('345-67-89'.length))
                .should('have.prop', 'selectionStart', '+7 (912) '.length)
                .type('{backspace}{backspace}')
                .should('have.value', '+7 (912) 345-67-89')
                .should('have.prop', 'selectionStart', '+7 (912'.length);
        });
    });
});
