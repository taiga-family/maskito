import"./chunk-6M32EY24.js";var o=`import type {MaskitoElementPredicate} from '@maskito/core';
import {maskitoDateOptionsGenerator} from '@maskito/kit';
import {useMaskito} from '@maskito/react';
import type {ComponentType} from 'react';

import {AwesomeInput} from './awesome-input';

const options = maskitoDateOptionsGenerator({
    mode: 'dd/mm/yyyy',
});

const elementPredicate: MaskitoElementPredicate = (host) => host.querySelector<HTMLInputElement>('input.real-input')!;

export const App: ComponentType = () => {
    const inputRef = useMaskito({options, elementPredicate});

    return (
        <AwesomeInput
            ref={inputRef}
            placeholder="Enter date"
        />
    );
};
`;export{o as default};
