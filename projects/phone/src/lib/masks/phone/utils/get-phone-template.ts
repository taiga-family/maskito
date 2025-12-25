import type {AsYouType} from 'libphonenumber-js/core';

export function getPhoneTemplate(
    formatter: AsYouType,
    value: string,
    separator: string,
): string {
    const normalizedValue = value && !value.startsWith('+') ? `+${value}` : value;

    formatter.input(normalizedValue.replaceAll(/[^\d+]/g, ''));

    const initialTemplate = formatter.getTemplate();
    const split = initialTemplate.split(' ');
    const template =
        split.length > 1
            ? `${split.slice(0, 2).join(' ')} ${split.slice(2).join(separator)}`
            : initialTemplate;

    formatter.reset();

    return template.trim();
}
