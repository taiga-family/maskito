import {DemoPath} from '@demo/constants';
import type {MaskitoTimeMode} from '@maskito/kit';

describe('DateTime | dateTimeSeparator', () => {
    const dateTimeSeparators = [':', ';_', '_-_', '_at_'];

    dateTimeSeparators.forEach(dateTimeSeparator => {
        const testCases: Array<{
            typedDigits: string;
            formattedDate: string;
            formattedValue: string;
            timeMode: MaskitoTimeMode;
        }> = [
            {
                typedDigits: '522004341',
                formattedValue: `05.02.2004${dateTimeSeparator}03:41`,
                formattedDate: '05.02.2004',
                timeMode: 'HH:MM',
            },
            {
                typedDigits: '233123434111',
                formattedValue: `23.03.1234${dateTimeSeparator}03:41:11`,
                formattedDate: '23.03.1234',
                timeMode: 'HH:MM:SS',
            },
            {
                typedDigits: '69200734111111',
                formattedValue: `06.09.2007${dateTimeSeparator}03:41:11.111`,
                formattedDate: '06.09.2007',
                timeMode: 'HH:MM:SS.MSS',
            },
        ];

        describe(`correctly applies "${dateTimeSeparator}" as dateTimeSeparator`, () => {
            testCases.forEach(
                ({typedDigits, formattedDate, formattedValue, timeMode}) => {
                    const timeDigitsCount = timeMode.replaceAll(/[:.]/g, '').length;

                    beforeEach(() => {
                        cy.visit(
                            `/${DemoPath.DateTime}/API?dateTimeSeparator=${encodeURIComponent(dateTimeSeparator)}&timeMode=${encodeURIComponent(timeMode)}`,
                        );
                        cy.get('#demo-content input')
                            .should('be.visible')
                            .first()
                            .focus()
                            .as('input');
                    });

                    it(`${typedDigits} => ${formattedValue} => {backspace} * ${timeDigitsCount} => ${formattedDate}`, () => {
                        cy.get('@input')
                            .type(typedDigits)
                            .should('have.value', formattedValue)
                            .type('{backspace}'.repeat(timeDigitsCount))
                            .should('have.value', formattedDate);
                    });
                },
            );
        });
    });
});
