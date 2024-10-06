import type {ElementState} from './element-state';

export type MaskitoMaskExpression = ReadonlyArray<RegExp | string> | RegExp;

export type MaskitoMask =
    | MaskitoMaskExpression
    | ((elementState: ElementState) => MaskitoMaskExpression);
