import type {MaskitoElement} from '@maskito/core';

/**
 * React adds `_valueTracker` property to every textfield elements for its internal logic with controlled inputs.
 * Also, React monkey-patches `value`-setter of the native textfield elements to update state inside its `_valueTracker`.
 * @see https://github.com/facebook/react/blob/ee76351917106c6146745432a52e9a54a41ee181/packages/react-dom-bindings/src/client/inputValueTracking.js#L12-L19
 */
type ReactControlledElement = MaskitoElement & {
    _valueTracker: {
        getValue(): string;
        setValue(value: string): void;
        stopTracking(): void;
    };
};

const isReactControlledElement = (
    element: MaskitoElement,
): element is ReactControlledElement => '_valueTracker' in element;

export function adaptReactControlledElement(element: MaskitoElement): MaskitoElement {
    if (!isReactControlledElement(element)) {
        return element;
    }

    const adapter = {
        set value(value: string) {
            const lastValue = element._valueTracker.getValue();

            element.value = value; // It will also update `_valueTracker` state
            /**
             * React depends on `_valueTracker` to know if the value was changed to decide:
             * - should it revert state for controlled input (if its state handler does not update value)
             * - should it dispatch its synthetic (not native!) `change` event
             * ___
             * When Maskito patches textfield with a valid value (using setter of `value` property),
             * it also updates `_valueTracker` state and React mistakenly decides that nothing has happened.
             * React should update `_valueTracker` state by itself.
             * ___
             * @see https://github.com/facebook/react/blob/ee76351917106c6146745432a52e9a54a41ee181/packages/react-dom-bindings/src/client/inputValueTracking.js#L173-L177
             */
            element._valueTracker.setValue(lastValue);
        },
    };

    return new Proxy(element, {
        get(target, prop: keyof HTMLElement) {
            const nativeProperty = target[prop];

            return typeof nativeProperty === 'function'
                ? nativeProperty.bind(target)
                : nativeProperty;
        },
        // eslint-disable-next-line @typescript-eslint/max-params
        set(target, prop: keyof HTMLElement, val, receiver) {
            return Reflect.set(prop in adapter ? adapter : target, prop, val, receiver);
        },
    });
}
