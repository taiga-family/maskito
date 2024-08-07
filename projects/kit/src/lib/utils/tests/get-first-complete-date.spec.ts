import {describe, expect, it} from '@jest/globals';

import {getFirstCompleteDate} from '../date/get-first-complete-date';

describe('getFirstCompleteDate', () => {
    it('should return the first complete date', () => {
        expect(getFirstCompleteDate('01.01.2000-11.11.2000', 'DD.MM.YYYY')).toBe(
            '01.01.2000',
        );
        expect(getFirstCompleteDate('01.2000-11.2000', 'MM.YYYY')).toBe('01.2000');
        expect(getFirstCompleteDate('01.01.2000,23:59', 'DD.MM.YYYY')).toBe('01.01.2000');
    });

    it('should return empty string if no complete date', () => {
        expect(getFirstCompleteDate('01.01.20', 'DD.MM.YYYY')).toBe('');
        expect(getFirstCompleteDate('01.01.200', 'DD.MM.YYYY HH:mm')).toBe('');
    });

    it('should return empty string if no date', () => {
        expect(getFirstCompleteDate('', 'DD.MM.YYYY')).toBe('');
    });
});
