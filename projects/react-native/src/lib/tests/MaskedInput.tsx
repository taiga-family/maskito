import {useMaskito} from '@maskito/react-native';
import {useEffect, useState} from 'react';
import {type JSX} from 'react/jsx-runtime';
import {TextInput, type TextInputProps} from 'react-native';

export function MaskedInput(params: Parameters<typeof useMaskito>[0]): JSX.Element {
    const mask = useMaskito(params);
    const [caretIndex, setCaretIndex] = useState<number>();

    useEffect(() => {
        if (mask.selection) {
            setCaretIndex(mask.selection.start);
        }
    }, [mask.selection]);

    const props: TextInputProps & {caretIndex?: number} = {
        ...mask,
        caretIndex,
    };

    return (
        <TextInput
            {...props}
            testID="input"
        />
    );
}
