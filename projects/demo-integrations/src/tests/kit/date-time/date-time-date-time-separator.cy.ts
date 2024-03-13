import {DemoPath} from '@demo/constants';
import {BROWSER_SUPPORTS_REAL_EVENTS} from 'projects/demo-integrations/src/support/constants';

describe('DateTime | dateTimeSeparator', () => {
    const dateTimeSeparators = [':', ';_', '_-_', '_at_'];

    dateTimeSeparators.forEach(dateTimeSeparator => {
        const dates: Array<{
            type: string;
            result: string;
            date: string;
            times: number;
            timeMode: string;
        }> = [
            {
                type: '522004341',
                result: `05.02.2004${dateTimeSeparator}03:41`,
                date: '05.02.2004',
                times: 4,
                timeMode: 'HH:MM',
            },
            {
                type: '52200434111',
                result: `05.02.2004${dateTimeSeparator}03:41:11`,
                date: '05.02.2004',
                times: 6,
                timeMode: 'HH:MM:SS',
            },
            {
                type: '52200434111111',
                result: `05.02.2004${dateTimeSeparator}03:41:11:111`,
                date: '05.02.2004',
                times: 9,
                timeMode: 'HH:MM:SS:MSS',
            },
        ] as const;

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

                it(
                    `${date.type} => ${date.result} => {backspace} * ${date.times} => ${date.date}`,
                    BROWSER_SUPPORTS_REAL_EVENTS,
                    () => {
                        cy.get('@input')
                            .type(date.type)
                            .should('have.value', date.result)
                            .realPress(getBackspaces(date.times));

                        cy.get('@input')

                            .should('have.value', '05.02.2004');
                    },
                );
            });
        });
    });
});

function getBackspaces(times: number): any[] {
    const result = [];

    for (let i = 0; i < times; i += 1) {
        result.push('{backspace}');
    }

    return result;
}
