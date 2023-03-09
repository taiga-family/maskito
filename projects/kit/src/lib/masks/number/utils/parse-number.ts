export function maskitoParseNumber(
    maskedNumber: string,
    decimalSeparator: string = '.',
): number {
    return Number(
        maskedNumber
            .replace(new RegExp(`[^\\d\\${decimalSeparator}]`, 'g'), '')
            .replace(decimalSeparator, '.'),
    );
}
