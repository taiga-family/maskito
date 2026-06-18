import {maskitoDate} from '@maskito/kit';
import {useMaskito} from '@maskito/react-native';
import {type JSX} from 'react';
import {TextInput} from 'react-native';

const options = maskitoDate({locale: 'ja-JP'});
const placeholder = 'yyyy/mm/dd';

export const App = (): JSX.Element => {
    const date = useMaskito({
        options,
        maxLength: placeholder.length,
    });

    return (
        <TextInput
            {...date}
            placeholder={placeholder}
        />
    );
};
