import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    MaskitoElementPredicate,
    MaskitoElementPredicateAsync,
    MaskitoOptions,
} from '@maskito/core';
import {ObjectDirective} from 'vue';

const teardown = new Map<HTMLElement, Maskito>();
const predicates = new Map<
    HTMLElement,
    MaskitoElementPredicate | MaskitoElementPredicateAsync
>();

async function update(
    element: HTMLElement,
    options: MaskitoOptions & {
        elementPredicate?: MaskitoElementPredicate | MaskitoElementPredicateAsync;
    },
): Promise<void> {
    const predicate = options.elementPredicate ?? MASKITO_DEFAULT_ELEMENT_PREDICATE;

    predicates.set(element, predicate);

    const predicateResult = await predicate(element);

    if (predicates.get(element) !== predicate) {
        return;
    }

    teardown.get(element)?.destroy();
    teardown.set(element, new Maskito(predicateResult, options));
}

function unmount(element: HTMLElement): void {
    teardown.get(element)?.destroy();
    teardown.delete(element);
    predicates.delete(element);
}

export const maskito: ObjectDirective<
    HTMLElement,
    MaskitoOptions & {elementPredicate?: MaskitoElementPredicate}
> = {
    unmounted: element => unmount(element),
    mounted: async (element, {value}) => update(element, value),
    updated: async (element, {value, oldValue}) => {
        if (value !== oldValue) {
            await update(element, value);
        }
    },
};
