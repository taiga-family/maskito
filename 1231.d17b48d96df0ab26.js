"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[1231],{1231:o=>{o.exports="```ts\nimport {Component} from '@angular/core';\nimport {MaskitoDirective} from '@maskito/angular';\nimport {MaskitoOptions} from '@maskito/core';\n\n@Component({\n  selector: 'your-component',\n  template: `\n    <input [maskito]=\"maskitoOptions\" />\n  `,\n  imports: [MaskitoDirective],\n})\nexport class YourComponent {\n  readonly maskitoOptions: MaskitoOptions = {\n    mask: /^\\d+$/,\n  };\n}\n```\n"}}]);