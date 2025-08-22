import type {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {useMaskito} from '@maskito/react';
import {mount} from 'cypress/react';
import type {ChangeEvent, JSX} from 'react';
import {useCallback, useState} from 'react';

describe('React synthetic "onChange" event', () => {
    describe('uncontrolled input', () => {
        beforeEach(() => {
            const handler = cy.spy().as('handler');
            const options = maskitoNumberOptionsGenerator({maximumFractionDigits: 2, thousandSeparator: ' '});

            function App(): JSX.Element {
                const maskRef = useMaskito({options});

                return (
                    <input
                        ref={maskRef}
                        onChange={(e) => handler(e.target.value)}
                    />
                );
            }

            mount(<App />);
        });

        it('type valid value (no mask interference) => onChange is dispatched', () => {
            cy.get('input').type('0').should('have.value', '0');
            cy.get('@handler').should('have.been.calledOnceWith', '0');
        });

        it('type invalid value (mask rejects it) => onChange is NOT dispatched', () => {
            cy.get('input').type('t').should('have.value', '');
            cy.get('@handler').should('not.have.been.called');
        });

        it('type partially valid value (mask corrects it and patches textfield) => onChange is dispatched ONCE', () => {
            cy.get('input').type(',').should('have.value', '0.');
            cy.get('@handler').should('have.been.calledOnceWith', '0.');
        });

        it('paste partially valid value (mask corrects it and patches textfield) => onChange is dispatched ONCE', () => {
            cy.get('input').focus().paste('123456,78').should('have.value', '123 456.78');
            cy.get('@handler').should('have.been.calledOnceWith', '123 456.78');
        });
    });

    describe('controlled input', () => {
        beforeEach(() => {
            const capitalize = (x: string): string => x.charAt(0).toUpperCase() + x.slice(1);
            const handler = cy.spy().as('handler');
            const options: MaskitoOptions = {
                mask: /^[a-z]+$/i,
                postprocessors: [({value, selection}) => ({value: value.replaceAll('t', 'T'), selection})],
            };

            function App(): JSX.Element {
                const maskRef = useMaskito({options});
                const [value, setValue] = useState('');
                const onChange = useCallback(
                    ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
                        handler(value);
                        setValue(capitalize(value));
                    },
                    [setValue, handler],
                );

                return (
                    <input
                        ref={maskRef}
                        value={value}
                        onChange={onChange}
                    />
                );
            }

            mount(<App />);
        });

        it('type valid value (no mask interference) => onChange is dispatched', () => {
            cy.get('input').type('N').should('have.value', 'N');
            cy.get('@handler').should('have.been.calledOnceWith', 'N');
            cy.get('input').type('i').should('have.value', 'Ni');
            cy.get('@handler').should('have.been.calledWith', 'Ni');
        });

        it('type invalid value (mask rejects it) => onChange is NOT dispatched', () => {
            cy.get('input').type('123').should('have.value', '');
            cy.get('@handler').should('not.have.been.called');
        });

        it('type partially valid value (mask corrects it and patches textfield) => onChange is dispatched', () => {
            cy.get('input').type('Nikit').should('have.value', 'NikiT');
            cy.get('@handler').should('have.been.calledWith', 'NikiT');
        });

        it('type partially valid value (state action corrects it and patches textfield) => onChange is dispatched with initial value', () => {
            cy.get('input').type('n').should('have.value', 'N');
            cy.get('@handler').should('have.been.calledWith', 'n');
        });

        it('paste partially valid value (mask+state action correct it and patches textfield) => onChange is dispatched ONCE', () => {
            cy.get('input').focus().paste('nikita').should('have.value', 'NikiTa');
            cy.get('@handler').should('have.been.calledOnceWith', 'nikiTa');
        });
    });

    describe('controlled input with noop state handler', () => {
        beforeEach(() => {
            const handler = cy.spy().as('handler');
            const options: MaskitoOptions = {
                mask: /^[a-z]+$/i,
                postprocessors: [({value, selection}) => ({value: value.toUpperCase(), selection})],
            };

            function App(): JSX.Element {
                const maskRef = useMaskito({options});
                const [value] = useState('');

                return (
                    <input
                        ref={maskRef}
                        value={value}
                        onChange={(e) => handler(e.target.value)}
                    />
                );
            }

            mount(<App />);
        });

        it('type invalid value (mask rejects it) => onChange is NOT dispatched', () => {
            cy.get('input').type('123').should('have.value', '');
            cy.get('@handler').should('not.have.been.called');
        });

        it('type valid value (no mask interference) => textfield value is still empty', () => {
            cy.get('input').type('T').should('have.value', '');
            cy.get('@handler').should('have.been.calledWith', 'T');
        });

        it('type partially valid value (mask corrects it and patches textfield) => textfield value is still empty', () => {
            cy.get('input').type('t').should('have.value', '');
            cy.get('@handler').should('have.been.calledWith', 'T');
        });
    });
});
