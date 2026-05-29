import {type MaskitoPlugin, maskitoUpdateElement} from '@maskito/core';

import {CHAR_NO_BREAK_SPACE} from '../../constants';
import {type MaskitoTimeParams} from '../../masks/time';
import {noop} from '../../utils';
import {createDayPeriodMatchers, hasDayPeriod} from '../../utils/time';

export function createMeridiemSteppingPlugin({
    dayPeriod,
    meridiemStartIndex,
}: Pick<Required<MaskitoTimeParams>, 'dayPeriod'> & {
    meridiemStartIndex: number;
}): MaskitoPlugin {
    if (meridiemStartIndex < 0 || !hasDayPeriod(dayPeriod)) {
        return noop;
    }

    const {anyDayPeriodCharRE} = createDayPeriodMatchers(dayPeriod);
    const [am, pm] = dayPeriod;

    return (element) => {
        const listener = (event: KeyboardEvent): void => {
            const caretIndex = Number(element.selectionStart);
            const {value} = element;

            if (
                (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') ||
                caretIndex < meridiemStartIndex
            ) {
                return;
            }

            event.preventDefault();

            // eslint-disable-next-line no-nested-ternary
            const nextMeridiem = value.toLowerCase().includes(am.toLowerCase())
                ? pm
                : value.toLowerCase().includes(pm.toLowerCase()) ||
                    event.key === 'ArrowUp'
                  ? am
                  : pm;

            const newMeridiem = `${CHAR_NO_BREAK_SPACE}${nextMeridiem}`;

            maskitoUpdateElement(element, {
                value:
                    value.length === meridiemStartIndex
                        ? `${value}${newMeridiem}`
                        : value.replace(anyDayPeriodCharRE, newMeridiem),
                selection: [caretIndex, caretIndex],
            });
        };

        element.addEventListener('keydown', listener);

        return () => element.removeEventListener('keydown', listener);
    };
}
