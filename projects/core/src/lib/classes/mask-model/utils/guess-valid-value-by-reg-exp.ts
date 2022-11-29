import {ElementState} from '../../../types';

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

    return {value: validatedValue, selection: [newFrom, newTo]};
}
