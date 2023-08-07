import {DEFAULT_PSEUDO_SEPARATORS} from '../../../../constants';
import {validatePseudoSeparators} from '../validate-pseudo-separators';

describe('validate decimal pseudo separators or return default', () => {
    it('should return no empty array if decimalPseudoSeparators === `undefined`', () => {
        expect(
            validatePseudoSeparators({decimalSeparator: ',', thousandSeparator: ' '}),
        ).toEqual(DEFAULT_PSEUDO_SEPARATORS.filter(char => char !== ','));
    });

    it('should exclude decimalSeparator and thousandSeparator from decimalPseudoSeparators', () => {
        const decimalPseudoSeparators = [',', '.', 'a', 'b'];
        const decimalSeparator = 'a';
        const thousandSeparator = 'b';

        expect(
            validatePseudoSeparators({
                decimalSeparator,
                thousandSeparator,
                decimalPseudoSeparators,
            }),
        ).toEqual(
            decimalPseudoSeparators.filter(
                char => char !== decimalSeparator && char !== thousandSeparator,
            ),
        );
    });

    it('should return original decimalPseudoSeparators', () => {
        const decimalPseudoSeparators = [',', 'б', 'ю'];
        const decimalSeparator = '.';
        const thousandSeparator = ' ';

        expect(
            validatePseudoSeparators({
                decimalSeparator,
                thousandSeparator,
                decimalPseudoSeparators,
            }),
        ).toEqual(decimalPseudoSeparators);
    });
});
