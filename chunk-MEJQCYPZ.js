import"./chunk-TIC6Q35B.js";var i=`\`\`\`ts
// Best Practice \u2705
useMaskito({
  options: maskitoOptions,
  elementPredicate: predicate,
});

// Anti-Pattern \u274C
useMaskito({
  options: {mask: /^.*$/},
  elementPredicate: () => e.querySelector('input#my-input'),
});
\`\`\`
`;export{i as default};
