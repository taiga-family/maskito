import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    MaskitoElementPredicate,
    MaskitoOptions,
} from '@maskito/core';
import {ObjectDirective} from 'vue';

const teardown = new Map<HTMLElement, Maskito>();

function update(
    element: HTMLElement,
    options: MaskitoOptions & {elementPredicate?: MaskitoElementPredicate},
): void {
    const predicate = options.elementPredicate ?? MASKITO_DEFAULT_ELEMENT_PREDICATE;
    const predicateResult = predicate(element);

    teardown.get(element)?.destroy();
    teardown.set(element, new Maskito(predicateResult, options));
}

export const maskito: ObjectDirective<
    HTMLElement,
    MaskitoOptions & {elementPredicate?: MaskitoElementPredicate}
> = {
    unmounted: element => teardown.get(element)?.destroy(),
    mounted: (element, {value}) => update(element, value),
    updated: (element, {value, oldValue}) => {
        if (value !== oldValue) {
            update(element, value);
        }
    },
};
