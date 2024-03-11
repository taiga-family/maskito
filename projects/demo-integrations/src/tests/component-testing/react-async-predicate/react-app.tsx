import {MaskitoElementPredicate, maskitoInitialCalibrationPlugin, MaskitoOptions} from '@maskito/core';
import {maskitoTimeOptionsGenerator} from '@maskito/kit';
import {useMaskito} from '@maskito/react';
import {forwardRef, InputHTMLAttributes, useEffect, useState} from 'react';

const timeOptions = maskitoTimeOptionsGenerator({
    mode: 'HH:MM',
});

const options: MaskitoOptions = {
    ...timeOptions,
    plugins: [...timeOptions.plugins, maskitoInitialCalibrationPlugin()],
};

const correctPredicate: MaskitoElementPredicate = host => host.querySelector<HTMLInputElement>('.real-input')!;
const wrongPredicate: MaskitoElementPredicate = host => host.querySelector('input')!;

const longCorrectPredicate: MaskitoElementPredicate = host =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(correctPredicate(host));
        }, 2_000);
    });

const longInvalidPredicate: MaskitoElementPredicate = host =>
    new Promise(resolve => {
        setTimeout(() => resolve(wrongPredicate(host)), 7_000);
    });

const fastValidPredicate: MaskitoElementPredicate = host =>
    new Promise(resolve => {
        setTimeout(() => resolve(correctPredicate(host)), 500);
    });

const hiddenInputStyles = {
    display: 'none',
};

export const AwesomeInput = forwardRef<HTMLDivElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
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
    const [useCorrectPredicate, setUseCorrectPredicate] = useState(false);
    const inputRef2sec = useMaskito({options, elementPredicate: longCorrectPredicate});
    const inputRefRaceCondition = useMaskito({
        options,
        elementPredicate: useCorrectPredicate ? fastValidPredicate : longInvalidPredicate,
    });

    useEffect(() => {
        setTimeout(() => {
            setUseCorrectPredicate(true);
        }, 2_000);
    }, []);

    return (
        <>
            <AwesomeInput
                ref={inputRef2sec}
                id="async-predicate-2s-resolves"
                placeholder="Async predicate (2s)"
            />

            <AwesomeInput
                ref={inputRefRaceCondition}
                id="race-condition-check"
                placeholder="Race condition check"
            />
        </>
    );
};
