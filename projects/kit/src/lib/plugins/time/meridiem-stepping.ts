import {type MaskitoPlugin, maskitoUpdateElement} from '@maskito/core';

import {ANY_MERIDIEM_CHARACTER_RE, CHAR_NO_BREAK_SPACE} from '../../constants';

export function createMeridiemSteppingPlugin(meridiemStartIndex: number): MaskitoPlugin {
    if (meridiemStartIndex < 0) {
        return () => {};
    }

    return (element) => {
        const listener = (event: KeyboardEvent): void => {
            const caretIndex = Number(element.selectionStart);
            const value = element.value.toUpperCase();

            if (
                (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') ||
                caretIndex < meridiemStartIndex
            ) {
                return;
            }

            event.preventDefault();

            /* eslint-disable no-nested-ternary */
            const meridiemMainCharacter = value.includes('A')
                ? 'P'
                : value.includes('P')
                  ? 'A'
                  : event.key === 'ArrowDown'
                    ? 'P'
                    : 'A';
            const newMeridiem = `${CHAR_NO_BREAK_SPACE}${meridiemMainCharacter}M`;

            maskitoUpdateElement(element, {
                value:
                    value.length === meridiemStartIndex
                        ? value + newMeridiem
                        : value.replace(ANY_MERIDIEM_CHARACTER_RE, newMeridiem),
                selection: [caretIndex, caretIndex],
            });
        };

        element.addEventListener('keydown', listener);

        return () => element.removeEventListener('keydown', listener);
    };
}
