import {describe, expect, it} from '@jest/globals';

import {toHalfWidthColon} from '../to-half-width-colon';

describe('`toHalfWidthColon` utility converts full width colon to half width colon', () => {
    it('： => :', () => {
        expect(toHalfWidthColon('：')).toBe(':');
    });
});
