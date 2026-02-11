import type {MaskitoOptions, MaskitoPreprocessor} from '@maskito/core';

const maxOctetValue = 255;
const maxOctetLength = 3;
const octetChunk = new RegExp(`.{1,${maxOctetLength}}`, 'g');
const maxOctets = 4;
const separator = '.';
const digit = /\d/;

const autoInsertSeparatorsPreprocessor: MaskitoPreprocessor = (
    {elementState, data},
    actionType,
) => {
    if (actionType !== 'insert') {
        return {elementState, data};
    }

    return {
        elementState,
        data: data
            .split(separator)
            .map((segment) => (segment.match(octetChunk) || []).join(separator))
            .join(separator),
    };
};

const preventSeparatorDeletionPreprocessor: MaskitoPreprocessor = (
    {elementState, data},
    actionType,
) => {
    const {value, selection} = elementState;
    const [from, to] = selection;
    const selectedChar = value.slice(from, to);

    if (selectedChar !== separator) {
        return {elementState, data};
    }

    if (actionType === 'deleteForward') {
        return {elementState: {value, selection: [to, to]}, data};
    }

    if (actionType === 'deleteBackward' && to < value.length) {
        return {elementState: {value, selection: [from, from]}, data};
    }

    return {elementState, data};
};

export default {
    preprocessors: [
        autoInsertSeparatorsPreprocessor,
        preventSeparatorDeletionPreprocessor,
    ],
    mask: ({value}) => {
        const octets = value.split(separator).filter(Boolean);

        return octets
            .map((octet, i) => {
                const length = Math.max(1, Math.min(maxOctetLength, octet.length));
                const group = Array.from({length}, () => digit);
                const last = i === octets.length - 1;

                return last ? group : [...group, separator];
            })
            .concat([octets.length ? [separator, digit] : [digit]])
            .slice(0, maxOctets)
            .flat();
    },
    postprocessors: [
        ({value, selection}) => ({
            value: value
                .split(separator)
                .map((v) => (Number(v) > maxOctetValue ? String(maxOctetValue) : v))
                .join(separator),
            selection,
        }),
    ],
} satisfies MaskitoOptions;
