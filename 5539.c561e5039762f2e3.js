"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[5539],{5539:e=>{e.exports="```ts\nimport {Maskito} from '@maskito/core';\n\nlet howManyWordsAllowed = 5;\n\nconst maxWordInput = new Maskito(element, {\n  mask: (elementState) => new RegExp('^(\\\\w+\\\\s?){0,' + howManyWordsAllowed + '}$'),\n});\n```\n"}}]);