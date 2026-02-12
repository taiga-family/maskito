import type {MaskitoOptions} from '@maskito/core';

const MAX_OCTET_VALUE = 255;
const MAX_OCTET_LENGTH = 3;
const MAX_OCTETS = 4;
const SEPARATOR = '.';
const DIGIT = /\d/;

export default {
    mask: ({value}) => {
        const octets = value
            .split(new RegExp(`(\\${SEPARATOR}|${DIGIT.source}{${MAX_OCTET_LENGTH}})`))
            .filter((x) => x && x !== SEPARATOR);

        return octets
            .map((octet, i) => {
                const length = Math.max(1, Math.min(MAX_OCTET_LENGTH, octet.length));
                const group = Array.from({length}, () => DIGIT);
                const last = i === octets.length - 1;

                return last ? group : [...group, SEPARATOR];
            })
            .concat([octets.length ? [SEPARATOR, DIGIT] : [DIGIT]])
            .slice(0, MAX_OCTETS)
            .flat();
    },
    postprocessors: [
        ({value, selection}) => ({
            value: value
                .split(SEPARATOR)
                .map((v) => (Number(v) > MAX_OCTET_VALUE ? String(MAX_OCTET_VALUE) : v))
                .join(SEPARATOR),
            selection,
        }),
    ],
} satisfies MaskitoOptions;
