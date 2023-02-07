import {isEmpty} from '../is-empty';

describe('isEmpty', () => {
    describe('returns `true` for', () => {
        it('empty object', () => {
            expect(isEmpty({})).toBe(true);
        });

        it('zero-length array', () => {
            expect(isEmpty([])).toBe(true);
        });

        it('null', () => {
            expect(isEmpty(null)).toBe(true);
        });

        it('undefined', () => {
            expect(isEmpty(undefined)).toBe(true);
        });
    });

    describe('returns `false` for', () => {
        it('non-empty object', () => {
            expect(isEmpty({name: ''})).toBe(false);
        });

        it('not zero-length array', () => {
            expect(isEmpty([0])).toBe(false);
        });
    });
});
