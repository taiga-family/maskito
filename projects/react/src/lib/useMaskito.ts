import type {
    MaskitoElement,
    MaskitoElementPredicate,
    MaskitoOptions,
} from '@maskito/core';
import {Maskito, MASKITO_DEFAULT_ELEMENT_PREDICATE} from '@maskito/core';
import type {RefCallback} from 'react';
import {useCallback, useRef, useState} from 'react';

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
    options = null,
    elementPredicate = MASKITO_DEFAULT_ELEMENT_PREDICATE,
}: {
    options?: MaskitoOptions | null;
    elementPredicate?: MaskitoElementPredicate;
} = {}): RefCallback<HTMLElement> => {
    const [hostElement, setHostElement] = useState<HTMLElement | null>(null);
    const [element, setElement] = useState<MaskitoElement | null>(null);

    const onRefChange: RefCallback<HTMLElement> = useCallback(
        (node: HTMLElement | null) => {
            setHostElement(node);
        },
        [],
    );

    const latestPredicateRef = useRef(elementPredicate);

    latestPredicateRef.current = elementPredicate;

    useIsomorphicLayoutEffect(() => {
        if (!hostElement) {
            return;
        }

        const predicate = elementPredicate;
        const elementOrPromise = predicate(hostElement);

        if (isThenable(elementOrPromise)) {
            void elementOrPromise.then((el) => {
                if (latestPredicateRef.current === predicate) {
                    setElement(el);
                }
            });
        } else {
            setElement(elementOrPromise);
        }
    }, [hostElement, elementPredicate, latestPredicateRef]);

    useIsomorphicLayoutEffect(() => {
        if (!element || !options) {
            return;
        }

        const maskedElement = new Maskito(element, options);

        return () => {
            maskedElement.destroy();
        };
    }, [options, element]);

    return onRefChange;
};
