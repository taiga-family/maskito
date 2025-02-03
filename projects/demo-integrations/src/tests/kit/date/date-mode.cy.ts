import {DemoPath} from '@demo/constants';

describe('Date', () => {
    describe('Mode', () => {
        describe('yyyy/mm/dd', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=yyyy%2Fmm%2Fdd`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it(' "yyyy/mm/dd" => 2019.12.31', () => {
                cy.get('@input')
                    .type('20193')
                    .should('have.value', '2019.03')
                    .should('have.prop', 'selectionStart', '2019.03'.length)
                    .should('have.prop', 'selectionEnd', '2019.03'.length)
                    .type('22')
                    .should('have.value', '2019.03.22')
                    .should('have.prop', 'selectionStart', '2019.03.22'.length)
                    .should('have.prop', 'selectionEnd', '2019.03.22'.length);
            });
        });

        describe('mm/dd/yyyy', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=mm%2Fdd%2Fyyyy`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it(' "mm/dd/yyyy" => 03.12.2020', () => {
                cy.get('@input')
                    .type('312')
                    .should('have.value', '03.12')
                    .should('have.prop', 'selectionStart', '03.12'.length)
                    .should('have.prop', 'selectionEnd', '03.12'.length)
                    .type('2022')
                    .should('have.value', '03.12.2022')
                    .should('have.prop', 'selectionStart', '03.12.2022'.length)
                    .should('have.prop', 'selectionEnd', '03.12.2022'.length);
            });
        });

        describe('mm/yy', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=mm%2Fyy`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('"mm/yy" => 03.20', () => {
                cy.get('@input')
                    .type('3')
                    .should('have.value', '03')
                    .should('have.prop', 'selectionStart', '03'.length)
                    .should('have.prop', 'selectionEnd', '03'.length)
                    .type('20')
                    .should('have.value', '03.20')
                    .should('have.prop', 'selectionStart', '03.20'.length)
                    .should('have.prop', 'selectionEnd', '03.20'.length);
            });

            it('"mm/yy" => 03.22', () => {
                cy.get('@input')
                    .type('0')
                    .should('have.value', '0')
                    .should('have.prop', 'selectionStart', '0'.length)
                    .should('have.prop', 'selectionEnd', '0'.length)
                    .type('322')
                    .should('have.value', '03.22')
                    .should('have.prop', 'selectionStart', '03.22'.length)
                    .should('have.prop', 'selectionEnd', '03.22'.length);
            });

            it('"mm/yy" => 12.04', () => {
                cy.get('@input')
                    .type('1.2.')
                    .should('have.value', '12.')
                    .type('04')
                    .should('have.value', '12.04');
            });
        });

        describe('mm/yyyy', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=mm/yyyy`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('"mm/yyyy" => 02.2025', () => {
                cy.get('@input')
                    .type('2')
                    .should('have.value', '02')
                    .should('have.prop', 'selectionStart', '02'.length)
                    .should('have.prop', 'selectionEnd', '02'.length)
                    .type('2025')
                    .should('have.value', '02.2025')
                    .should('have.prop', 'selectionStart', '02.2025'.length)
                    .should('have.prop', 'selectionEnd', '02.2025'.length);
            });

            it('"mm/yyyy" => 11.1999', () => {
                cy.get('@input')
                    .type('1')
                    .should('have.value', '1')
                    .should('have.prop', 'selectionStart', '1'.length)
                    .should('have.prop', 'selectionEnd', '1'.length)
                    .type('11999')
                    .should('have.value', '11.1999')
                    .should('have.prop', 'selectionStart', '11.1999'.length)
                    .should('have.prop', 'selectionEnd', '11.1999'.length);
            });

            it('"mm/yyyy" => 05.2004', () => {
                cy.get('@input')
                    .type('0.')
                    .should('have.value', '0')
                    .type('5')
                    .should('have.value', '05')
                    .type('.2004')
                    .should('have.value', '05.2004');
            });
        });

        describe('yyyy/mm', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=yyyy/mm`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('"yyyy/mm" => 2025.02', () => {
                cy.get('@input')
                    .type('2025')
                    .should('have.value', '2025')
                    .should('have.prop', 'selectionStart', '2025'.length)
                    .should('have.prop', 'selectionEnd', '2025'.length)
                    .type('2')
                    .should('have.value', '2025.02')
                    .should('have.prop', 'selectionStart', '2025.02'.length)
                    .should('have.prop', 'selectionEnd', '2025.02'.length);
            });

            it('"yyyy/mm" => 1999.11', () => {
                cy.get('@input')
                    .type('19991')
                    .should('have.value', '1999.1')
                    .should('have.prop', 'selectionStart', '1999.1'.length)
                    .should('have.prop', 'selectionEnd', '1999.1'.length)
                    .type('1')
                    .should('have.value', '1999.11')
                    .should('have.prop', 'selectionStart', '1999.11'.length)
                    .should('have.prop', 'selectionEnd', '1999.11'.length);
            });

            it('"yyyy/mm" => 2004.05', () => {
                cy.get('@input')
                    .type('20.0.4')
                    .should('have.value', '2004')
                    .type('.')
                    .should('have.value', '2004.')
                    .type('05')
                    .should('have.value', '2004.05');
            });
        });

        describe('yyyy', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=yyyy`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('"yyyy" => 2025', () => {
                cy.get('@input')
                    .type('2')
                    .should('have.value', '2')
                    .should('have.prop', 'selectionStart', '2'.length)
                    .should('have.prop', 'selectionEnd', '2'.length)
                    .type('025')
                    .should('have.value', '2025')
                    .should('have.prop', 'selectionStart', '2025'.length)
                    .should('have.prop', 'selectionEnd', '2025'.length);
            });
        });

        describe('dd/mm', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=dd%2Fmm`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('"dd/mm" => 14.07', () => {
                cy.get('@input')
                    .type('1407')
                    .should('have.value', '14.07')
                    .should('have.prop', 'selectionStart', '14.07'.length)
                    .should('have.prop', 'selectionEnd', '14.07'.length);
            });

            it('"dd/mm" => 01.01', () => {
                cy.get('@input')
                    .type('0101')
                    .should('have.value', '01.01')
                    .should('have.prop', 'selectionStart', '01.11'.length)
                    .should('have.prop', 'selectionEnd', '01.11'.length);
            });

            it('"dd/mm" => 05.11', () => {
                cy.get('@input')
                    .type('511')
                    .should('have.value', '05.11')
                    .should('have.prop', 'selectionStart', '05.11'.length)
                    .should('have.prop', 'selectionEnd', '05.11'.length);
            });

            it('"dd/mm" => 05.05', () => {
                cy.get('@input')
                    .type('55')
                    .should('have.value', '05.05')
                    .should('have.prop', 'selectionStart', '05.05'.length)
                    .should('have.prop', 'selectionEnd', '05.05'.length);
            });

            it('dd/mm" => 01.05', () => {
                cy.get('@input')
                    .type('3104')
                    .should('have.value', '01.05')
                    .should('have.prop', 'selectionStart', '01.05'.length)
                    .should('have.prop', 'selectionEnd', '01.05'.length);
            });
        });

        describe('mm/dd', () => {
            beforeEach(() => {
                cy.visit(`/${DemoPath.Date}/API?mode=mm%2Fdd`);
                cy.get('#demo-content input')
                    .should('be.visible')
                    .first()
                    .focus()
                    .as('input');
            });

            it('"mm/dd" => 02.29', () => {
                cy.get('@input')
                    .type('0229')
                    .should('have.value', '02.29')
                    .should('have.prop', 'selectionStart', '02.29'.length)
                    .should('have.prop', 'selectionEnd', '02.29'.length);
            });

            it('"mm/dd" => 01.01', () => {
                cy.get('@input')
                    .type('0101')
                    .should('have.value', '01.01')
                    .should('have.prop', 'selectionStart', '01.01'.length)
                    .should('have.prop', 'selectionEnd', '01.01'.length);
            });

            it('"mm/dd" => 09.12', () => {
                cy.get('@input')
                    .type('912')
                    .should('have.value', '09.12')
                    .should('have.prop', 'selectionStart', '09.12'.length)
                    .should('have.prop', 'selectionEnd', '09.12'.length);
            });

            it('"mm/dd" => 09.09', () => {
                cy.get('@input')
                    .type('99')
                    .should('have.value', '09.09')
                    .should('have.prop', 'selectionStart', '09.09'.length)
                    .should('have.prop', 'selectionEnd', '09.09'.length);
            });

            it('dd/mm" => 05.01', () => {
                cy.get('@input')
                    .type('431')
                    .should('have.value', '05.01')
                    .should('have.prop', 'selectionStart', '05.01'.length)
                    .should('have.prop', 'selectionEnd', '05.01'.length);
            });
        });
    });
});
