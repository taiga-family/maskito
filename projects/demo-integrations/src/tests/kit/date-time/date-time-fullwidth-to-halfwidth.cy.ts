import {DemoPath} from '@demo/constants';

describe('DateTime | Full width character parsing', () => {
    beforeEach(() => {
        cy.visit(
            `/${DemoPath.DateTime}/API?dateMode=yyyy%2Fmm%2Fdd&timeMode=HH:MM:SS&dateSeparator=%2F`,
        );
        cy.get('#demo-content input').should('be.visible').first().focus().as('input');
    });

    describe('basic typing', () => {
        const tests = [
            // [Typed value, Masked value]
            ['２', '2'],
            ['２０', '20'],
            ['２０１', '201'],
            ['２０１６', '2016'],
            ['２０１６２', '2016/02'],
            ['２０１６２２８', '2016/02/28'],
            ['２０１６２２８３', '2016/02/28, 03'],
            ['２０１６２２８３３０', '2016/02/28, 03:30'],
            ['２０１６２２８３３０４', '2016/02/28, 03:30:4'],
            ['２０１６２２８３３０４５', '2016/02/28, 03:30:45'],
        ] as const;

        tests.forEach(([typedValue, maskedValue]) => {
            it(`Type "${typedValue}" => "${maskedValue}"`, () => {
                cy.get('@input')
                    .type(typedValue)
                    .should('have.value', maskedValue)
                    .should('have.prop', 'selectionStart', maskedValue.length)
                    .should('have.prop', 'selectionEnd', maskedValue.length);
            });
        });
    });
});
