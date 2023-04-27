import {Maskito, MASKITO_DEFAULT_OPTIONS, MaskitoOptions} from '@maskito/core';
import {RefCallback, useCallback, useEffect, useLayoutEffect, useState} from 'react';

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export type MaskitoPredicate = (
    element: HTMLElement,
) => HTMLInputElement | HTMLTextAreaElement;

const defaultMaskitoPredicate: MaskitoPredicate = e =>
    e.querySelector('input,textarea') || (e as HTMLInputElement | HTMLTextAreaElement);

/**
 * Hook for convenient use of Maskito in React
 * @description For controlled inputs use `onInput` event
 * @param options options used for creating Maskito
 * @param predicate function that can help find nested Input or TextArea
 * @returns ref callback to pass it in React Element
 * @example
 * // To avoid unnecessary hook runs with Maskito recreation pass named variables
 * // good example ✅
 * useMaskito({ options: maskitoOptions, predicate: maskitoPredicate })
 *
 * // bad example ❌
 * useMaskito({ options: { mask: /^.*$/ }, predicate: () => e.querySelector('input') })
 */
export const useMaskito = ({
    options = MASKITO_DEFAULT_OPTIONS,
    predicate = defaultMaskitoPredicate,
}: {
    options?: MaskitoOptions;
    predicate?: MaskitoPredicate;
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

        const maskedElement = new Maskito(predicate(element), options);

        return () => {
            maskedElement.destroy();
        };
    }, [options, element, predicate]);

    return onRefChange;
};
