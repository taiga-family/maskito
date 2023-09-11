import type {MaskitoOptions} from '@maskito/core';
import {useMaskito} from '@maskito/react';

const digitsOnlyMask: MaskitoOptions = {
    mask: /^\d+$/,
};

export const App = () => {
    const inputRef = useMaskito({options: digitsOnlyMask});

    return (
        <input
            ref={inputRef}
            placeholder="Enter a number"
        />
    );
};
