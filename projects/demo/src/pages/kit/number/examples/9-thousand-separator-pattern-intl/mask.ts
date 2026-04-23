import {maskitoNumberOptionsGenerator} from '@maskito/kit';

const formatter = new Intl.NumberFormat('en-IN', {maximumFractionDigits: 0});

export default maskitoNumberOptionsGenerator({
    prefix: '₹',
    thousandSeparator: ',',
    thousandSeparatorPattern: (digits: string): readonly string[] => {
        if (!digits) {
            return [];
        }

        let pos = 0;

        return formatter
            .formatToParts(BigInt(`1${'0'.repeat(digits.length - 1)}`))
            .filter((part) => part.type === 'integer')
            .map((part) => {
                const group = digits.slice(pos, pos + part.value.length);

                pos += part.value.length;

                return group;
            });
    },
});
