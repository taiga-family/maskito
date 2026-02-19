import type {MaskitoElement} from '@maskito/core';

/**
 * React adds `_valueTracker` property to every textfield elements for its internal logic with controlled inputs.
 * Also, React monkey-patches `value`-setter of the native textfield elements to update state inside its `_valueTracker`.
 * @see https://github.com/facebook/react/blob/ee76351917106c6146745432a52e9a54a41ee181/packages/react-dom-bindings/src/client/inputValueTracking.js#L12-L19
 *
 * React depends on `_valueTracker` to know if the value was changed to decide:
 * - should it revert state for controlled input (if its state handler does not update value)
 * - should it dispatch its synthetic (not native!) `change` event
 *
 * When Maskito patches textfield with a valid value (using setter of `value` property),
 * it also updates `_valueTracker` state and React mistakenly decides that nothing has happened.
 * React should update `_valueTracker` state by itself!
 * ___
 * @see https://github.com/facebook/react/blob/ee76351917106c6146745432a52e9a54a41ee181/packages/react-dom-bindings/src/client/inputValueTracking.js#L173-L177
 */
export function adaptReactControlledElement(element: MaskitoElement): MaskitoElement {
    const valueSetter = Object.getOwnPropertyDescriptor(
        getPrototype(element),
        'value',
    )?.set;

    if (!valueSetter) {
        return element;
    }

    const adapter = {
        set value(value: string) {
            /**
             * Mimics exactly what happens when a browser silently changes the value property.
             * Bypass the React monkey-patching.
             */
            valueSetter.call(element, value);
        },
    };

    return new Proxy(element, {
        get(target, prop: keyof HTMLElement) {
            const nativeProperty = target[prop];

            return typeof nativeProperty === 'function'
                ? nativeProperty.bind(target)
                : nativeProperty;
        },
        set(target, prop: keyof HTMLElement, val, receiver) {
            return Reflect.set(prop in adapter ? adapter : target, prop, val, receiver);
        },
    });
}

function getPrototype(
    element: MaskitoElement,
): HTMLInputElement | HTMLTextAreaElement | null | undefined {
    switch (element.nodeName) {
        case 'INPUT':
            return globalThis.HTMLInputElement.prototype;
        case 'TEXTAREA':
            return globalThis.HTMLTextAreaElement.prototype;
        default:
            return null;
    }
}
