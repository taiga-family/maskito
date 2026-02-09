import type {MaskitoOptions} from '@maskito/core';

const maxOctetValue = 255;
const separator = '.';

export default {
    mask: ({value}) => {
        const octets = value.split(separator);

        return octets.flatMap((octet, i) => {
            const length = Math.max(1, Math.min(3, octet.length));
            const group = Array.from({length}, () => /\d/);

            return i < 3 ? [...group, separator] : group;
        });
    },
    postprocessors: [
        ({value, selection}) => {
            return {
                value: value
                    .split(separator)
                    .map((v) => (Number(v) > maxOctetValue ? String(maxOctetValue) : v))
                    .join(separator),
                selection,
            };
        },
    ],
} satisfies MaskitoOptions;
