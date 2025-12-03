import"./chunk-ENRHZQ2S.js";var o=`\`\`\`ts
import {Maskito, maskitoInitialCalibrationPlugin} from '@maskito/core';

const maskedInput = new Maskito(element, {
  mask: /^\\d+$/,
  preprocessors: [preprocessor1, preprocessor2],
  postprocessors: [
    ({value, selection}) => {
      // ...
    },
  ],
  plugins: [myCustomPlugin, maskitoInitialCalibrationPlugin()],
  overwriteMode: 'shift',
});

// Call it when the element is destroyed
maskedInput.destroy();
\`\`\`
`;export{o as default};
