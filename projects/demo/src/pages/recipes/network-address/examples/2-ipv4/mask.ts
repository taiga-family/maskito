import type {MaskitoOptions, MaskitoPreprocessor} from '@maskito/core';

const MAX_OCTET_VALUE = 255;
const MAX_OCTET_LENGTH = 3;
const OCTET_CHUNK = new RegExp(`.{1,${MAX_OCTET_LENGTH}}`, 'g');
const MAX_OCTETS = 4;
const SEPARATOR = '.';
const DIGIT = /\d/;

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
            .split(SEPARATOR)
            .map((segment) => (segment.match(OCTET_CHUNK) || []).join(SEPARATOR))
            .join(SEPARATOR),
    };
};

const preventSeparatorDeletionPreprocessor: MaskitoPreprocessor = (
    {elementState, data},
    actionType,
) => {
    const {value, selection} = elementState;
    const [from, to] = selection;
    const selectedChar = value.slice(from, to);

    if (selectedChar !== SEPARATOR) {
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
        const octets = value.split(SEPARATOR).filter(Boolean);

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
