"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[9328],{9328:o=>{o.exports="import {MaskitoOptions} from '@maskito/core';\nimport {\n    maskitoAddOnFocusPlugin,\n    maskitoPrefixPostprocessorGenerator,\n    maskitoRemoveOnBlurPlugin,\n} from '@maskito/kit';\n\nexport default {\n    mask: /^\\$?\\d*$/, // dollar sign or digits\n    postprocessors: [maskitoPrefixPostprocessorGenerator('$')],\n    plugins: [maskitoAddOnFocusPlugin('$'), maskitoRemoveOnBlurPlugin('$')],\n} as MaskitoOptions;\n"}}]);