import type {MaskitoPostprocessor, MaskitoPreprocessor} from '@maskito/core';

import {CHAR_NO_BREAK_SPACE} from '../constants';
import {identity} from '../utils';
import {createDayPeriodMatchers, hasDayPeriod} from '../utils/time';

export function createMeridiemPreprocessor(
    dayPeriod: readonly [string, string],
): MaskitoPreprocessor {
    if (!hasDayPeriod(dayPeriod)) {
        return identity;
    }

    const {fullDayPeriodRE, initialCharRE} = createDayPeriodMatchers(dayPeriod);
    const [am, pm] = dayPeriod;

    return ({elementState, data}) => {
        const {selection, value} = elementState;

        return value.match(fullDayPeriodRE) && data.match(initialCharRE)
            ? {
                  elementState: {
                      value: value.replaceAll(fullDayPeriodRE, ''),
                      selection,
                  },
                  data: pickMeridiem(data, am, pm),
              }
            : {elementState, data};
    };
}

export function createMeridiemPostprocessor(
    dayPeriod: readonly [string, string],
): MaskitoPostprocessor {
    if (!hasDayPeriod(dayPeriod)) {
        return identity;
    }

    const {anyDayPeriodCharRE, fullDayPeriodRE} = createDayPeriodMatchers(dayPeriod);
    const [am, pm] = dayPeriod;

    return ({value, selection}, initialElementState) => {
        if (
            !value.match(anyDayPeriodCharRE) ||
            dayPeriod.some((x) => value.includes(x))
        ) {
            return {value, selection};
        }

        const [from, to] = selection;

        // any meridiem character was deleted
        if (initialElementState.value.match(fullDayPeriodRE)) {
            const newValue = value.replace(anyDayPeriodCharRE, '');

            return {
                value: newValue,
                selection: [
                    Math.min(from, newValue.length),
                    Math.min(to, newValue.length),
                ],
            };
        }

        const fullMeridiem = `${CHAR_NO_BREAK_SPACE}${pickMeridiem(value, am, pm)}`;

        const newValue = value.replace(anyDayPeriodCharRE, (x) =>
            x === CHAR_NO_BREAK_SPACE ? x : fullMeridiem,
        );

        return {
            value: newValue,
            selection:
                to >= newValue.indexOf(fullMeridiem)
                    ? [newValue.length, newValue.length]
                    : selection,
        };
    };
}

function pickMeridiem(value: string, am: string, pm: string): string {
    const valueLc = value.toLowerCase();

    for (let i = 0; i < Math.min(am.length, pm.length); i++) {
        const amCharLc = am[i]!.toLowerCase();
        const pmCharLc = pm[i]!.toLowerCase();

        if (amCharLc === pmCharLc) {
            continue;
        }

        return valueLc.includes(pmCharLc) ? pm : am;
    }

    return am;
}
