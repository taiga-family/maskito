import {DemoPath} from '@demo/constants';
import {BROWSER_SUPPORTS_REAL_EVENTS} from 'projects/demo-integrations/src/support/constants';

describe('DateTime | timeStep', () => {
    describe('yy/mm;HH:MM:SS.MSS', () => {
        describe('timeStep = 1, initial state = 22.12;', () => {
            beforeEach(() => {
                cy.visit(
                    `/${DemoPath.DateTime}/API?dateTimeSeparator=;&dateMode=yy%2Fmm&timeStep=1&timeMode=HH:MM:SS.MSS`,
                );
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');

                cy.get('@input')
                    .type('2212;')
                    .should('have.value', '22.12;')
                    .should('have.a.prop', 'selectionStart', '22.12;'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;'.length);
            });

            it('decrements hours segment by pressing ArrowDown at different places of the segment', () => {
                cy.get('@input')
                    .type('{downArrow}')
                    .should('have.value', '22.12;23')
                    .should('have.a.prop', 'selectionStart', '22.12;'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;'.length)
                    .type('{rightArrow}{downArrow}')
                    .should('have.value', '22.12;22')
                    .should('have.a.prop', 'selectionStart', '22.12;2'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;2'.length)
                    .type('{rightArrow}')
                    .type('{upArrow}'.repeat(12))
                    .should('have.value', '22.12;10')
                    .should('have.a.prop', 'selectionStart', '22.12;10'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;10'.length);
            });

            it('increments/decrements minutes segment by pressing keyboard arrows at different places of the segment', () => {
                cy.get('@input')
                    .type('12:')
                    .should('have.value', '22.12;12:')
                    .should('have.a.prop', 'selectionStart', '22.12;12:'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;12:'.length)
                    .type('{upArrow}')
                    .should('have.value', '22.12;12:01')
                    .should('have.a.prop', 'selectionStart', '22.12;12:'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;12:'.length)
                    .type('{rightArrow}')
                    .type('{upArrow}'.repeat(9))
                    .should('have.value', '22.12;12:10')
                    .should('have.a.prop', 'selectionStart', '22.12;12:1'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;12:1'.length)
                    .type('{rightArrow}')
                    .type('{downArrow}'.repeat(34))
                    .should('have.value', '22.12;12:36')
                    .should('have.a.prop', 'selectionStart', '22.12;12:36'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;12:36'.length);
            });

            it('changes seconds segment by pressing keyboard arrow up/down', () => {
                cy.get('@input')
                    .type('12:10:')
                    .should('have.value', '22.12;12:10:')
                    .should('have.a.prop', 'selectionStart', '22.12;12:10:'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;12:10:'.length)
                    .type('{downArrow}'.repeat(6))
                    .should('have.value', '22.12;12:10:54')
                    .should('have.a.prop', 'selectionStart', '22.12;12:10:'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;12:10:'.length)
                    .type('{rightArrow}{upArrow}'.repeat(2))
                    .should('have.value', '22.12;12:10:56')
                    .should('have.a.prop', 'selectionStart', '22.12;12:10:56'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;12:10:56'.length);
            });

            it('changes milliseconds segment by pressing keyboard arrow up/down', () => {
                cy.get('@input')
                    .type('213212.')
                    .should('have.value', '22.12;21:32:12.')
                    .should('have.a.prop', 'selectionStart', '22.12;21:32:12.'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;21:32:12.'.length)
                    .type('{upArrow}{rightArrow}'.repeat(3))
                    .type('{downArrow}')
                    .should('have.value', '22.12;21:32:12.002')
                    .should('have.a.prop', 'selectionStart', '22.12;21:32:12.002'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;21:32:12.002'.length);
            });

            it('type 213212. => 22.12;21:32:12.| => type ({downArrow}{rightArrow}) * 3 + {downArrow} => 22.12:21:32:12.995|', () => {
                cy.get('@input')
                    .type('213212.')
                    .should('have.value', '22.12;21:32:12.')
                    .should('have.a.prop', 'selectionStart', '22.12;21:32:12.'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;21:32:12.'.length)
                    .type('{downArrow}{rightArrow}'.repeat(3))
                    .type('{downArrow}')
                    .should('have.value', '22.12;21:32:12.996')
                    .should('have.a.prop', 'selectionStart', '22.12;21:32:12.996'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;21:32:12.996'.length);
            });

            it('should affect only time segments', () => {
                cy.get('@input')
                    .type('123456111')
                    .should('have.value', '22.12;12:34:56.111')
                    .should('have.a.prop', 'selectionStart', '22.12;12:34:56.111'.length)
                    .should('have.a.prop', 'selectionEnd', '22.12;12:34:56.111'.length)
                    .type('{upArrow}{leftArrow}'.repeat('22.12;12:34:56.111'.length))
                    .should('have.value', '22.12;15:37:59.115')
                    .should('have.a.prop', 'selectionStart', 0)
                    .should('have.a.prop', 'selectionEnd', 0);
            });
        });

        describe('timeStep = 0 (disabled time stepping)', () => {
            beforeEach(() => {
                cy.visit(
                    `/${DemoPath.DateTime}/API?dateTimeSeparator=;&dateMode=yy%2Fmm&timeStep=0&timeMode=HH:MM:SS.MSS`,
                );
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');

                cy.get('@input')
                    .type('1202123456000')
                    .should('have.value', '12.02;12:34:56.000')
                    .should('have.a.prop', 'selectionStart', '12.02;12:34:56.000'.length)
                    .should('have.a.prop', 'selectionEnd', '12.02;12:34:56.000'.length);
            });

            it('should be disabled', BROWSER_SUPPORTS_REAL_EVENTS, () => {
                cy.get('@input').realPress('ArrowUp');

                cy.get('@input')
                    .should('have.a.prop', 'selectionStart', 0)
                    .should('have.a.prop', 'selectionEnd', 0)
                    .realPress('ArrowDown');

                cy.get('@input')
                    .should('have.a.prop', 'selectionStart', '12.02;12:34:56.000'.length)
                    .should('have.a.prop', 'selectionEnd', '12.02;12:34:56.000'.length);
            });
        });
    });
});
