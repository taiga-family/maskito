export function getDefaultPseudoSeparators(
    decimalSeparator: string,
    thousandSeparator: string,
): string[] {
    return decimalSeparator === ',' || decimalSeparator === '.'
        ? ['.', ',', 'б', 'ю'].filter(
              char => char !== thousandSeparator && char !== decimalSeparator,
          )
        : [];
}
