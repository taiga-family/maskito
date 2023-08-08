import {DEFAULT_DECIMAL_PSEUDO_SEPARATORS} from '../../../../constants';
import {validateDecimalPseudoSeparators} from '../validate-decimal-pseudo-separators';

describe('validate decimal pseudo separators or return default', () => {
    it('should return no empty array if decimalPseudoSeparators === `undefined`', () => {
        expect(
            validateDecimalPseudoSeparators({
                decimalSeparator: ',',
                thousandSeparator: ' ',
            }),
        ).toEqual(DEFAULT_DECIMAL_PSEUDO_SEPARATORS.filter(char => char !== ','));
    });

    it('should exclude decimalSeparator and thousandSeparator from decimalPseudoSeparators', () => {
        const decimalPseudoSeparators = [',', '.', 'a', 'b'];
        const decimalSeparator = 'a';
        const thousandSeparator = 'b';

        expect(
            validateDecimalPseudoSeparators({
                decimalSeparator,
                thousandSeparator,
                decimalPseudoSeparators,
            }),
        ).toEqual([',', '.']);
    });

    it('should return original decimalPseudoSeparators', () => {
        const decimalPseudoSeparators = [',', 'б', 'ю'];
        const decimalSeparator = '.';
        const thousandSeparator = ' ';

        expect(
            validateDecimalPseudoSeparators({
                decimalSeparator,
                thousandSeparator,
                decimalPseudoSeparators,
            }),
        ).toEqual(decimalPseudoSeparators);
    });
});
