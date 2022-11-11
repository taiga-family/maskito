export function isFixedCharacter(char: RegExp | string): char is string {
    return typeof char === 'string';
}
