import type {ElementState} from '../../../types';

export function guessValidValueByRegExp(
    {value, selection}: ElementState,
    maskRegExp: RegExp,
): ElementState {
    const [from, to] = selection;
    let newFrom = from;
    let newTo = to;

    const validatedValue = Array.from(value).reduce((validatedValuePart, char, i) => {
        const newPossibleValue = validatedValuePart + char;

        if (from === i) {
            newFrom = validatedValuePart.length;
        }

        if (to === i) {
            newTo = validatedValuePart.length;
        }

        return newPossibleValue.match(maskRegExp) ? newPossibleValue : validatedValuePart;
    }, '');

    if (newFrom > validatedValue.length) {
        newFrom = validatedValue.length;
    }

    if (newTo > validatedValue.length) {
        newTo = validatedValue.length;
    }

    return {value: validatedValue, selection: [newFrom, newTo]};
}
