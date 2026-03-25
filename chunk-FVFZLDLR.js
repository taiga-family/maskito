import"./chunk-TIC6Q35B.js";var e=`import {maskitoNumberOptionsGenerator, type MaskitoNumberParams} from '@maskito/kit';

export const intlPattern = (
    locale: string,
): MaskitoNumberParams['thousandSeparatorPattern'] => {
    const formatter = new Intl.NumberFormat(locale, {maximumFractionDigits: 0});

    return (digits: string): readonly string[] => {
        if (!digits) {
            return [];
        }

        let pos = 0;

        return formatter
            .formatToParts(BigInt(\`1\${'0'.repeat(digits.length - 1)}\`))
            .filter((part) => part.type === 'integer')
            .map((part) => {
                const group = digits.slice(pos, pos + part.value.length);

                pos += part.value.length;

                return group;
            });
    };
};

export default maskitoNumberOptionsGenerator({
    prefix: '\u20B9',
    thousandSeparator: ',',
    thousandSeparatorPattern: intlPattern('en-IN'),
});
`;export{e as default};
