import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    MASKITO_DEFAULT_OPTIONS,
    MaskitoElementPredicate,
    MaskitoOptions,
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
    elementPredicate?: MaskitoElementPredicate;
} = {}): RefCallback<HTMLElement> => {
    const [predicateResult, setPredicateResult] = useState<
        HTMLInputElement | HTMLTextAreaElement | null
    >(null);

    const onRefChange: RefCallback<HTMLElement> = useCallback(
        async (node: HTMLElement | null) => {
            if (node) {
                const predicate = await elementPredicate(node);

                setPredicateResult(predicate);
            }
        },
        [elementPredicate],
    );

    useIsomorphicLayoutEffect(() => {
        if (!predicateResult) {
            return;
        }

        const maskedElement = new Maskito(predicateResult, options);

        return () => {
            maskedElement.destroy();
        };
    }, [options, predicateResult]);

    return onRefChange;
};
