"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[8644],{8644:n=>{n.exports="import {MaskitoOptions, MaskitoPreprocessor} from '@maskito/core';\nimport {\n    maskitoAddOnFocusPlugin,\n    maskitoCaretGuard,\n    maskitoPrefixPostprocessorGenerator,\n    maskitoRemoveOnBlurPlugin,\n} from '@maskito/kit';\n\nexport default {\n    mask: [\n        '+',\n        '7',\n        ' ',\n        '(',\n        /\\d/,\n        /\\d/,\n        /\\d/,\n        ')',\n        ' ',\n        /\\d/,\n        /\\d/,\n        /\\d/,\n        '-',\n        /\\d/,\n        /\\d/,\n        '-',\n        /\\d/,\n        /\\d/,\n    ],\n    postprocessors: [\n        // non-removable country prefix\n        maskitoPrefixPostprocessorGenerator('+7 '),\n    ],\n    preprocessors: [createCompletePhoneInsertionPreprocessor()],\n    plugins: [\n        maskitoAddOnFocusPlugin('+7 '),\n        maskitoRemoveOnBlurPlugin('+7 '),\n        // Forbids to put caret before non-removable country prefix\n        // But allows to select all value!\n        maskitoCaretGuard((value, [from, to]) => [\n            from === to ? '+7 '.length : 0,\n            value.length,\n        ]),\n    ],\n} as MaskitoOptions;\n\n// Paste \"89123456789\" => \"+7 (912) 345-67-89\"\nfunction createCompletePhoneInsertionPreprocessor(): MaskitoPreprocessor {\n    const trimPrefix = (value: string): string => value.replace(/^(\\+?7?\\s?8?)\\s?/, '');\n    const countDigits = (value: string): number => value.replace(/\\D/g, '').length;\n\n    return ({elementState, data}) => {\n        const {value, selection} = elementState;\n\n        return {\n            elementState: {\n                selection,\n                value: countDigits(value) > 11 ? trimPrefix(value) : value,\n            },\n            data: countDigits(data) >= 11 ? trimPrefix(data) : data,\n        };\n    };\n}\n"}}]);