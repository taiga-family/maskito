"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[7296],{7296:n=>{n.exports="import type {MaskitoOptions} from '@maskito/core';\nimport {maskitoUpdateElement} from '@maskito/core';\nimport {\n    maskitoCaretGuard,\n    maskitoEventHandler,\n    maskitoNumberOptionsGenerator,\n} from '@maskito/kit';\n\nexport const postfix = '%';\nconst {plugins, ...numberOptions} = maskitoNumberOptionsGenerator({\n    postfix,\n    min: 0,\n    max: 100,\n    precision: 2,\n});\n\nexport default {\n    ...numberOptions,\n    plugins: [\n        ...plugins,\n        // Forbids caret to be placed after postfix\n        maskitoCaretGuard((value) => [0, value.length - 1]),\n        maskitoEventHandler('blur', (element) => {\n            if (element.value === postfix) {\n                maskitoUpdateElement(element, `0${postfix}`);\n            }\n        }),\n    ],\n} satisfies MaskitoOptions;\n"}}]);