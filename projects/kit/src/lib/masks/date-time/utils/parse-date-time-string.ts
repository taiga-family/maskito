export function parseDateTimeString(
    dateTime: string,
    {
        dateModeTemplate,
        dateTimeSeparator,
    }: {
        dateModeTemplate: string;
        dateTimeSeparator: string;
    },
): [date: string, time: string] {
    const hasSeparator = dateTime.includes(dateTimeSeparator);

    return [
        dateTime.slice(0, dateModeTemplate.length),
        dateTime.slice(
            hasSeparator
                ? dateModeTemplate.length + dateTimeSeparator.length
                : dateModeTemplate.length,
        ),
    ];
}
