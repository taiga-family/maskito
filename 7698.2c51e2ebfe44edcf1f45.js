"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[7698],{7698:n=>{n.exports="```ts\nimport {maskitoTransform} from '@maskito/core';\nimport {maskitoNumberOptionsGenerator} from '@maskito/kit';\n\nconst maskitoOptions = maskitoNumberOptionsGenerator({\n  thousandSeparator: ' ',\n});\n\nconst definitelyValidValue = maskitoTransform('1000000', maskitoOptions);\n\nconsole.info(definitelyValidValue); // '1 000 000'\n\n// Framework agnostic way | index.ts\ninputElement.value = definitelyValidValue;\n\n// Angular way | app.component.ts\nthis.formControl.patchValue(definitelyValidValue);\n```\n"}}]);