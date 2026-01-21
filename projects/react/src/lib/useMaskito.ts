import type {
    MaskitoElement,
    MaskitoElementPredicate,
    MaskitoOptions,
} from '@maskito/core';
import {Maskito, MASKITO_DEFAULT_ELEMENT_PREDICATE} from '@maskito/core';
import type {RefCallback} from 'react';
import {useCallback, useRef, useState} from 'react';

import {adaptReactControlledElement} from './adaptControlledElement';
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
    const latestOptionsRef = useRef(options);

    latestPredicateRef.current = elementPredicate;
    latestOptionsRef.current = options;

    useIsomorphicLayoutEffect(() => {
        if (!hostElement) {
            return;
        }

        const elementOrPromise = elementPredicate(hostElement);

        if (isThenable(elementOrPromise)) {
            void elementOrPromise.then((el) => {
                if (
                    latestPredicateRef.current === elementPredicate &&
                    latestOptionsRef.current === options
                ) {
                    setElement(el);
                }
            });
        } else {
            setElement(elementOrPromise);
        }

        return () => {
            setElement(null);
        };
    }, [hostElement, elementPredicate, latestPredicateRef, options, latestOptionsRef]);

    useIsomorphicLayoutEffect(() => {
        if (!element || !options) {
            return;
        }

        const maskedElement = new Maskito(adaptReactControlledElement(element), options);

        return () => {
            maskedElement.destroy();
            setElement(null);
        };
    }, [options, element]);

    return onRefChange;
};
