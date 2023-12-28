"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[7792],{7792:n=>{n.exports="import type {MaskitoOptions} from '@maskito/core';\nimport {maskitoCaretGuard, maskitoNumberOptionsGenerator} from '@maskito/kit';\n\nconst {plugins, ...numberOptions} = maskitoNumberOptionsGenerator({\n    postfix: '%',\n    min: 0,\n    max: 100,\n    precision: 2,\n});\n\nexport default {\n    ...numberOptions,\n    plugins: [\n        ...plugins,\n        // Forbids caret to be placed after postfix\n        maskitoCaretGuard(value => [0, value.length - 1]),\n    ],\n} as MaskitoOptions;\n"}}]);