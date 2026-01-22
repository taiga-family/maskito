import type {MaskitoOptions} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';
import {maskitoEventHandler, maskitoWithPlaceholder} from '@maskito/kit';

import {TestInput} from '../utils';

describe('Placeholder | partial removal of placeholder characters on blur', () => {
    const PLACEHOLDER = 'xx xx xx xx##';
    const {plugins, ...rest} = maskitoWithPlaceholder(PLACEHOLDER);

    const maskitoOptions: MaskitoOptions = {
        ...rest,
        mask: PLACEHOLDER.split('').map((x) => (x === 'x' || x === '#' ? /\d/ : x)),
        plugins: [
            ...plugins,
            maskitoEventHandler('focus', (element) => {
                const value = element.value || '';

                maskitoUpdateElement(element, value + PLACEHOLDER.slice(value.length));
            }),
            maskitoEventHandler('blur', (element) =>
                maskitoUpdateElement(element, element.value.replaceAll('#', '')),
            ),
        ],
    };

    beforeEach(() => {
        cy.mount(TestInput, {componentProperties: {maskitoOptions}});
    });

    it('Empty => focus => show full placeholder', () => {
        cy.get('input')
            .should('have.value', '')
            .focus()
            .should('have.value', PLACEHOLDER);
    });

    [
        {typedCharacters: '99', formattedValue: '99 xx xx xx##', caretIndex: '99'.length},
        {
            typedCharacters: '9988',
            formattedValue: '99 88 xx xx##',
            caretIndex: '99 88'.length,
        },
        {
            typedCharacters: '99887',
            formattedValue: '99 88 7x xx##',
            caretIndex: '99 88 7'.length,
        },
        {
            typedCharacters: '998877',
            formattedValue: '99 88 77 xx##',
            caretIndex: '99 88 77'.length,
        },
        {
            typedCharacters: '99887766',
            formattedValue: '99 88 77 66##',
            caretIndex: '99 88 77 66'.length,
        },
        {
            typedCharacters: '998877665',
            formattedValue: '99 88 77 665#',
            caretIndex: '99 88 77 665'.length,
        },
        {
            typedCharacters: '9988776654',
            formattedValue: '99 88 77 6654',
            caretIndex: '99 88 77 6654'.length,
        },
    ].forEach(({typedCharacters, formattedValue, caretIndex}) => {
        it(`Only placeholder characters => Type ${typedCharacters} => ${formattedValue}`, () => {
            cy.get('input')
                .type(typedCharacters)
                .should('have.value', formattedValue)
                .should('have.prop', 'selectionStart', caretIndex)
                .should('have.prop', 'selectionEnd', caretIndex);
        });

        const withoutHashtags = formattedValue.replaceAll('#', '');

        it(`Focused textfield with ${formattedValue} => Blur => ${withoutHashtags}`, () => {
            cy.get('input')
                .type(typedCharacters)
                .blur()
                .should('have.value', withoutHashtags);
        });
    });
});
