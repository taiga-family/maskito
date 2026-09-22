import {describe, expect, it} from '@jest/globals';

import {createTimeModeTemplate} from '../create-time-mode-template';

describe('createTimeModeTemplate', () => {
    it('keeps canonical separators for empty array', () => {
        expect(createTimeModeTemplate({mode: 'HH:MM:SS.MSS', separators: []})).toBe(
            'HH:MM:SS.MSS',
        );
    });

    it('replaces separators per position', () => {
        expect(
            createTimeModeTemplate({
                mode: 'HH:MM:SS.MSS',
                separators: [' h ', ' min ', ','],
            }),
        ).toBe('HH h MM min SS,MSS');
    });

    it('falls back to canonical separators for remaining positions', () => {
        expect(createTimeModeTemplate({mode: 'HH:MM:SS.MSS', separators: ['.']})).toBe(
            'HH.MM:SS.MSS',
        );
    });

    it('supports empty string separator', () => {
        expect(createTimeModeTemplate({mode: 'HH:MM', separators: ['']})).toBe('HHMM');
    });

    it('keeps meridiem part of the mode', () => {
        expect(createTimeModeTemplate({mode: 'HH:MM AA', separators: ['.']})).toBe(
            'HH.MM AA',
        );
    });
});
