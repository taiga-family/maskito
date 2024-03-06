import type {ElementState} from './element-state';

export type MaskitoMaskExpression = Array<RegExp | string> | RegExp;

export type MaskitoMask =
    | MaskitoMaskExpression
    | ((elementState: ElementState) => MaskitoMaskExpression);
