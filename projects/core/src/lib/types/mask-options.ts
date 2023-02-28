import {ElementState} from './element-state';
import {MaskPostprocessor, MaskPreprocessor} from './mask-processors';

export type MaskExpression = Array<RegExp | string> | RegExp;

export interface MaskitoOptions {
    readonly mask: MaskExpression | ((elementState: ElementState) => MaskExpression);
    readonly preprocessor?: MaskPreprocessor;
    readonly postprocessor?: MaskPostprocessor;
    readonly overwriteMode?:
        | 'replace'
        | 'shift'
        | ((elementState: ElementState) => 'replace' | 'shift');
}
