import './animation.css';

import {Maskito} from '@maskito/core';

import maskitoOptions from './mask';

const element = document.querySelector('input')!;
const maskedInput = new Maskito(element, maskitoOptions);

let reject = -1;

element.style.animation = '0.3s 1';

element.addEventListener('maskitoReject', () => {
    reject += 1;
    element.style.animationName = `reject-${reject % 2}`;
});

console.info(
    'Call this function when the element is detached from DOM',
    maskedInput.destroy,
);
