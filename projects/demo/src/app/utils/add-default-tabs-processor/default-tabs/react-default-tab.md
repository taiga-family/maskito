```tsx
import * as React from 'react';
import {useMaskito} from '@maskito/react';

import options from './mask';

export default function App() {
  const maskedInputRef = useMaskito({options});

  return <input ref={maskedInputRef} />;
}
```
