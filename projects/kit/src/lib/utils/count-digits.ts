export function countDigits(str: string): number {
    return str.replace(/\W/g, '').length;
}
