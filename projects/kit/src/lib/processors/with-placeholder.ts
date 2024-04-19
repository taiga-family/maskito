import type {MaskitoOptions} from '@maskito/core';
import {maskitoUpdateElement} from '@maskito/core';

import {maskitoCaretGuard, maskitoEventHandler} from '../plugins';

export function maskitoWithPlaceholder(
    placeholder: string,
    focusedOnly = false,
): Pick<Required<MaskitoOptions>, 'plugins' | 'postprocessors' | 'preprocessors'> & {
    removePlaceholder: (value: string) => string;
} {
    let lastClearValue = '';
    const removePlaceholder = (value: string): string => {
        for (let i = value.length - 1; i >= lastClearValue.length; i--) {
            if (value[i] !== placeholder[i]) {
                return value.slice(0, i + 1);
            }
        }

        return value.slice(0, lastClearValue.length);
    };
    const plugins = [maskitoCaretGuard(value => [0, removePlaceholder(value).length])];

    let focused = false;

    if (focusedOnly) {
        const focus = maskitoEventHandler(
            'focus',
            element => {
                focused = true;
                maskitoUpdateElement(
                    element,
                    element.value + placeholder.slice(element.value.length),
                );
            },
            {capture: true},
        );

        const blur = maskitoEventHandler(
            'blur',
            element => {
                focused = false;
                maskitoUpdateElement(element, removePlaceholder(element.value));
            },
            {capture: true},
        );

        plugins.push(focus, blur);
    }

    return {
        plugins,
        removePlaceholder,
        preprocessors: [
            ({elementState, data}) => {
                const {value, selection} = elementState;

                return {
                    elementState: {
                        selection,
                        value: removePlaceholder(value),
                    },
                    data,
                };
            },
        ],
        postprocessors: [
            ({value, selection}, initialElementState) => {
                lastClearValue = value;

                /**
                 * If `value` still equals to `initialElementState.value`,
                 * then it means that value is patched programmatically (from Maskito's plugin or externally).
                 * In this case, we don't want to mutate value and automatically add placeholder.
                 * ___
                 * For example, developer wants to remove manually placeholder (+ do something else with value) on blur.
                 * Without this condition, placeholder will be unexpectedly added again.
                 */
                return value !== initialElementState.value && (focused || !focusedOnly)
                    ? {
                          value: value + placeholder.slice(value.length),
                          selection,
                      }
                    : {value, selection};
            },
        ],
    };
}
