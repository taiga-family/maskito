export function parseDateRangeString(
    dateRange: string,
    dateModeTemplate: string,
    datesSeparator: string,
): string[] {
    const digitsInDate = dateModeTemplate.replace(/\W/g, '').length;

    return (
        dateRange
            .replace(datesSeparator, '')
            .match(new RegExp(`(\\D*\\d[^\\d\\s]*){1,${digitsInDate}}`, 'g')) || []
    );
}
