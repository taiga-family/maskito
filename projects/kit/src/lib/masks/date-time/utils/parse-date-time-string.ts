export function parseDateTimeString(
    dateTime: string,
    dateModeTemplate: string,
): string[] {
    const hasSeparator = dateTime.includes(', ');

    return [
        dateTime.slice(0, dateModeTemplate.length),
        dateTime.slice(
            hasSeparator
                ? dateModeTemplate.length + ', '.length
                : dateModeTemplate.length,
        ),
    ];
}
