import type {MaskitoPlugin} from '@maskito/core';

import type {TypedInputEvent} from '../types';
import {EventListener} from '../utils';

const SPACE = ' ';

/**
 * 1. Android user (with G-board keyboard or similar) presses 1st space
 * ```
 * {type: "beforeinput", data: " ", inputType: "insertText"}
 * ```
 * 2. User presses 2nd space
 * ```
 * // Android tries to delete previously inserted space
 * {type: "beforeinput", inputType: "deleteContentBackward"}
 * {type: "beforeinput", data: ". ", inputType: "insertText"}
 * ```
 * ---------
 * 1. MacOS user presses 1st space
 * ```
 * {type: "beforeinput", data: " ", inputType: "insertText"}
 * ```
 * 2. User presses 2nd space
 * ```
 * // MacOS automatically run `element.setSelectionRange(indexBeforeSpace, indexAfterSpace)` and then
 * {type: "beforeinput", data: ". ", inputType: "insertText"}
 * ```
 * ---------
 * @see https://github.com/taiga-family/maskito/issues/2023
 */
export function createDoubleSpacePlugin(): MaskitoPlugin {
    let prevValue = '';
    let prevCaretIndex = 0;
    let prevEvent: TypedInputEvent | null = null;
    let prevRejectedSpace = false;

    return (element) => {
        const eventListener = new EventListener(element);

        eventListener.listen('beforeinput', (event) => {
            const {value, selectionStart, selectionEnd} = element;
            const rejectedSpace =
                prevEvent?.inputType === 'insertText' &&
                prevEvent.data === SPACE &&
                !value.slice(0, Number(selectionEnd)).endsWith(SPACE);

            if (event.inputType === 'insertText' && event.data === `.${SPACE}`) {
                if (
                    prevEvent?.inputType === 'deleteContentBackward' &&
                    prevRejectedSpace
                ) {
                    // Android
                    element.value = prevValue;
                    element.setSelectionRange(prevCaretIndex, prevCaretIndex);
                } else if (rejectedSpace) {
                    // Mac OS
                    element.setSelectionRange(selectionStart, selectionStart);
                }
            }

            prevRejectedSpace = rejectedSpace;
            prevEvent = event;
            prevValue = value;
            prevCaretIndex = Number(
                (rejectedSpace ? prevCaretIndex : selectionEnd) === value.length
                    ? selectionEnd
                    : selectionStart,
            );
        });

        return () => eventListener.destroy();
    };
}
