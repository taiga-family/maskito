```html
<!-- Best Practice ✅-->
<input v-maskito="options" />

<!-- Anti-Pattern ❌-->
<input v-maskito="{ mask: /^\d+$/ }" />
```
