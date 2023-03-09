import {KeyboardKeys} from '../../types';

export function isEventProducingCharacter({
    key,
    ctrlKey,
    metaKey,
    altKey,
}: KeyboardEvent): boolean {
    const isSystemKeyCombinations = ctrlKey || metaKey || altKey;
    const isSingleUnicodeChar = /^.$/u.test(key); // 4-byte characters case (e.g. smile)

    return !isSystemKeyCombinations && key !== 'Backspace' && isSingleUnicodeChar;
}
