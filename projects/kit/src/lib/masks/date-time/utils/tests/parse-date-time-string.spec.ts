import {parseDateTimeString} from '../parse-date-time-string';

describe('parseDateTimeString', () => {
    const parse = (value: string): [string, string] =>
        parseDateTimeString(value, 'dd.mm.yyyy');

    (
        [
            {input: '', output: ['', '']},
            {input: '02', output: ['02', '']},
            {input: '02.', output: ['02.', '']},
            {input: '0211', output: ['0211', '']},
            {input: '0211.', output: ['0211.', '']},
            {input: '02.112018', output: ['02.112018', '']},
            {input: '02.112018,', output: ['02.112018', '']},
            {input: '02.112018, ', output: ['02.112018', '']},
            {input: '02.11.2018, ', output: ['02.11.2018', '']},
            {input: '021120181620', output: ['02112018', '1620']},
            {input: '02112018,1620', output: ['02112018', '1620']},
            {input: '02112018, 1620', output: ['02112018', '1620']},
            {input: '02112018, 16:20', output: ['02112018', '16:20']},
            {input: '02112018,16:20', output: ['02112018', '16:20']},
            {input: '02.11.2018,1620', output: ['02.11.2018', '1620']},
            {input: '02.11.2018, 1620', output: ['02.11.2018', '1620']},
            {input: '02.11.2018, 16:20', output: ['02.11.2018', '16:20']},
            {input: '02.11.2018,16:20', output: ['02.11.2018', '16:20']},
        ] as const
    ).forEach(({input, output}) => {
        it(`${input} -> ${JSON.stringify(output)}`, () => {
            expect(parse(input)).toEqual(output);
        });
    });
});
