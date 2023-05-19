!function(){"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[8644],{88644:function(n){n.exports="import {MaskitoOptions, MaskitoPreprocessor} from '@maskito/core';\nimport {maskitoPrefixPostprocessorGenerator} from '@maskito/kit';\n\nexport default {\n    mask: [\n        '+',\n        '7',\n        ' ',\n        '(',\n        /\\d/,\n        /\\d/,\n        /\\d/,\n        ')',\n        ' ',\n        /\\d/,\n        /\\d/,\n        /\\d/,\n        '-',\n        /\\d/,\n        /\\d/,\n        '-',\n        /\\d/,\n        /\\d/,\n    ],\n    // non-removable country prefix\n    postprocessor: maskitoPrefixPostprocessorGenerator('+7 '),\n    preprocessor: createTrickyPasteCasesPreprocessor(),\n} as MaskitoOptions;\n\n// Paste \"89123456789\" => \"+7 (912) 345-67-89\"\nfunction createTrickyPasteCasesPreprocessor(): MaskitoPreprocessor {\n    const trimPrefix = (value: string): string => value.replace(/^(\\+?7?\\s?8?)\\s?/, '');\n    const countDigits = (value: string): number => value.replace(/\\D/g, '').length;\n\n    return ({elementState, data}) => {\n        const {value, selection} = elementState;\n\n        return {\n            elementState: {\n                selection,\n                value: countDigits(value) > 11 ? trimPrefix(value) : value,\n            },\n            data: countDigits(data) >= 11 ? trimPrefix(data) : data,\n        };\n    };\n}\n"}}])}();