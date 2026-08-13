import {type MaskitoOptions} from '@maskito/core';
import {useMaskito} from '@maskito/react-native';
import {type JSX, useState} from 'react';
import {TextInput} from 'react-native';

const latinOnlyMask: MaskitoOptions = {mask: /^[a-z]+$/i};

export function App(): JSX.Element {
    const [value, setValue] = useState('');

    const surnameMask = useMaskito({
        options: latinOnlyMask,
        // `onChange` is available too
        onChangeText: (x) => setValue(x.toUpperCase()),
    });

    return (
        <TextInput
            {...surnameMask}
            value={value}
            placeholder="Surname"
        />
    );
}
