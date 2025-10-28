import"./chunk-6M32EY24.js";var i=`import type {MaskitoOptions} from '@maskito/core';
import {maskitoRejectEvent} from '@maskito/kit';

const maskitoOptions: MaskitoOptions = {
    mask: /^\\d{0,3}$/,
    plugins: [
        maskitoRejectEvent,
        (element) => {
            element.style.animation = '0.3s 1';

            let reject = -1;
            const listener = (): void => {
                reject += 1;
                element.style.animationName = \`reject-\${reject % 2}\`;
            };

            element.addEventListener('maskitoReject', listener);

            return () => element.removeEventListener('maskitoReject', listener);
        },
    ],
};

export default maskitoOptions;
`;export{i as default};
