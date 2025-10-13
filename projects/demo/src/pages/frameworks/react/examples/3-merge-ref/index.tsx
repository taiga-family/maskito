import type {MaskitoOptions} from '@maskito/core';
import {useMaskito} from '@maskito/react';
import type {ComponentType} from 'react';
import {useRef} from 'react';

const digitsOnlyMask: MaskitoOptions = {
    mask: /^\d+$/,
};

export const App: ComponentType = () => {
    const externalRef = useRef<HTMLInputElement | null>(null);
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
