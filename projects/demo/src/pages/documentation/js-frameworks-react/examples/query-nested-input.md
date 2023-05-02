```tsx
import type {MaskitoElementPredicate} from '@maskito/core';
import {maskitoDateOptionsGenerator} from '@maskito/kit';
import {useMaskito} from '@maskito/react';
import {AwesomeInput} from '@awesome-ui-kit/input';

const options = maskitoDateOptionsGenerator({
  mode: 'dd/mm/yyyy',
});

const predicate: MaskitoElementPredicate = host => host.querySelector('input[id="my-input"]')!;

const App = () => {
  const inputRef = useMaskito({options, predicate});

  return <AwesomeInput ref={inputRef} />;
};
```
