export function padIncompleteDateSegment({
    dateString,
    dateModeTemplate,
    dateSeparator,
}: {
    dateString: string;
    dateModeTemplate: string;
    dateSeparator: string;
}): string {
    const dateSegments = dateString.split(dateSeparator);
    const segmentIndex = dateSegments.length - 1;
    const segment = dateSegments[segmentIndex] ?? '';
    const templateSegment = dateModeTemplate.includes('d')
        ? dateModeTemplate.split(dateSeparator)[segmentIndex]
        : undefined;

    return templateSegment && !templateSegment.includes('y') && /^[1-9]$/.test(segment)
        ? `${dateString.slice(0, -segment.length)}${segment.padStart(templateSegment.length, '0')}`
        : dateString;
}
