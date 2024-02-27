/**
 * Replace fullwidth numbers with half width number
 * @param fullWidthNumber full width number
 * @returns processed half width number
 */
export function toHalfWidthNumber(fullWidthNumber: string): string {
    return fullWidthNumber.replaceAll(/[０-９]/g, s =>
        String.fromCharCode(s.charCodeAt(0) - 0xfee0),
    );
}
