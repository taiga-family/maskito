import {CHAR_EN_DASH, CHAR_HYPHEN, CHAR_JP_HYPHEN} from 'projects/kit/src/lib/constants';

import {openNumberPage} from './utils';

describe('Properly using custom minus sign', () => {
    describe(`correctly applies ${CHAR_HYPHEN} as minus sign`, () => {
        beforeEach(() => {
            openNumberPage('minusSign=\u002D&thousandSeparator=_');
        });

        it(`-32412 => ${CHAR_HYPHEN}32_412`, () => {
            cy.get('@input').type('-32412').should('have.value', `${CHAR_HYPHEN}32_412`);
        });

        it(`${CHAR_HYPHEN}32412 => ${CHAR_HYPHEN}32_412`, () => {
            cy.get('@input').type('-32412').should('have.value', `${CHAR_HYPHEN}32_412`);
        });

        it(`${CHAR_JP_HYPHEN}32412 => ${CHAR_HYPHEN}32_412`, () => {
            cy.get('@input')
                .type(`${CHAR_JP_HYPHEN}32412`)
                .should('have.value', `${CHAR_HYPHEN}32_412`);
        });

        it(`${CHAR_EN_DASH}32412 => ${CHAR_HYPHEN}32_412`, () => {
            cy.get('@input')
                .type(`${CHAR_EN_DASH}32412`)
                .should('have.value', `${CHAR_HYPHEN}32_412`);
        });
    });

    describe('correctly works with decimal, and minus sign is i', () => {
        beforeEach(() => {
            openNumberPage('minusSign=i&precision=Infinity&thousandSeparator=_');
        });

        it('-324,12 => i_324.12', () => {
            cy.get('@input').type('-324,12').should('have.value', 'i_324.12');
        });

        it(`${CHAR_HYPHEN}324,12 => i_324.12`, () => {
            cy.get('@input')
                .type(`${CHAR_HYPHEN}324,12`)
                .should('have.value', 'i_324.12');
        });

        it(`${CHAR_JP_HYPHEN}324,12 => i_324.12`, () => {
            cy.get('@input')
                .type(`${CHAR_JP_HYPHEN}324,12`)
                .should('have.value', 'i_324.12');
        });

        it(`${CHAR_EN_DASH}324,12 => i_324.12`, () => {
            cy.get('@input')
                .type(`${CHAR_EN_DASH}324,12`)
                .should('have.value', 'i_324.12');
        });
    });
});
