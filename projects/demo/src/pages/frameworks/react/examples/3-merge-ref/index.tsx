import type {MaskitoOptions} from '@maskito/core';
import {useMaskito} from '@maskito/react';
import type {ComponentType} from 'react';

const digitsOnlyMask: MaskitoOptions = {
    mask: /^\d+$/,
};

export const App: ComponentType = () => {
    const maskitoRef = useMaskito({options: digitsOnlyMask});

    return (
        <input
            ref={(node) => {
                maskitoRef(node);
                externalRef.current = node;
            }}
            placeholder="Enter a number"
        />
    );
};
