import {ElementState} from './element-state';

export type MaskExpression = Array<RegExp | string> | RegExp;

export type MaskitoMask =
    | MaskExpression
    | ((elementState: ElementState) => MaskExpression);
