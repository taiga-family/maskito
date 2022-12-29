export function getDefaultPseudoSeparators({
    decimalSeparator,
    thousandSeparator,
}: {
    decimalSeparator: string;
    thousandSeparator: string;
}): string[] {
    if (decimalSeparator === ',' || decimalSeparator === '.') {
        return ['.', 'б', 'ю'].filter(char => char !== thousandSeparator);
    }

    return [];
}
