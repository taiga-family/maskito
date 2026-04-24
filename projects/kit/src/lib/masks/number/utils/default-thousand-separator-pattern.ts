export const DEFAULT_THOUSAND_SEPARATOR_PATTERN = (digits: string): readonly string[] =>
    digits.match(/\d{1,3}(?=(?:\d{3})*$)/g) ?? [];
