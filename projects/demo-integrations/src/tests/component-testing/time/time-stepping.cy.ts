import {maskitoTime, type MaskitoTimeParams} from '@maskito/kit';

import {TestInput} from '../utils';

function mount(params: MaskitoTimeParams): void {
    cy.mount(TestInput, {componentProperties: {maskitoOptions: maskitoTime(params)}});
}

describe('Time | hour stepping toggles custom dayPeriod marker', () => {
    describe("['上午', '下午'] Chinese", () => {
        beforeEach(() => {
            mount({mode: 'HH:MM', dayPeriod: ['上午', '下午'], step: 1});
        });

        it('11:00 上午 + ArrowUp on hour --- 12:00 下午', () => {
            cy.get('input')
                .type('1100上')
                .should('have.value', '11:00 上午')
                .type('{moveToStart}{rightArrow}')
                .type('{upArrow}')
                .should('have.value', '12:00 下午');
        });

        it('12:00 下午 + ArrowDown on hour --- 11:00 上午', () => {
            cy.get('input')
                .type('1200下')
                .should('have.value', '12:00 下午')
                .type('{moveToStart}{rightArrow}')
                .type('{downArrow}')
                .should('have.value', '11:00 上午');
        });

        it('12:00 上午 + ArrowUp on hour --- 01:00 上午', () => {
            cy.get('input')
                .type('1200上')
                .should('have.value', '12:00 上午')
                .type('{moveToStart}{rightArrow}')
                .type('{upArrow}')
                .should('have.value', '01:00 上午');
        });

        it('12:00 下午 + ArrowUp on hour --- 01:00 下午', () => {
            cy.get('input')
                .type('1200下')
                .should('have.value', '12:00 下午')
                .type('{moveToStart}{rightArrow}')
                .type('{upArrow}')
                .should('have.value', '01:00 下午');
        });

        it('01:00 上午 + ArrowDown on hour --- 12:00 上午', () => {
            cy.get('input')
                .type('0100上')
                .should('have.value', '01:00 上午')
                .type('{moveToStart}{rightArrow}')
                .type('{downArrow}')
                .should('have.value', '12:00 上午');
        });

        it('01:00 下午 + ArrowDown on hour --- 12:00 下午', () => {
            cy.get('input')
                .type('0100下')
                .should('have.value', '01:00 下午')
                .type('{moveToStart}{rightArrow}')
                .type('{downArrow}')
                .should('have.value', '12:00 下午');
        });
    });

    describe("['am', 'pm'] lowercase (hi-IN style)", () => {
        beforeEach(() => {
            mount({mode: 'HH:MM', dayPeriod: ['am', 'pm'], step: 1});
        });

        it('11:00 am + ArrowUp on hour --- 12:00 pm', () => {
            cy.get('input')
                .type('1100a')
                .should('have.value', '11:00 am')
                .type('{moveToStart}{rightArrow}')
                .type('{upArrow}')
                .should('have.value', '12:00 pm');
        });

        it('11:00 pm + ArrowUp on hour --- 12:00 am', () => {
            cy.get('input')
                .type('1100p')
                .should('have.value', '11:00 pm')
                .type('{moveToStart}{rightArrow}')
                .type('{upArrow}')
                .should('have.value', '12:00 am');
        });

        it('12:00 am + ArrowUp on hour --- 01:00 am', () => {
            cy.get('input')
                .type('1200a')
                .should('have.value', '12:00 am')
                .type('{moveToStart}{rightArrow}')
                .type('{upArrow}')
                .should('have.value', '01:00 am');
        });

        it('12:00 pm + ArrowUp on hour --- 01:00 pm', () => {
            cy.get('input')
                .type('1200p')
                .should('have.value', '12:00 pm')
                .type('{moveToStart}{rightArrow}')
                .type('{upArrow}')
                .should('have.value', '01:00 pm');
        });

        it('01:00 am + ArrowDown on hour --- 12:00 am', () => {
            cy.get('input')
                .type('0100a')
                .should('have.value', '01:00 am')
                .type('{moveToStart}{rightArrow}')
                .type('{downArrow}')
                .should('have.value', '12:00 am');
        });

        it('01:00 pm + ArrowDown on hour --- 12:00 pm', () => {
            cy.get('input')
                .type('0100p')
                .should('have.value', '01:00 pm')
                .type('{moveToStart}{rightArrow}')
                .type('{downArrow}')
                .should('have.value', '12:00 pm');
        });
    });
});
