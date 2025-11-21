import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Number | min/max limits are bigint', () => {
    beforeEach(() => {
        cy.mount(TestInput, {
            componentProperties: {
                initialValue: '',
                maskitoOptions: maskitoNumberOptionsGenerator({
                    min: BigInt(Number.MIN_SAFE_INTEGER) - 777n,
                    max: BigInt(Number.MAX_SAFE_INTEGER) + 300n,
                    thousandSeparator: '',
                    maximumFractionDigits: Infinity,
                    minusSign: '-',
                }),
            },
        });
        cy.get('input').focus().should('have.value', '').as('input');
    });

    describe('max', () => {
        it('Allows to enter > MAX_SAFE_INTEGER but less than max constraint', () => {
            cy.get('input')
                .type(String(BigInt(Number.MAX_SAFE_INTEGER) + 200n))
                .should('have.value', String(BigInt(Number.MAX_SAFE_INTEGER) + 200n));
        });

        it('Allows to enter > MAX_SAFE_INTEGER but less than max constraint (even if decimal part contains many digits)', () => {
            const value = String(
                `${BigInt(Number.MAX_SAFE_INTEGER) + 100n}.12345678901234567890`,
            );

            cy.get('input').type(value).should('have.value', value);
        });

        it('forbids to enter value more than max', () => {
            cy.get('input')
                .type(String(BigInt(Number.MAX_SAFE_INTEGER) + 500n))
                .should('have.value', String(BigInt(Number.MAX_SAFE_INTEGER) + 300n));
        });
    });

    describe('min', () => {
        it('Allows to enter < MIN_SAFE_INTEGER but more than min constraint', () => {
            cy.get('input')
                .type(String(BigInt(Number.MIN_SAFE_INTEGER) - 500n))
                .should('have.value', String(BigInt(Number.MIN_SAFE_INTEGER) - 500n));
        });

        it('Allows to enter < MIN_SAFE_INTEGER but more than min constraint (even if decimal part contains many digits)', () => {
            const value = String(
                `${BigInt(Number.MIN_SAFE_INTEGER) - 500n}.12345678901234567890`,
            );

            cy.get('input').type(value).should('have.value', value);
        });

        it('forbids to enter value less than min', () => {
            cy.get('input')
                .type(String(BigInt(Number.MIN_SAFE_INTEGER) - 999n))
                .should('have.value', String(BigInt(Number.MIN_SAFE_INTEGER) - 777n));
        });
    });
});
