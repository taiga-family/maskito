import"./chunk-ENRHZQ2S.js";var s=`\`\`\`tsx
import {useState} from 'react';
import {useMaskito} from '@maskito/react';

const digitsOnlyMask: MaskitoOptions = {
  mask: /^\\d+$/,
};

function App() {
  const inputRef = useMaskito({options: digitsOnlyMask});
  const [value, setValue] = useState('');

  // Use \`onInput\` handler to build controlled input
  return (
    <input
      ref={inputRef}
      value={value}
      onInput={(e) => setValue(e.currentTarget.value)}
    />
  );
}
\`\`\`
`;export{s as default};
