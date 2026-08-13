import"./chunk-TIC6Q35B.js";var i=`import type {MaskitoOptions} from '@maskito/core';
import {useMaskito} from '@maskito/react-native';
import {type JSX} from 'react';
import {TextInput} from 'react-native';

const digitsOnlyMask: MaskitoOptions = {mask: /^\\d+$/};

export const App = (): JSX.Element => {
    const digits = useMaskito({
        options: digitsOnlyMask,
        defaultValue: '42',
    });

    return (
        <TextInput
            {...digits}
            placeholder="Enter a number"
        />
    );
};
`;export{i as default};
