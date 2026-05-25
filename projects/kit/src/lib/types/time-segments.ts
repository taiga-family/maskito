/**
 * TODO(v6): use naming from Intl
 * ```ts
 * export type MaskitoTimeSegments<T = string> = Record<
 *  keyof Pick<
 *      Intl.DateTimeFormatPartTypesRegistry,
 *      'fractionalSecond' | 'hour' | 'minute' | 'second'
 *  >,
 *  T
 * >;
 * ```
 */
export interface MaskitoTimeSegments<T = string> {
    hours: T;
    minutes: T;
    seconds: T;
    milliseconds: T;
}
