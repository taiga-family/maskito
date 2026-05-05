export function isDateStringComplete(
    dateString: string,
    dateModeTemplate: string,
): boolean {
    return dateString.length < dateModeTemplate.length
        ? false
        : dateString.split(/\D/).every((segment) => !/^0+$/.exec(segment));
}
