import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    MASKITO_DEFAULT_OPTIONS,
    MaskitoElementPredicate,
    MaskitoElementPredicateAsync,
    MaskitoOptions,
} from '@maskito/core';
import {RefCallback, useCallback, useState} from 'react';

import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect';

function isThenable<T = unknown>(x: PromiseLike<T> | T): x is PromiseLike<T> {
    return x && typeof x === 'object' && 'then' in x;
}

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
    elementPredicate?: MaskitoElementPredicate | MaskitoElementPredicateAsync;
} = {}): RefCallback<HTMLElement> => {
    const [hostElement, setHostElement] = useState<HTMLElement | null>(null);
    const [element, setElement] = useState<HTMLInputElement | HTMLTextAreaElement | null>(
        null,
    );

    const onRefChange: RefCallback<HTMLElement> = useCallback(
        (node: HTMLElement | null) => {
            setHostElement(node);
        },
        [],
    );

    useIsomorphicLayoutEffect(() => {
        if (!hostElement) {
            return;
        }

        const elementOrPromise = elementPredicate(hostElement);

        if (isThenable(elementOrPromise)) {
            void elementOrPromise.then(setElement);
        } else {
            setElement(elementOrPromise);
        }
    }, [hostElement, elementPredicate]);

    useIsomorphicLayoutEffect(() => {
        if (!element) {
            return;
        }

        const maskedElement = new Maskito(element, options);

        return () => {
            maskedElement.destroy();
        };
    }, [options, element]);

    return onRefChange;
};
