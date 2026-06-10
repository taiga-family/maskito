const DIGIT_REGEXP = /\d/;
const NON_DIGIT_REGEXP = /\D/;

export function skipNonDigitCharacters(
    value: string,
    [from, to]: readonly [number, number],
): readonly [number, number] {
    if (from !== to || from <= 0 || !DIGIT_REGEXP.test(value.charAt(from - 1))) {
        return [from, to];
    }

    let shifted = from;

    while (shifted < value.length && NON_DIGIT_REGEXP.test(value.charAt(shifted))) {
        shifted++;
    }

    return [shifted, shifted];
}
