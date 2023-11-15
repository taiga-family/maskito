import {parseDateRangeString} from '../parse-date-range-string';

describe('parseDateRangeString', () => {
    const tests = [
        ['13.02', ['13.02']],
        ['13.02.', ['13.02.']],
        ['13.02.2023', ['13.02.2023']],
        ['13.02.2023 ', ['13.02.2023']],
        ['13.02.2023 –', ['13.02.2023']],
        ['13.02.2023 – ', ['13.02.2023']],
        ['13.02.2023 – 14', ['13.02.2023', '14']],
        ['13.02.2023 – 14.', ['13.02.2023', '14.']],
        ['13.02.2023 – 14.03.2025', ['13.02.2023', '14.03.2025']],
        ['13.02.202314.03.2025', ['13.02.2023', '14.03.2025']],
        ['13.02.202314032025', ['13.02.2023', '14032025']],
        ['1302202314032025', ['13022023', '14032025']],
    ] as const;

    tests.forEach(([dateRangeString, expectedParsedDates]) => {
        it(`${dateRangeString} => ${JSON.stringify(expectedParsedDates)}`, () => {
            expect(parseDateRangeString(dateRangeString, 'dd.mm.yyyy', ' – ')).toEqual(
                expectedParsedDates,
            );
        });
    });
});
