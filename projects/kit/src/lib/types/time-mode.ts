export type MaskitoTimeMode =
    | 'HH AA'
    | 'HH:MM AA'
    | 'HH:MM:SS AA'
    | 'HH:MM:SS.MSS AA'
    | 'HH:MM:SS.MSS'
    | 'HH:MM:SS'
    | 'HH:MM'
    | 'HH'
    | 'MM:SS.MSS'
    | 'MM:SS'
    | 'MM.SS.MSS' // TODO(v4): delete
    | 'SS.MSS';
