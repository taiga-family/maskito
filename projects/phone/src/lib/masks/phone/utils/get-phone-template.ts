import {AsYouType} from 'libphonenumber-js/core';

export function getPhoneTemplate(formatter: AsYouType, value: string): string {
    formatter.input(value.replace(/[\s\-()[\]{}]/g, ''));

    const initialTemplate = formatter.getTemplate();
    const split = initialTemplate.split(' ');
    const template =
        split.length > 1
            ? `${split.slice(0, 2).join(' ')} ${split.slice(2).join('-')}`
            : initialTemplate;

    formatter.reset();

    return template.trim();
}
