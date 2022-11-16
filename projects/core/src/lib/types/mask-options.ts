export type MaskExpression = Array<RegExp | string> | RegExp;

export interface MaskitoOptions {
    mask: MaskExpression | (() => MaskExpression);
}
