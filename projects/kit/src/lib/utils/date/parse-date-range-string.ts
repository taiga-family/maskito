import {countDigits} from '../count-digits';

export function parseDateRangeString(
    dateRange: string,
    dateModeTemplate: string,
    rangeSeparator: string,
): string[] {
    const digitsInDate = countDigits(dateModeTemplate);

    return (
        dateRange
            .replace(rangeSeparator, '')
            .match(new RegExp(`(\\D*\\d[^\\d\\s]*){1,${digitsInDate}}`, 'g')) || []
    );
}
