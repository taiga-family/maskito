import {getDateSegmentValueLength} from '../date-segment-value-length';

describe('getDateSegmentValueLength', () => {
    it('short date', () => {
        expect(getDateSegmentValueLength('mm.yy')).toEqual({day: 0, month: 2, year: 2});
    });

    it('full date', () => {
        expect(getDateSegmentValueLength('dd.mm.yyyy')).toEqual({
            day: 2,
            month: 2,
            year: 4,
        });
    });
});
