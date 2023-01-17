```ts
interface ElementState {
  value: string; // the value of an masked <input> or <textarea>
  selection: [
    from: number, // The 0-based index of the first selected character
    to: number, // The 0-based index of the character after the last selected character
  ];
}
```
