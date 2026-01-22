import"./chunk-TIC6Q35B.js";var n=`\`\`\`tsx
import {useMaskito} from '@maskito/react';

const options: MaskitoOptions = {
  mask: /^\\d+$/,
};

function App() {
  const anyExternalRef = useRef(null);
  const maskitoRef = useMaskito({options});

  return (
    <input
      ref={(node) => {
        maskitoRef(node);
        anyExternalRef.current = node;
      }}
    />
  );
}
\`\`\`
`;export{n as default};
