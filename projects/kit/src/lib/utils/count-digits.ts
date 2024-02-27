export function countDigits(str: string): number {
    return str.replaceAll(/\W/g, '').length;
}
