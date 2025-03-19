import type {MaskitoDateParams} from '../../date-params';
import {maskitoParseDate} from '../parse-date';

describe('maskitoParseDate', () => {
    describe('mode = mm/dd/yyyy, separator = default', () => {
        let params: MaskitoDateParams;

        beforeEach(() => {
            params = {
                mode: 'mm/dd/yyyy',
                min: new Date('2004-02-05T00:00:00.000'),
                max: new Date('2024-01-01T00:00:00.000'),
            };
        });

        it('should correctly parse 04/29/2012', () => {
            const parsedDate = maskitoParseDate('04/29/2012', params);

            expect(parsedDate.getTime()).toBe(Date.parse('2012-04-29T00:00:00.000'));
        });

        it('should return min date on 02/04/2004', () => {
            const parsedDate = maskitoParseDate('02/04/2004', params);

            expect(parsedDate.getTime()).toBe(params.min?.getTime());
        });

        it('should return max date on 01/02/2024', () => {
            const parsedDate = maskitoParseDate('01/02/2024', params);

            expect(parsedDate.getTime()).toBe(params.max?.getTime());
        });
    });

    describe('incomplete, mode = mm/dd/yyyy, separator = default', () => {
        let params: MaskitoDateParams;

        beforeEach(() => {
            params = {
                mode: 'mm/dd/yyyy',
                min: new Date('2004-02-05T00:00:00.000'),
                max: new Date('2024-01-01T00:00:00.000'),
            };
        });

        it('should return null, 04/mm/yyyy', () => {
            const parsedDate = maskitoParseDate('04', params);

            expect(parsedDate).toBe(null);
        });

        it('should return null 02/04/yyyy', () => {
            const parsedDate = maskitoParseDate('02/04', params);

            expect(parsedDate).toBe(null);
        });

        it('should return null 01/02/2yyy', () => {
            const parsedDate = maskitoParseDate('01/02/2', params);

            expect(parsedDate).toBe(null);
        });

        it('should return null 01/02/20yy', () => {
            const parsedDate = maskitoParseDate('01/02/20', params);

            expect(parsedDate).toBe(null);
        });

        it('should return null 01/02/202y', () => {
            const parsedDate = maskitoParseDate('01/02/202', params);

            expect(parsedDate).toBe(null);
        });

        it('should return date on 01/02/2024', () => {
            const parsedDate = maskitoParseDate('01/02/2024', params);

            expect(parsedDate.getTime()).toBe(Date.parse('2024-02-01T00:00:00.000'));
        });
    });

    describe('mode = mm/dd/yyyy, separator = -', () => {
        let params: MaskitoDateParams;

        beforeEach(() => {
            params = {
                mode: 'mm/dd/yyyy',
                separator: '-',
                min: new Date('2004-02-28T00:00:00.000'),
                max: new Date('2030-01-01T00:00:00.000'),
            };
        });

        it('should correctly parse 12-31-2020', () => {
            const parsedDate = maskitoParseDate('12-31-2020', params);

            expect(parsedDate.getTime()).toBe(Date.parse('2020-12-31T00:00:00.000'));
        });

        it('should return min date on 02-27-2004', () => {
            const parsedDate = maskitoParseDate('02-27-2004', params);

            expect(parsedDate.getTime()).toBe(params.min?.getTime());
        });

        it('should return max date on 01/02/2030', () => {
            const parsedDate = maskitoParseDate('01/02/2030', params);

            expect(parsedDate.getTime()).toBe(params.max?.getTime());
        });
    });

    describe('mode = mm/yy, separator = :', () => {
        let params: MaskitoDateParams;

        beforeEach(() => {
            params = {
                mode: 'mm/yy',
                separator: ':',
                min: new Date('2004-02-28T00:00:00.000'),
                max: new Date('2030-01-01T00:00:00.000'),
            };
        });

        it('should correctly parse 02:12', () => {
            const parsedDate = maskitoParseDate('02:12', params);

            expect(parsedDate.getTime()).toBe(Date.parse('2012-02-01T00:00:00.000'));
        });

        it('should return min date on 01:03', () => {
            const parsedDate = maskitoParseDate('01:03', params);

            expect(parsedDate.getTime()).toBe(params.min?.getTime());
        });

        it('should return max date on 02:31', () => {
            const parsedDate = maskitoParseDate('02:30', params);

            expect(parsedDate.getTime()).toBe(params.max?.getTime());
        });
    });

    describe('mode = yyyy/mm, separator = .', () => {
        let params: MaskitoDateParams;

        beforeEach(() => {
            params = {
                mode: 'yyyy/mm',
                separator: '.',
                min: new Date('2004-02-28T00:00:00.000'),
                max: new Date('2030-01-01T00:00:00.000'),
            };
        });

        it('should correctly parse 2012.08', () => {
            const parsedDate = maskitoParseDate('2012.08', params);

            expect(parsedDate.getTime()).toBe(Date.parse('2012-08-01T00:00:00.000'));
        });

        it('should return min date on 1991.01', () => {
            const parsedDate = maskitoParseDate('1991.01', params);

            expect(parsedDate.getTime()).toBe(params.min?.getTime());
        });

        it('should return max date on 2033.12', () => {
            const parsedDate = maskitoParseDate('2033.12', params);

            expect(parsedDate.getTime()).toBe(params.max?.getTime());
        });
    });
});
