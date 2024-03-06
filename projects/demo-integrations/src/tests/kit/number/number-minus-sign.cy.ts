import {
    CHAR_EM_DASH,
    CHAR_EN_DASH,
    CHAR_HYPHEN,
    CHAR_JP_HYPHEN,
    CHAR_MINUS,
} from 'projects/kit/src/lib/constants';

import {openNumberPage} from './utils';

describe('Properly using custom minus sign', () => {
    const minuses: Array<{value: string; name: string; asQueryParam: string}> = [
        {value: CHAR_HYPHEN, name: 'hyphen', asQueryParam: '-'},
        {value: 'i', name: 'i', asQueryParam: 'i'},
    ];

    const numbers = ['321', '2_432'];

    const pseudoMinuses: Array<{value: string; name: string}> = [
        {value: CHAR_HYPHEN, name: 'hyphen'},
        {value: CHAR_EN_DASH, name: 'en-dash'},
        {value: CHAR_EM_DASH, name: 'em-dash'},
        {value: CHAR_JP_HYPHEN, name: 'japanese prolonged sound mark'},
        {value: CHAR_MINUS, name: 'unicode minus sign'},
    ];

    minuses.forEach(minus => {
        if (minus.value === 'i') {
            pseudoMinuses.push(minus);
        }

        pseudoMinuses.forEach(pseudoMinus => {
            numbers.forEach(number => {
                it(`transforms ${pseudoMinus.name} into ${minus.name}`, () => {
                    openNumberPage(
                        `precision=Infinity&thousandSeparator=_&minusSign=${minus.asQueryParam}`,
                    );
                    cy.get('@input')
                        .type(`${pseudoMinus.value}${number}`)
                        .should('have.value', `${minus.value}${number}`);
                });
            });
        });
    });
});
