import {CHAR_MINUS} from 'projects/kit/src/lib/constants';

import {openNumberPage} from './utils';

describe('Number | BigInt', () => {
    describe('huge integers', () => {
        beforeEach(() => {
            openNumberPage();
        });

        const expectedValue =
            '900 719 925 474 099 190 071 992 547 409 919 007 199 254 740 991';

        it('types String(Number.MAX_SAFE_INTEGER).repeat(3)', () => {
            cy.get('@input')
                .type(String(Number.MAX_SAFE_INTEGER).repeat(3))
                .should('have.value', expectedValue)
                .should('have.prop', 'selectionStart', expectedValue.length)
                .should('have.prop', 'selectionEnd', expectedValue.length);
        });

        it('types minus + String(Number.MAX_SAFE_INTEGER).repeat(3)', () => {
            cy.get('@input')
                .type(`-${String(Number.MAX_SAFE_INTEGER).repeat(3)}`)
                .should('have.value', CHAR_MINUS + expectedValue)
                .should('have.prop', 'selectionStart', 1 + expectedValue.length)
                .should('have.prop', 'selectionEnd', 1 + expectedValue.length);
        });
    });

    describe('huge decimals', () => {
        beforeEach(() => {
            openNumberPage('maximumFractionDigits=Infinity&thousandSeparator=_');
        });

        it('types String(Number.MAX_SAFE_INTEGER).repeat(2) + ".123456789"', () => {
            const expectedValue = '90_071_992_547_409_919_007_199_254_740_991.123456789';

            cy.get('@input')
                .type(`${String(Number.MAX_SAFE_INTEGER).repeat(2)},123456789`)
                .should('have.value', expectedValue)
                .should('have.prop', 'selectionStart', expectedValue.length)
                .should('have.prop', 'selectionEnd', expectedValue.length);
        });

        it('types minus + String(Number.MAX_SAFE_INTEGER).repeat(2) + ".123456789"', () => {
            const expectedValue = `${CHAR_MINUS}90_071_992_547_409_919_007_199_254_740_991.123456789`;

            cy.get('@input')
                .type(`-${String(Number.MAX_SAFE_INTEGER).repeat(2)}.123456789`)
                .should('have.value', expectedValue)
                .should('have.prop', 'selectionStart', expectedValue.length)
                .should('have.prop', 'selectionEnd', expectedValue.length);
        });

        it('types pseudo decimal separator + decimal part String(Number.MAX_SAFE_INTEGER).repeat(3)', () => {
            const expectedValue = '0.900719925474099190071992547409919007199254740991';

            cy.get('@input')
                .type(`,${String(Number.MAX_SAFE_INTEGER).repeat(3)}`)
                .should('have.value', expectedValue)
                .should('have.prop', 'selectionStart', expectedValue.length)
                .should('have.prop', 'selectionEnd', expectedValue.length);
        });
    });

    describe('affixes', () => {
        it('types String(Number.MAX_SAFE_INTEGER).repeat(3) with prefix=$', () => {
            openNumberPage('prefix=$&thousandSeparator=.');

            const expectedValue =
                '$900.719.925.474.099.190.071.992.547.409.919.007.199.254.740.991';

            cy.get('@input')
                .type(String(Number.MAX_SAFE_INTEGER).repeat(3))
                .should('have.value', expectedValue)
                .should('have.prop', 'selectionStart', expectedValue.length)
                .should('have.prop', 'selectionEnd', expectedValue.length);
        });

        it('types String(Number.MAX_SAFE_INTEGER).repeat(3) with postfix=%', () => {
            openNumberPage(`postfix=${encodeURIComponent('%')}&thousandSeparator=,`);

            const expectedValue = `${CHAR_MINUS}900,719,925,474,099,190,071,992,547,409,919,007,199,254,740,991%`;

            cy.get('@input')
                .type(CHAR_MINUS + String(Number.MAX_SAFE_INTEGER).repeat(3))
                .should('have.value', expectedValue)
                .should('have.prop', 'selectionStart', expectedValue.length - 1)
                .should('have.prop', 'selectionEnd', expectedValue.length - 1);
        });

        it('types hyphen + String(Number.MAX_SAFE_INTEGER).repeat(3) when prefix="$" & negativePattern="minusFirst"', () => {
            openNumberPage('prefix=$&negativePattern=minusFirst&&thousandSeparator=_');

            const expectedValue = `${CHAR_MINUS}$900_719_925_474_099_190_071_992_547_409_919_007_199_254_740_991`;

            cy.get('@input')
                .type(`-${String(Number.MAX_SAFE_INTEGER).repeat(3)}`)
                .should('have.value', expectedValue)
                .should('have.prop', 'selectionStart', expectedValue.length)
                .should('have.prop', 'selectionEnd', expectedValue.length);
        });
    });
});
