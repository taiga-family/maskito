import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
} from 'projects/kit/src/lib/constants';

import {openNumberPage} from './utils';

describe('Number | minus sign', () => {
    const pseudoMinuses: Array<{value: string; name: string}> = [
        {value: CHAR_HYPHEN, name: 'hyphen'},
        {value: CHAR_EN_DASH, name: 'en-dash'},
        {value: CHAR_EM_DASH, name: 'em-dash'},
        {value: CHAR_JP_HYPHEN, name: 'japanese prolonged sound mark'},
        {value: CHAR_MINUS, name: 'unicode minus sign'},
    ];

    describe('can use hyphen, all kind of dashes and minus interchangeably', () => {
        const minuses: Array<{value: string; name: string}> = [
            {
                value: CHAR_HYPHEN,
                name: 'hyphen',
            },
            {
                value: CHAR_EN_DASH,
                name: 'en-dash',
            },
            {
                value: CHAR_EM_DASH,
                name: 'em-dash',
            },
        ];

        const numbers = ['321', '2_432'];

        minuses.forEach((minus) => {
            pseudoMinuses.forEach((pseudoMinus) => {
                numbers.forEach((number) => {
                    it(`transforms ${pseudoMinus.name} into ${minus.name}`, () => {
                        openNumberPage(
                            `maximumFractionDigits=Infinity&thousandSeparator=_&minusSign=${encodeURIComponent(minus.value)}`,
                        );
                        cy.get('@input')
                            .type(`${pseudoMinus.value}${number}`)
                            .should('have.value', `${minus.value}${number}`);
                    });
                });
            });
        });
    });

    describe('can use letters as minus sign', () => {
        beforeEach(() => {
            openNumberPage(
                'maximumFractionDigits=Infinity&thousandSeparator=_&minusSign=i',
            );
        });

        it('transforms i into i', () => {
            cy.get('@input').type('i1234').should('have.value', 'i1_234');
        });

        pseudoMinuses.forEach((pseudoMinus) => {
            it(`transforms ${pseudoMinus.name} into i`, () => {
                cy.get('@input')
                    .type(`${pseudoMinus.value}1234`)
                    .should('have.value', 'i1_234');
            });
        });
    });
});

describe('custom minus should work properly with min(max) value', () => {
    [
        {value: CHAR_HYPHEN, name: 'hyphen'},
        {value: CHAR_EN_DASH, name: 'en-dash'},
        {value: CHAR_EM_DASH, name: 'em-dash'},
        {
            value: CHAR_JP_HYPHEN,
            name: 'japanese prolonged sound mark',
        },
        {value: CHAR_MINUS, name: 'unicode minus sign'},
        {value: 'x', name: 'x'},
    ].forEach((minus) => {
        describe(`applies ${minus.name} properly`, () => {
            beforeEach(() => {
                openNumberPage(
                    `min=-123&thousandSeparator=_&minusSign=${encodeURIComponent(minus.value)}`,
                );
            });

            it(`-94 => ${minus.value}94`, () => {
                cy.get('@input')
                    .type(`${minus.value}94`)
                    .should('have.value', `${minus.value}94`);
            });

            it(`-432 => ${minus.value}123`, () => {
                cy.get('@input')
                    .type(`${minus.value}432`)
                    .should('have.value', `${minus.value}123`);
            });
        });
    });
});
