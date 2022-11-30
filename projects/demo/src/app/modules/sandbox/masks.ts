export const INPUT_NUMBER_MASK = /^\d+(\.\d*)?$/;
export const INPUT_PHONE_MASK = [
    '+',
    '7',
    ' ',
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
];
export const NO_CYRILLIC_MASK = /^[^а-яё]+$/i;
