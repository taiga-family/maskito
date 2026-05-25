export type MaskitoTimeMode =
    | 'HH AA' // TODO(v6): delete in favor of `dayPeriod` property
    | 'HH:MM AA' // TODO(v6): delete in favor of `dayPeriod` property
    | 'HH:MM:SS AA' // TODO(v6): delete in favor of `dayPeriod` property
    | 'HH:MM:SS.MSS AA' // TODO(v6): delete in favor of `dayPeriod` property
    | 'HH:MM:SS.MSS'
    | 'HH:MM:SS'
    | 'HH:MM'
    | 'HH'
    | 'MM:SS.MSS'
    | 'MM:SS'
    | 'SS.MSS';
