import {MaskExpression} from '@maskito/core';

import {TEMPLATE_FILLER} from '../constants';

export function generatePhoneMask({
    value,
    template,
    prefix,
}: {
    value: string;
    template: string;
    prefix: string;
}): MaskExpression {
    return [
        ...prefix.split(''),
        ...(template
            ? template
                  .slice(prefix.length)
                  .split('')
                  .map(сhar =>
                      сhar === TEMPLATE_FILLER || /\d/.test(сhar) ? /\d/ : сhar,
                  )
            : new Array(Math.max(value.length - prefix.length, prefix.length)).fill(
                  /\d/,
              )),
    ];
}
