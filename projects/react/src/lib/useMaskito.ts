import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    MASKITO_DEFAULT_OPTIONS,
    MaskitoOptions,
    SyncMaskitoElementPredicate,
} from '@maskito/core';
import {RefCallback, useCallback, useState} from 'react';

import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect';

/**
 * Hook for convenient use of Maskito in React
 * @description For controlled inputs use `onInput` event
 * @param options options used for creating Maskito
 * @param elementPredicate function that can help find nested Input or TextArea
 * @returns ref callback to pass it in React Element
 * @example
 * // To avoid unnecessary hook runs with Maskito recreation pass named variables
 * // good example ✅
 * useMaskito({ options: maskitoOptions, elementPredicate: maskitoPredicate })
 *
 * // bad example ❌
 * useMaskito({ options: { mask: /^.*$/ }, elementPredicate: () => e.querySelector('input') })
 */
export const useMaskito = ({
    options = MASKITO_DEFAULT_OPTIONS,
    elementPredicate = MASKITO_DEFAULT_ELEMENT_PREDICATE,
}: {
    options?: MaskitoOptions;
    elementPredicate?: SyncMaskitoElementPredicate;
} = {}): RefCallback<HTMLElement> => {
    const [element, setElement] = useState<HTMLElement | null>(null);

    const onRefChange: RefCallback<HTMLElement> = useCallback(
        (node: HTMLElement | null) => {
            setElement(node);
        },
        [],
    );

    useIsomorphicLayoutEffect(() => {
        if (!element) {
            return;
        }

        const maskedElement = new Maskito(elementPredicate(element), options);

        return () => {
            maskedElement.destroy();
        };
    }, [options, element, elementPredicate]);

    return onRefChange;
};
