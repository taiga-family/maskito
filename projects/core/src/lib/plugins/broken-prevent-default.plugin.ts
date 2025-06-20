import type {MaskitoPlugin} from '@maskito/core';

import type {TypedInputEvent} from '../types';
import {EventListener} from '../utils';

/**
 * All `input` events with `inputType=deleteContentBackward` always follows `beforeinput` event with the same `inputType`.
 * If `beforeinput[inputType=deleteContentBackward]` is prevented, subsequent `input[inputType=deleteContentBackward]` is prevented too.
 * There is an exception – Android devices with Microsoft SwiftKey Keyboard in Mobile Chrome.
 * These devices ignores `preventDefault` for `beforeinput` event if Backspace is pressed.
 * @see https://github.com/taiga-family/maskito/issues/2135#issuecomment-2980729647
 * ___
 * TODO: track Chromium bug report and delete this plugin after bug fix
 * https://issues.chromium.org/issues/40885402
 */
export function createBrokenDefaultPlugin(): MaskitoPlugin {
    return (element) => {
        const eventListener = new EventListener(element);

        let isVirtualAndroidKeyboard = false;
        let beforeinputEvent: TypedInputEvent;
        let value = element.value;

        eventListener.listen('keydown', ({key}) => {
            isVirtualAndroidKeyboard = key === 'Unidentified';
        });

        eventListener.listen('beforeinput', (event) => {
            beforeinputEvent = event;
            value = element.value;
        });

        eventListener.listen(
            'input',
            (event) => {
                if (
                    isVirtualAndroidKeyboard &&
                    beforeinputEvent.defaultPrevented &&
                    beforeinputEvent.inputType === 'deleteContentBackward' &&
                    event.inputType === 'deleteContentBackward'
                ) {
                    element.value = value;
                }
            },
            {capture: true},
        );

        return () => eventListener.destroy();
    };
}
