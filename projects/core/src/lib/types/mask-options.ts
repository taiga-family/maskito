import {ElementState} from './element-state';
import {MaskitoMask} from './mask';
import {MaskitoPostprocessor, MaskitoPreprocessor} from './mask-processors';
import {MaskitoPlugin} from './plugin';

export interface MaskitoOptions {
    readonly mask: MaskitoMask;
    /**
     * @deprecated Use property {@link preprocessors}
     * TODO: delete it in 1.x.x
     */
    readonly preprocessor?: MaskitoPreprocessor;
    readonly preprocessors?: readonly MaskitoPreprocessor[];
    /**
     * @deprecated Use property {@link postprocessors}
     * TODO: delete it in 1.x.x
     */
    readonly postprocessor?: MaskitoPostprocessor;
    readonly postprocessors?: readonly MaskitoPostprocessor[];
    readonly plugins?: readonly MaskitoPlugin[];
    readonly overwriteMode?:
        | 'replace'
        | 'shift'
        | ((elementState: ElementState) => 'replace' | 'shift');
}
