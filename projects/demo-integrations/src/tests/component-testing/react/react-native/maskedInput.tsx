import {useMaskito} from '@maskito/react-native';
import {type JSX} from 'react';
import {TextInput} from 'react-native-web';

export function MaskedInput(props: Parameters<typeof useMaskito>[0]): JSX.Element {
    const masked = useMaskito(props);

    return (
        <TextInput
            {...masked}
            testID="input"
        />
    );
}
