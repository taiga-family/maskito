import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    MaskitoElementPredicate,
    MaskitoOptions,
} from '@maskito/core';
import {ObjectDirective} from 'vue';

const teardown = new Map<HTMLElement, Maskito>();

function fallback(options: {
    elementPredicate?: MaskitoElementPredicate;
}): MaskitoElementPredicate {
    return options.elementPredicate ?? MASKITO_DEFAULT_ELEMENT_PREDICATE;
}

export const maskito: ObjectDirective<
    HTMLElement,
    MaskitoOptions & {elementPredicate?: MaskitoElementPredicate}
> = {
    unmounted: element => teardown.get(element)?.destroy(),
    mounted: (element, {value}) =>
        teardown.set(element, new Maskito(fallback(value)(element), value)),
    updated: (element, {value, oldValue}) => {
        if (value !== oldValue) {
            teardown.get(element)?.destroy();
            teardown.set(element, new Maskito(fallback(value)(element), value));
        }
    },
};
