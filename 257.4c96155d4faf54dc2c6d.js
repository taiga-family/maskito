"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[257],{257:n=>{n.exports="```ts\nimport {Component} from '@angular/core';\nimport {MaskitoOptions} from '@maskito/core';\n\n@Component({\n  selector: 'your-component',\n  template: `\n    <input [maskito]=\"maskitoOptions\" />\n  `,\n})\nexport class YourComponent {\n  readonly maskitoOptions: MaskitoOptions = {\n    mask: /^\\d+$/,\n  };\n}\n```\n"}}]);