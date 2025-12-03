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
            it('Type "213" => "(213)"', () => {
                cy.get('@input').type('213').should('have.value', '(213)');
            });

            it('Type "2133734" => "(213) 373-4"', () => {
                cy.get('@input').type('2133734').should('have.value', '(213) 373-4');
            });

            it('Type "2133734253" => "(213) 373-4253"', () => {
                cy.get('@input')
                    .type('2133734253')
                    .should('have.value', '(213) 373-4253')
                    .should('have.prop', 'selectionStart', 14)
                    .should('have.prop', 'selectionEnd', 14);
            });

            it('Type "21337342531234" => "(213) 373-4253" (truncated)', () => {
                cy.get('@input')
                    .type('21337342531234')
                    .should('have.value', '(213) 373-4253')
                    .should('have.prop', 'selectionStart', 14)
                    .should('have.prop', 'selectionEnd', 14);
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
                // Starting from "(213) 373-4253" (10 digits), each backspace removes one digit
                [1, '(213) 373-425'], // 9 digits
                [4, '(213) 373'], // 6 digits (10 - 4 = 6)
                [10, ''], // 0 digits
            ] as const;

            tests.forEach(([n, maskedValue]) => {
                it(`Backspace x${n} => "${maskedValue}"`, () => {
                    cy.get('@input')
                        .type('{backspace}'.repeat(n))
                        .should('have.value', maskedValue);
                });
            });
        });

        describe('delete from middle preserves cursor position', () => {
            beforeEach(() => {
                cy.get('@input').type('2133734253');
            });

            it('Delete after "4" in "(213) 373-4253" removes "2" and keeps cursor position', () => {
                // Position cursor after "4" (position 11 in "(213) 373-4253")
                cy.get('@input')
                    .type(`{moveToStart}${'{rightArrow}'.repeat(11)}`)
                    .should('have.prop', 'selectionStart', 11)
                    .type('{del}')
                    .should('have.value', '(213) 373-453')
                    .should('have.prop', 'selectionStart', 11)
                    .should('have.prop', 'selectionEnd', 11);
            });

            it('Delete after "2" in "(213) 373-4253" removes "5" and keeps cursor position', () => {
                // Position cursor after "2" (position 12 in "(213) 373-4253")
                cy.get('@input')
                    .type(`{moveToStart}${'{rightArrow}'.repeat(12)}`)
                    .should('have.prop', 'selectionStart', 12)
                    .type('{del}')
                    .should('have.value', '(213) 373-423')
                    .should('have.prop', 'selectionStart', 12)
                    .should('have.prop', 'selectionEnd', 12);
            });

            it('Delete after "5" in "(213) 373-4253" removes "3" and keeps cursor position', () => {
                // Position cursor after "5" (position 13 in "(213) 373-4253")
                cy.get('@input')
                    .type(`{moveToStart}${'{rightArrow}'.repeat(13)}`)
                    .should('have.prop', 'selectionStart', 13)
                    .type('{del}')
                    .should('have.value', '(213) 373-425')
                    .should('have.prop', 'selectionStart', 13)
                    .should('have.prop', 'selectionEnd', 13);
            });

            it('Delete after "1" in "(800) 123-4567" removes "2" and keeps cursor at position 7', () => {
                cy.get('@input')
                    .clear()
                    .type('8001234567')
                    .should('have.value', '(800) 123-4567')
                    // Position cursor after "1" (position 7 in "(800) 123-4567")
                    .type(`{moveToStart}${'{rightArrow}'.repeat(7)}`)
                    .should('have.prop', 'selectionStart', 7)
                    .type('{del}')
                    .should('have.value', '(800) 134-567')
                    .should('have.prop', 'selectionStart', 7)
                    .should('have.prop', 'selectionEnd', 7);
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

        it('Paste +4930123456 (strips country code)', () => {
            cy.get('@input').paste('+4930123456').should('have.value', '030 123456');
        });
    });
});
