export function isCalendarDate(template: string, separator: string): boolean {
    return template !== `dd${separator}mm` && template !== `mm${separator}dd`;
}
