import type {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';
import {Maskito, MASKITO_DEFAULT_ELEMENT_PREDICATE} from '@maskito/core';
import type {ObjectDirective} from 'vue';

const teardown = new Map<HTMLElement, Maskito>();
const predicates = new Map<HTMLElement, MaskitoElementPredicate>();

async function update(
    element: HTMLElement,
    options:
        | (MaskitoOptions & {
              elementPredicate?: MaskitoElementPredicate;
          })
        | null,
): Promise<void> {
    const predicate = options?.elementPredicate ?? MASKITO_DEFAULT_ELEMENT_PREDICATE;

    predicates.set(element, predicate);

    const predicateResult = await predicate(element);

    if (predicates.get(element) !== predicate) {
        return;
    }

    teardown.get(element)?.destroy();

    if (options) {
        teardown.set(element, new Maskito(predicateResult, options));
    }
}

export const maskito: ObjectDirective<
    HTMLElement,
    | (MaskitoOptions & {
          elementPredicate?: MaskitoElementPredicate;
      })
    | null
> = {
    unmounted: (element) => {
        teardown.get(element)?.destroy();
        teardown.delete(element);
        predicates.delete(element);
    },
    mounted: async (element, {value}) => update(element, value),
    updated: async (element, {value, oldValue}) => {
        if (value !== oldValue) {
            await update(element, value);
        }
    },
};
