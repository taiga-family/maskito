"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[1250],{1250:e=>{e.exports="```ts\nimport './styles.css';\nimport {Maskito} from '@maskito/core';\nimport mask from './mask';\n\nconst element: HTMLInputElement | HTMLTextAreaElement | null = document.querySelector('input, textarea');\n\nif (element) {\n  const maskedElement = new Maskito(element, mask);\n\n  console.info('Call this function when the element is detached from DOM', maskedElement.destroy);\n}\n```\n"}}]);