import type {ElementState} from './element-state';
import type {MaskitoMask} from './mask';
import type {MaskitoPostprocessor, MaskitoPreprocessor} from './mask-processors';
import type {MaskitoPlugin} from './plugin';

export interface MaskitoOptions {
    readonly mask: MaskitoMask;
    readonly preprocessors?: readonly MaskitoPreprocessor[];
    readonly postprocessors?: readonly MaskitoPostprocessor[];
    readonly plugins?: readonly MaskitoPlugin[];
    readonly overwriteMode?:
        | 'replace'
        | 'shift'
        | ((elementState: ElementState) => 'replace' | 'shift');
}
