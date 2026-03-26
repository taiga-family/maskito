```ts
maskitoParseNumber('-42'); // -42 ✅
maskitoParseNumber('> -42'); // 42 ❌
maskitoParseNumber('> -42', {prefix: '> '}); // -42 ✅
```
