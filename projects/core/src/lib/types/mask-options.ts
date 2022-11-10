export type MaskExpression = Array<RegExp | string> | RegExp;

export interface MaskOptions {
    mask: MaskExpression | (() => MaskExpression);
}
