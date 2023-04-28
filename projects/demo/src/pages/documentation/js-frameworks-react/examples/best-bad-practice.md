```ts
// Best Practice ✅
useMaskito({
  options: maskitoOptions,
  elementPredicate: predicate,
});

// Anti-Pattern ❌
useMaskito({
  options: {mask: /^.*$/},
  elementPredicate: () => e.querySelector('input#my-input'),
});
```
