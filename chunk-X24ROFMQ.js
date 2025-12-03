import"./chunk-ENRHZQ2S.js";var e=`import type {MaskitoOptions} from '@maskito/core';
import {useMaskito} from '@maskito/react';
import type {ComponentType} from 'react';

const digitsOnlyMask: MaskitoOptions = {
    mask: /^\\d+$/,
};

export const App: ComponentType = () => {
    const inputRef = useMaskito({options: digitsOnlyMask});

    return (
        <input
            ref={inputRef}
            placeholder="Enter a number"
        />
    );
};
`;export{e as default};
