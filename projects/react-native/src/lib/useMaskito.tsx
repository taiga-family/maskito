import {Maskito, type MaskitoOptions, maskitoTransform} from '@maskito/core';
import {useCallback, useEffect, useMemo, useState} from 'react';
import type {ReactNativeElement, TextInputChangeEvent, TextInputProps} from 'react-native';

import {createHeadlessElement} from './element';

/**
 * ```jsx
 * const dateMask = useMaskito(...);
 * <TextInput {...dateMask} placeholder="dd/mm/yyy" />
 * ```
 */
export function useMaskito({
    options,
    defaultValue = '',
    maxLength,
    onChangeText,
    onChange: userOnChange,
}: Pick<TextInputProps, 'defaultValue' | 'maxLength' | 'onChange' | 'onChangeText'> & {
    readonly options: MaskitoOptions;
}): Pick<TextInputProps, 'maxLength' | 'onChange' | 'selection' | 'value'> {
    const [selection, setSelection] = useState<TextInputProps['selection']>();
    const [value, setValue] = useState(() => maskitoTransform(defaultValue, options));
    const mask = useMemo(() => new Maskito(createHeadlessElement({value, maxLength}), options), [options, maxLength]);

    const onChange = useCallback(
        (e: TextInputChangeEvent) => {
            const {selectionStart, selectionEnd, data} = reconstructEdit(value, {
                value: e.nativeEvent.text,
                selection: getSelection(e),
            });

            mask.element.value = value;
            mask.element.selectionStart = selectionStart;
            mask.element.selectionEnd = selectionEnd;
            mask.upcomingElementState = null;

            if (data) {
                mask.insert(data);
            } else {
                mask.delete([selectionStart, selectionEnd]);
            }

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            const next = mask.upcomingElementState ?? {
                value: mask.element.value,
                selection: [mask.element.selectionStart, mask.element.selectionEnd] as const,
            };

            if (next.value !== value) {
                setValue(next.value);
            }

            setSelection({start: next.selection[0], end: next.selection[1]});

            userOnChange?.({
                ...e,
                nativeEvent: {
                    ...e.nativeEvent,
                    text: next.value,
                },
            });
            onChangeText?.(next.value);
        },
        [mask, value, userOnChange, onChangeText],
    );

    // Release the one-shot controlled selection after it has been applied, so the
    // TextInput goes back to uncontrolled-selection and the user can move the caret.
    useEffect(() => {
        if (selection) {
            setSelection(undefined);
        }
    }, [selection]);

    return {value, selection, onChange, maxLength};
}

function reconstructEdit(
    previous: string,
    {value, selection}: {value: string; selection: Required<TextInputProps>['selection']},
): {selectionStart: number; selectionEnd: number; data: string} {
    if (!previous && value) {
        // required for browser autofill, which wrongly reports the caret as `[0, 0]`
        return {selectionStart: 0, selectionEnd: 0, data: value};
    }

    const {start} = selection;
    const minLength = Math.min(previous.length, value.length);
    let prefix = 0;

    while (prefix < minLength && previous[prefix] === value[prefix]) {
        prefix += 1;
    }

    const selectionEnd = Math.max(0, Math.min(previous.length, previous.length - value.length + start));
    const selectionStart = Math.max(0, Math.min(prefix, start, selectionEnd));

    return {
        selectionStart,
        selectionEnd,
        data: value.slice(selectionStart, start),
    };
}

function getSelection({
    nativeEvent,
    target,
}: Pick<TextInputProps, 'selection'> & TextInputChangeEvent): Required<TextInputProps>['selection'] {
    if ('selection' in nativeEvent) {
        /**
         * `selection` is part of `TextInput.onChange` event for all native platforms since react-native >= 0.85.0
         * This utility is required to typecast poor typings only.
         * https://github.com/react/react-native/commit/162627af7c53e27433f39f82c4630baff0695bf1
         * https://github.com/react/react-native/commit/c1f5445f4a59d0035389725e47da58eb3d2c267c
         *
         * TODO: delete typecast after merging this PR https://github.com/react/react-native/pull/57249
         */
        return nativeEvent.selection as NonNullable<TextInputProps['selection']>;
    }

    return isWeb(target) ? {start: target.selectionStart ?? 0, end: target.selectionEnd ?? 0} : {start: 0, end: 0};
}

function isWeb(element: HTMLInputElement | ReactNativeElement): element is HTMLInputElement {
    return 'selectionStart' in element;
}
