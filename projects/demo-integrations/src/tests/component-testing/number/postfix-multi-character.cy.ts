import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Number | postfix consists of many characters', () => {
    describe('postfix = ` lbs. per day`', () => {
        const maskitoOptions = maskitoNumberOptionsGenerator({
            postfix: ' lbs. per day',
            thousandSeparator: ' ',
            decimalSeparator: '.',
            maximumFractionDigits: 2,
        });

        it('Paste 100<space>', () => {
            cy.mount(TestInput, {componentProperties: {maskitoOptions}});
            cy.get('input').paste('100 ').should('have.value', '100 lbs. per day');
        });

        it('Paste 100.<space>', () => {
            cy.mount(TestInput, {componentProperties: {maskitoOptions}});
            cy.get('input').paste('100.').should('have.value', '100. lbs. per day');
        });

        it('Paste 100.42<space>', () => {
            cy.mount(TestInput, {componentProperties: {maskitoOptions}});
            cy.get('input').paste('100.42').should('have.value', '100.42 lbs. per day');
        });

        it('Paste 100 lbs', () => {
            cy.mount(TestInput, {componentProperties: {maskitoOptions}});
            cy.get('input').paste('100 lbs').should('have.value', '100 lbs. per day');
        });

        it('Paste 100 lbs.', () => {
            cy.mount(TestInput, {componentProperties: {maskitoOptions}});
            cy.get('input').paste('100 lbs.').should('have.value', '100 lbs. per day');
        });

        it('Paste 100. lbs.', () => {
            cy.mount(TestInput, {componentProperties: {maskitoOptions}});
            cy.get('input').paste('100. lbs.').should('have.value', '100. lbs. per day');
        });
    });
});
