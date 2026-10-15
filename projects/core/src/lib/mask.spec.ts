/** @jest-environment jsdom */

import {describe, expect, it, jest} from '@jest/globals';

import {Maskito} from './mask';

describe('Maskito input events', () => {
    const options = {mask: /^\d*$/};

    it('does not dispatch another input event if the value setter rejects the masked value', () => {
        const input = document.createElement('input');
        const maskito = new Maskito(input, options);
        const nativeValue = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            'value',
        )!;

        // React's value tracker puts an own configurable value property on the input.
        Object.defineProperty(input, 'value', {...nativeValue, configurable: true});

        const trackedValue = Object.getOwnPropertyDescriptor(input, 'value')!;
        const autofillValue = '12a3';
        let setterCalled = false;

        // Chromium for iOS temporarily replaces that property during autofill.
        Object.defineProperty(input, 'value', {
            configurable: true,
            get: () => (setterCalled ? trackedValue.get!.call(input) : autofillValue),
            set: () => {
                setterCalled = true;
                trackedValue.set!.call(input, autofillValue);
            },
        });

        const onInput = jest.fn();

        input.addEventListener('input', onInput);

        try {
            input.dispatchEvent(new Event('input', {bubbles: true}));

            expect(setterCalled).toBe(true);
            expect(input.value).toBe(autofillValue);
            expect(onInput).toHaveBeenCalledTimes(1);
        } finally {
            Object.defineProperty(input, 'value', trackedValue);
            maskito.destroy();
        }
    });

    it('dispatches a second input event when the masked value is written', () => {
        const input = document.createElement('input');
        const maskito = new Maskito(input, options);
        const onInput = jest.fn();

        input.value = '12a3';
        input.addEventListener('input', onInput);
        input.dispatchEvent(new Event('input', {bubbles: true}));

        expect(input.value).toBe('123');
        expect(onInput).toHaveBeenCalledTimes(2);

        maskito.destroy();
    });
});
