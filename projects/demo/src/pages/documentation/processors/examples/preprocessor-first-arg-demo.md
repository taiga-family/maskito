```ts
type firstArgDemo = {
  // current input's element state BEFORE any changes are applied
  elementState: {
    value: string;
    selection: [from: number, to: number];
  };
  // new typed characters which is going to be inserted to the element
  data: string; // can be empty string if it is deletion or validation
};
```
