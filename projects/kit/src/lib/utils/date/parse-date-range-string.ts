export function parseDateRangeString(
    dateRange: string,
    dateModeTemplate: string,
    rangeSeparator: string,
): string[] {
    const digitsInDate = dateModeTemplate.replace(/\W/g, '').length;

    return (
        dateRange
            .replace(rangeSeparator, '')
            .match(new RegExp(`(\\D*\\d[^\\d\\s]*){1,${digitsInDate}}`, 'g')) || []
    );
}
