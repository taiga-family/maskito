import type {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Number | overwrite selection range', () => {
    const numberOptions = maskitoNumberOptionsGenerator({maximumFractionDigits: 3});

    it('overwrite of selection range inside preprocessor works ', () => {
        const maskitoOptions: MaskitoOptions = {
            ...numberOptions,
            preprocessors: [
                ({elementState, data}, inputType) => {
                    const {value, selection} = elementState;
                    const [start, end] = selection;

                    return {
                        data,
                        elementState: {
                            value,
                            selection:
                                inputType === 'insert' &&
                                !start &&
                                !end &&
                                value.startsWith('0')
                                    ? [0, 1]
                                    : selection,
                        },
                    };
                },
                ...numberOptions.preprocessors,
            ],
        };

        cy.mount(TestInput, {
            componentProperties: {maskitoOptions, initialValue: '0.234'},
        });
        cy.get('input')
            .focus()
            .type('{moveToStart}')
            .type('1')
            .should('have.value', '1.234')
            .should('have.prop', 'selectionStart', 1)
            .should('have.prop', 'selectionEnd', 1);
    });

    it('overwrite of selection range inside postprocessor works ', () => {
        const maskitoOptions: MaskitoOptions = {
            mask: /^\d*\.?\d*$/,
            overwriteMode: 'replace',
            postprocessors: [
                (elementState) =>
                    elementState.value === '.'
                        ? {value: '0.00', selection: [2, 2]}
                        : elementState,
            ],
        };

        cy.mount(TestInput, {componentProperties: {maskitoOptions}});

        cy.get('input')
            .type('.')
            .should('have.value', '0.00')
            .should('have.prop', 'selectionStart', 2)
            .should('have.prop', 'selectionEnd', 2);
    });
});
