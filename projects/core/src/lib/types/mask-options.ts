import {MaskPostprocessor, MaskPreprocessor} from './mask-processors';

export type MaskExpression = Array<RegExp | string> | RegExp;

export interface MaskitoOptions {
    mask: MaskExpression | (() => MaskExpression);
    preprocessor?: MaskPreprocessor;
    postprocessor?: MaskPostprocessor;
    overwriteMode?: 'shift' | 'replace';
}
