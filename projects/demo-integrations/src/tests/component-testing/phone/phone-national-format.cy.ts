import type {MaskitoOptions} from '@maskito/core';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import type {CountryCode} from 'libphonenumber-js';
import metadata from 'libphonenumber-js/min/metadata';

import {TestInput} from '../utils';

interface CountryTestConfig {
    countryIsoCode: CountryCode;
    fullNumber: {input: string; expected: string};
    partialCases: Array<{name: string; input: string; expected: string}>;
    backspaceCases: Array<{
        name: string;
        leftArrows: number;
        expectedValue: string;
        expectedCursor: number;
    }>;
}

const countryConfigs: CountryTestConfig[] = [
    {
        countryIsoCode: 'US',
        fullNumber: {input: '2123433355', expected: '(212) 343-3355'},
        partialCases: [
            {name: 'area code', input: '212', expected: '(212)'},
            {name: 'after area code', input: '2123', expected: '(212) 3'},
            {name: 'middle of number', input: '212343', expected: '(212) 343'},
        ],
        backspaceCases: [
            {
                name: 'end',
                leftArrows: 0,
                expectedValue: '(212) 343-335',
                expectedCursor: 13,
            },
            {
                name: 'before last group',
                leftArrows: 5,
                expectedValue: '(212) 343-355',
                expectedCursor: 8,
            },
            {
                name: 'after area code',
                leftArrows: 7,
                expectedValue: '(212) 433-355',
                expectedCursor: 6,
            },
        ],
    },
    {
        countryIsoCode: 'RU',
        fullNumber: {input: '9202800155', expected: '920 280-01-55'},
        partialCases: [
            {name: 'first group', input: '920', expected: '920'},
            {name: 'after first group', input: '9202', expected: '920 2'},
            {name: 'middle of number', input: '920280', expected: '920 280'},
        ],
        backspaceCases: [
            {
                name: 'end',
                leftArrows: 0,
                expectedValue: '920 280-01-5',
                expectedCursor: 12,
            },
            {
                name: 'before last group',
                leftArrows: 3,
                expectedValue: '920 280-05-5',
                expectedCursor: 9,
            },
            {
                name: 'after first group',
                leftArrows: 8,
                expectedValue: '920 800-15-5',
                expectedCursor: 4,
            },
        ],
    },
    {
        countryIsoCode: 'ES',
        fullNumber: {input: '612345678', expected: '612 34-56-78'},
        partialCases: [
            {name: 'first group', input: '612', expected: '612'},
            {name: 'after first group', input: '6123', expected: '612 3'},
            {name: 'middle of number', input: '612345', expected: '612 34-5'},
        ],
        backspaceCases: [
            {
                name: 'end',
                leftArrows: 0,
                expectedValue: '612 34-56-7',
                expectedCursor: 11,
            },
            {
                name: 'before last group',
                leftArrows: 3,
                expectedValue: '612 34-57-8',
                expectedCursor: 8,
            },
            {
                name: 'after first group',
                leftArrows: 7,
                expectedValue: '612 45-67-8',
                expectedCursor: 4,
            },
        ],
    },
    {
        countryIsoCode: 'FR',
        fullNumber: {input: '0612345678', expected: '06 12-34-56-78'},
        partialCases: [
            {name: 'first group', input: '06', expected: '06'},
            {name: 'after first group', input: '0612', expected: '06 12'},
            {name: 'middle of number', input: '061234', expected: '06 12-34'},
        ],
        backspaceCases: [
            {
                name: 'end',
                leftArrows: 0,
                expectedValue: '06 12-34-56-7',
                expectedCursor: 13,
            },
            {
                name: 'before last group',
                leftArrows: 3,
                expectedValue: '06 12-34-57-8',
                expectedCursor: 10,
            },
            {
                name: 'after second group',
                leftArrows: 7,
                expectedValue: '06 12-45-67-8',
                expectedCursor: 6,
            },
        ],
    },
];

describe('Phone | National format', () => {
    countryConfigs.forEach(
        ({countryIsoCode, fullNumber, partialCases, backspaceCases}) => {
            describe(countryIsoCode, () => {
                function createMaskitoOptions(): MaskitoOptions {
                    return maskitoPhoneOptionsGenerator({
                        countryIsoCode,
                        metadata,
                        format: 'NATIONAL',
                    });
                }

                describe('Typing digits', () => {
                    beforeEach(() => {
                        cy.mount(TestInput, {
                            componentProperties: {
                                maskitoOptions: createMaskitoOptions(),
                                initialValue: '',
                            },
                        });
                    });

                    it(`formats full number as ${fullNumber.expected}`, () => {
                        cy.get('input')
                            .focus()
                            .type(fullNumber.input)
                            .should('have.value', fullNumber.expected);
                    });

                    partialCases.forEach(({name, input, expected}) => {
                        it(`formats partial input - ${name}`, () => {
                            cy.get('input')
                                .focus()
                                .type(input)
                                .should('have.value', expected);
                        });
                    });
                });

                describe('Backspace behavior', () => {
                    beforeEach(() => {
                        cy.mount(TestInput, {
                            componentProperties: {
                                maskitoOptions: createMaskitoOptions(),
                                initialValue: fullNumber.expected,
                            },
                        });
                    });

                    backspaceCases.forEach(
                        ({name, leftArrows, expectedValue, expectedCursor}) => {
                            it(`backspace at ${name}`, () => {
                                cy.get('input')
                                    .should('have.value', fullNumber.expected)
                                    .focus()
                                    .type('{moveToEnd}')
                                    .type(
                                        '{leftArrow}'.repeat(leftArrows) || '{moveToEnd}',
                                    )
                                    .type('{backspace}')
                                    .should('have.value', expectedValue)
                                    .should('have.prop', 'selectionStart', expectedCursor)
                                    .should('have.prop', 'selectionEnd', expectedCursor);
                            });
                        },
                    );
                });
            });
        },
    );

    describe('Custom separator', () => {
        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions: maskitoPhoneOptionsGenerator({
                        countryIsoCode: 'US',
                        metadata,
                        format: 'NATIONAL',
                        separator: ' ',
                    }),
                    initialValue: '',
                },
            });
        });

        it('uses space as separator', () => {
            cy.get('input')
                .focus()
                .type('2123433355')
                .should('have.value', '(212) 343 3355');
        });
    });
});
