"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[8945],{58945:function(n){n.exports="import {MaskitoOptions} from '@maskito/core';\n\nconst maskitoOptions: MaskitoOptions = {\n    mask: /^[^\u0430-\u044f\u0451]+$/i,\n    overwriteMode: ({value}) => {\n        const includesOnlyDigits = /^\\d+$/.test(value);\n\n        return includesOnlyDigits ? 'replace' : 'shift';\n    },\n};\n\nexport default maskitoOptions;\n"}}]);