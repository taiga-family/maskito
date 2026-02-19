import type {ElementState, MaskitoElement} from '../../types';

/**
 * Sets value to element, and dispatches input event
 * if you passed ELementState, it also sets selection range
 *
 * @example
 * maskitoUpdateElement(input, newValue);
 * maskitoUpdateElement(input, elementState);
 *
 * @see {@link https://github.com/taiga-family/maskito/issues/804 issue}
 *
 * @return void
 */
export function maskitoUpdateElement(
    element: MaskitoElement,
    valueOrElementState: ElementState | string,
): void {
    const initialValue = element.value;

    if (typeof valueOrElementState === 'string') {
        element.value = valueOrElementState;
    } else {
        const [from, to] = valueOrElementState.selection;

        element.value = valueOrElementState.value;

        if (element.matches(':focus')) {
            element.setSelectionRange(from, to);
        }
    }

    if (element.value !== initialValue) {
        element.dispatchEvent(
            new Event(
                'input',
                /**
                 * React handles this event only on bubbling phase
                 *
                 * here is the list of events that are processed in the capture stage, others are processed in the bubbling stage
                 * https://github.com/facebook/react/blob/cb2439624f43c510007f65aea5c50a8bb97917e4/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js#L222
                 */
                {bubbles: true},
            ),
        );
    }
}
