export function selectTemplate({
    currentTemplate,
    newTemplate,
    currentPhoneLength,
    newPhoneLength,
}: {
    currentTemplate: string;
    newTemplate: string;
    currentPhoneLength: number;
    newPhoneLength: number;
}): string {
    return newTemplate.length < currentTemplate.length &&
        newPhoneLength > currentPhoneLength
        ? currentTemplate
        : newTemplate;
}
