import {MaskitoDirective} from '@maskito/angular';
import {createOutputSpy} from 'cypress/angular';

import {TestInput} from '../utils';

describe('Ensure cy.paste() emulates required browser features', () => {
    const maskitoOptions = {
        mask: /^\d+$/g,
    };

    describe('Emits `beforeinput` event', () => {
        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions,
                    beforeinput: createOutputSpy('beforeinputEvent'),
                },
            });
            cy.get('input').focus();
        });

        it('only once', () => {
            cy.get('input').paste('123');
            cy.get('@beforeinputEvent').should('have.been.calledOnce');
        });

        it('with `inputType: insertFromPaste`', () => {
            cy.get('input').paste('123');

            cy.get('@beforeinputEvent').should('have.been.calledWithMatch', {
                inputType: 'insertFromPaste',
            });
        });

        it('with `data` property', () => {
            cy.get('input').paste('123');

            cy.get('@beforeinputEvent').should('have.been.calledWithMatch', {
                data: '123',
            });
        });
    });

    describe('Emits `input` event', () => {
        beforeEach(() => {
            cy.mount(TestInput, {
                componentProperties: {
                    maskitoOptions,
                    beforeinput: createOutputSpy('beforeinputEvent'),
                    input: createOutputSpy('inputEvent'),
                },
            });
            cy.get('input').focus();
        });

        it('only once', () => {
            cy.get('input').paste('123');
            cy.get('@inputEvent').should('have.been.calledOnce');
        });

        it('after `beforeinput` event', () => {
            cy.get('input').paste('123');
            cy.get('@beforeinputEvent').then((beforeSpy) =>
                cy.get('@inputEvent').should('have.been.calledAfter', beforeSpy),
            );
        });

        it('only if the previous `beforeinput` event was not prevented', () => {
            cy.get('input').paste('abc');
            cy.get('@beforeinputEvent').should('have.been.calledOnce');
            cy.get('@inputEvent').should('not.have.been.called');
        });
    });

    describe('HTMLInputElement.value', () => {
        beforeEach(() => {
            cy.mount(
                `<input
                    [maskito]="maskitoOptions"
                    (beforeinput)="beforeinput.emit($event.target.value)"
                    (input)="input.emit($event.target.value)"
                />
                `,
                {
                    imports: [MaskitoDirective],
                    componentProperties: {
                        maskitoOptions,
                        beforeinput: createOutputSpy('beforeinputEvent'),
                        input: createOutputSpy('inputEvent'),
                    },
                },
            );
            cy.get('input').focus();
        });

        it('is not yet updated in `beforeinput` event`', () => {
            cy.get('input').paste('123');
            cy.get('@beforeinputEvent').should('have.been.calledOnceWith', '');
        });

        it('is already updated in `input` event', () => {
            cy.get('input').paste('123');
            cy.get('@inputEvent').should('have.been.calledOnceWith', '123');
        });
    });

    it('respects the `maxlength` attribute', () => {
        cy.mount(TestInput, {
            componentProperties: {maskitoOptions, maxLength: 3},
        });

        cy.get('input').focus().paste('12345').should('have.value', '123');
    });

    it('is capable to paste in the middle of already existing value', () => {
        cy.mount(TestInput, {componentProperties: {maskitoOptions}});

        cy.get('input')
            .type('15')
            .type('{leftArrow}')
            .paste('234')
            .should('have.value', '12345')
            .should('have.prop', 'selectionStart', '1234'.length)
            .should('have.prop', 'selectionEnd', '1234'.length);
    });
});
