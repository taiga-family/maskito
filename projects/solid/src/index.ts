import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    type MaskitoElementPredicate,
    type MaskitoOptions,
} from '@maskito/core';
import {
    createEffect,
    createResource,
    createSignal,
    onCleanup,
    type Setter,
} from 'solid-js';

export const useMaskito = ({
    options = null,
    elementPredicate = MASKITO_DEFAULT_ELEMENT_PREDICATE,
}: {
    options?: MaskitoOptions | null;
    elementPredicate?: MaskitoElementPredicate;
} = {}): Setter<HTMLElement | null> => {
    const [hostElement, setHostElement] = createSignal<HTMLElement | null>(null);
    const [element, {mutate}] = createResource(hostElement, async (h) =>
        h ? elementPredicate(h) : null,
    );

    createEffect(() => {
        const e = element.latest;

        if (!e || !options) {
            return;
        }

        const maskito = new Maskito(e, options);

        onCleanup(() => {
            setHostElement(null);
            mutate(null);
            maskito.destroy();
        });
    });

    return setHostElement;
};
