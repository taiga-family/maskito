import {toNumberParts} from '../to-number-parts';

describe('toNumberParts', () => {
    it('empty string => empty parts', () => {
        expect(toNumberParts('', '.')).toEqual({
            minus: '',
            integerPart: '',
            decimalPart: '',
        });
    });

    it('123.45 => {minus: "", integerPart: "123", decimalPart: "45"}', () => {
        expect(toNumberParts('123.45', '.')).toEqual({
            minus: '',
            integerPart: '123',
            decimalPart: '45',
        });
    });

    it('-123.45 => {minus: "-", integerPart: "123", decimalPart: "45"}', () => {
        expect(toNumberParts('-123.45', '.')).toEqual({
            minus: '-',
            integerPart: '123',
            decimalPart: '45',
        });
    });

    it('123 => {minus: "", integerPart: "123", decimalPart: ""}', () => {
        expect(toNumberParts('123', '.')).toEqual({
            minus: '',
            integerPart: '123',
            decimalPart: '',
        });
    });

    it('-123 => {minus: "-", integerPart: "123", decimalPart: ""}', () => {
        expect(toNumberParts('-123', '.')).toEqual({
            minus: '-',
            integerPart: '123',
            decimalPart: '',
        });
    });

    it('.45 => {minus: "", integerPart: "", decimalPart: "45"}', () => {
        expect(toNumberParts('.45', '.')).toEqual({
            minus: '',
            integerPart: '',
            decimalPart: '45',
        });
    });

    it('-.45 => {minus: "-", integerPart: "", decimalPart: "45"}', () => {
        expect(toNumberParts('-.45', '.')).toEqual({
            minus: '-',
            integerPart: '',
            decimalPart: '45',
        });
    });

    it('- => {minus: "-", integerPart: "", decimalPart: ""}', () => {
        expect(toNumberParts('-', '.')).toEqual({
            minus: '-',
            integerPart: '',
            decimalPart: '',
        });
    });
});
