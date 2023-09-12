// @ts-nocheck React & Vue Global JSX Types Conflicts
// TODO: Check if it still required after upgrade Vue to 3.4 (https://github.com/vuejs/core/pull/7958)
import type {MaskitoElementPredicateAsync} from '@maskito/core';
import {maskitoTimeOptionsGenerator} from '@maskito/kit';
import {useMaskito} from '@maskito/react';
import {forwardRef} from 'react';

const options = maskitoTimeOptionsGenerator({
    mode: 'HH:MM',
});

const elementPredicate: MaskitoElementPredicateAsync = host =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(host.querySelector('input.real-input')!);
        }, 2_000);
    });

const hiddenInputStyles = {
    display: 'none',
};

export const AwesomeInput = forwardRef<HTMLInputElement>((props, ref) => (
    <div ref={ref}>
        <input style={hiddenInputStyles} />
        <input
            className="real-input"
            {...props}
        />
        <input style={hiddenInputStyles} />
    </div>
));

export const App = () => {
    const inputRef = useMaskito({options, elementPredicate});

    return (
        <AwesomeInput
            ref={inputRef}
            placeholder="React async predicate"
        />
    );
};
