import {DemoPath} from '@demo/constants';

describe('DateTime | dateTimeSeparator', () => {
    const dateTimeSeparators = [':', ';_', '_-_', '_at_'];

    dateTimeSeparators.forEach(dateTimeSeparator => {
        const dates: Array<{
            type: string;
            result: string;
            date: string;
            timeMode: string;
        }> = [
            {
                type: '522004341',
                result: `05.02.2004${dateTimeSeparator}03:41`,
                date: '05.02.2004',
                timeMode: 'HH:MM',
            },
            {
                type: '52200434111',
                result: `05.02.2004${dateTimeSeparator}03:41:11`,
                date: '05.02.2004',
                timeMode: 'HH:MM:SS',
            },
            {
                type: '52200434111111',
                result: `05.02.2004${dateTimeSeparator}03:41:11:111`,
                date: '05.02.2004',
                timeMode: 'HH:MM:SS:MSS',
            },
        ];

        describe(`correctly applies "${dateTimeSeparator}" as dateTimeSeparator`, () => {
            dates.forEach(date => {
                beforeEach(() => {
                    cy.visit(
                        `/${DemoPath.DateTime}/API?dateTimeSeparator=${encodeURI(dateTimeSeparator)}&timeMode=${date.timeMode}`,
                    );
                    cy.get('#demo-content input')
                        .should('be.visible')
                        .first()
                        .focus()
                        .as('input');
                });

                it(`${date.type} => ${date.result} => {backspace} * ${date.timeMode.replaceAll(':', '').length} => ${date.date}`, () => {
                    cy.get('@input')
                        .type(date.type)
                        .should('have.value', date.result)
                        .type(
                            `${'{backspace}'.repeat(date.timeMode.replaceAll(':', '').length)}`,
                        );

                    cy.get('@input').should('have.value', '05.02.2004');
                });
            });
        });
    });
});
