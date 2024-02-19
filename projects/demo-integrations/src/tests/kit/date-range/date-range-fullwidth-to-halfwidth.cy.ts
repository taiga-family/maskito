import {DemoPath} from '@demo/constants';

describe('DateRange | Full width character parsing', () => {
    beforeEach(() => {
        cy.visit(`/${DemoPath.DateRange}/API?mode=yyyy%2Fmm%2Fdd&dateSeparator=%2F`);
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
            ['２０１６２２８２', '2016/02/28 – 2'],
            ['２０１６２２８２０', '2016/02/28 – 20'],
            ['２０１６２２８２０２０', '2016/02/28 – 2020'],
            ['２０１６２２８２０２０４', '2016/02/28 – 2020/04'],
            ['２０１６２２８２０２０４４', '2016/02/28 – 2020/04/04'],
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
