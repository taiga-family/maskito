export function isDateStringComplete(
    dateString: string,
    dateModeTemplate: string,
): boolean {
    if (dateString.length < dateModeTemplate.length) {
        return false;
    }

    return dateString.split(/\D/).every((segment) => !segment.match(/^0+$/));
}
