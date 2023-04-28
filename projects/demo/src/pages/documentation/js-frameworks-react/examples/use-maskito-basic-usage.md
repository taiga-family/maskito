```tsx
import type {MaskitoOptions} from '@maskito/core';
import {useMaskito} from '@maskito/react';

const digitsOnlyMask: MaskitoOptions = {
  mask: /^\d+$/,
};

const App = () => {
  const inputRef = useMaskito({options: digitsOnlyMask});
  const textareaRef = useMaskito({options: digitsOnlyMask});

  return (
    <>
      <input ref={inputRef} />
      <textarea ref={textareaRef} />
    </>
  );
};
```
