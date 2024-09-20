import type {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';
import {useMaskito} from '@maskito/react';
import type {ComponentType} from 'react';
import {useEffect, useState} from 'react';

import {AwesomeInput} from '../awesome-input';

export const SWITCH_OPTIONS_TIME = 1_000;
export const PREDICATE_RESOLVING_TIME = 2_000;

const numberOptions: MaskitoOptions = {mask: /^\d+$/};
const engLettersOptions: MaskitoOptions = {mask: /^[a-z]+$/i};

const elementPredicate: MaskitoElementPredicate = async (element) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(element.querySelector('.real-input') as HTMLInputElement), PREDICATE_RESOLVING_TIME);
    });

export const App: ComponentType = () => {
    const [options, setOptions] = useState(numberOptions);
    const maskRef = useMaskito({options, elementPredicate});

    useEffect(() => {
        setTimeout(() => {
            setOptions(engLettersOptions);
        }, SWITCH_OPTIONS_TIME);
    }, []);

    return <AwesomeInput ref={maskRef} />;
};
