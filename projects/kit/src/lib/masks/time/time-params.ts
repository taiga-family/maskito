import type {MaskitoTimeMode, MaskitoTimeSegments} from '../../types';

export interface MaskitoTimeParams {
    readonly mode: MaskitoTimeMode;
    readonly timeSegmentMaxValues?: Partial<MaskitoTimeSegments<number>>;
    readonly timeSegmentMinValues?: Partial<MaskitoTimeSegments<number>>;
    readonly step?: number;
    readonly prefix?: string;
    readonly postfix?: string;
}
