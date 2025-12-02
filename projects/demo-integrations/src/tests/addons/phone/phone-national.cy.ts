import {DemoPath} from '@demo/constants';

describe('Phone [format]=NATIONAL', () => {
    describe('[countryIsoCode]=US', () => {
        beforeEach(() => {
            cy.visit(
                `/${DemoPath.PhonePackage}/API?countryIsoCode=US&strict=true&format=NATIONAL`,
            );
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        describe('basic typing (1 character per keydown)', () => {
            const tests = [
                // [Typed value, Masked value, caretIndex]
                ['213', '213', '213'.length],
                ['2133734', '2133734', '2133734'.length],
                ['2133734253', '(213) 373-4253', '(213) 373-4253'.length],
                ['21337342531234', '(213) 373-4253', '(213) 373-4253'.length],
            ] as const;

            tests.forEach(([typedValue, maskedValue, caretIndex]) => {
                it(`Type "${typedValue}" => "${maskedValue}"`, () => {
                    cy.get('@input')
                        .type(typedValue)
                        .should('have.value', maskedValue)
                        .should('have.prop', 'selectionStart', caretIndex)
                        .should('have.prop', 'selectionEnd', caretIndex);
                });
            });
        });

        describe('paste operations', () => {
            it('Paste 2133734253', () => {
                cy.get('@input')
                    .paste('2133734253')
                    .should('have.value', '(213) 373-4253')
                    .should('have.prop', 'selectionStart', '(213) 373-4253'.length)
                    .should('have.prop', 'selectionEnd', '(213) 373-4253'.length);
            });

            it('Paste +12133734253 (strips country code)', () => {
                cy.get('@input')
                    .paste('+12133734253')
                    .should('have.value', '(213) 373-4253')
                    .should('have.prop', 'selectionStart', '(213) 373-4253'.length)
                    .should('have.prop', 'selectionEnd', '(213) 373-4253'.length);
            });

            it('Paste (213) 373-4253 (already formatted)', () => {
                cy.get('@input')
                    .paste('(213) 373-4253')
                    .should('have.value', '(213) 373-4253')
                    .should('have.prop', 'selectionStart', '(213) 373-4253'.length)
                    .should('have.prop', 'selectionEnd', '(213) 373-4253'.length);
            });

            it('Paste 213-373-4253 (different format)', () => {
                cy.get('@input')
                    .paste('213-373-4253')
                    .should('have.value', '(213) 373-4253')
                    .should('have.prop', 'selectionStart', '(213) 373-4253'.length)
                    .should('have.prop', 'selectionEnd', '(213) 373-4253'.length);
            });
        });

        describe('basic erasing (value = "(213) 373-4253")', () => {
            beforeEach(() => {
                cy.get('@input').type('2133734253');
            });

            const tests = [
                // [How many times "Backspace"-key was pressed, Masked value]
                [1, '(213) 373-425'],
                [4, '(213) 373-4'],
                [10, ''],
            ] as const;

            tests.forEach(([n, maskedValue]) => {
                it(`Backspace x${n} => "${maskedValue}"`, () => {
                    cy.get('@input')
                        .type('{backspace}'.repeat(n))
                        .should('have.value', maskedValue);
                });
            });
        });

        describe('no country prefix behavior', () => {
            it('can delete entire value via selectAll + Backspace', () => {
                cy.get('@input')
                    .type('2133734253')
                    .type('{selectall}{backspace}')
                    .should('have.value', '');
            });

            it('can delete entire value via selectAll + Delete', () => {
                cy.get('@input')
                    .type('2133734253')
                    .type('{selectall}{del}')
                    .should('have.value', '');
            });

            it('stays empty on blur if input is empty', () => {
                cy.get('@input')
                    .focus()
                    .should('have.value', '')
                    .blur()
                    .should('have.value', '');
            });
        });
    });

    describe('[countryIsoCode]=RU', () => {
        beforeEach(() => {
            cy.visit(
                `/${DemoPath.PhonePackage}/API?countryIsoCode=RU&strict=true&format=NATIONAL`,
            );
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('Type full number', () => {
            cy.get('@input').type('9202800155').should('have.value', '8 (920) 280-01-55');
        });

        it('Paste +79202800155 (strips +7 country code)', () => {
            cy.get('@input')
                .paste('+79202800155')
                .should('have.value', '8 (920) 280-01-55');
        });

        it('Paste 89202800155 (with trunk prefix)', () => {
            cy.get('@input')
                .paste('89202800155')
                .should('have.value', '8 (920) 280-01-55');
        });
    });

    describe('[countryIsoCode]=DE', () => {
        beforeEach(() => {
            cy.visit(
                `/${DemoPath.PhonePackage}/API?countryIsoCode=DE&strict=true&format=NATIONAL`,
            );
            cy.get('#demo-content input')
                .should('be.visible')
                .first()
                .focus()
                .as('input');
        });

        it('Type Berlin number', () => {
            cy.get('@input').type('30123456').should('have.value', '030 123456');
        });

        it('Paste +4930123456 (strips country code)', () => {
            cy.get('@input').paste('+4930123456').should('have.value', '030 123456');
        });
    });
});
