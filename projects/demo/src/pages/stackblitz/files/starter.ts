import './styles.css';

import type {MaskitoOptions} from '@maskito/core';
import {Maskito} from '@maskito/core';

const maskitoOptions: MaskitoOptions = {
    mask: /^\d+$/,
};

const input: HTMLInputElement | null = document.querySelector('input');

if (input) {
    const maskedInput = new Maskito(input, maskitoOptions);

    console.info(
        'Call this function when the element is detached from DOM',
        maskedInput.destroy,
    );
}
