import {Component} from '@angular/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {maskito} from '@maskito/vue';
import {createApp} from 'vue';

@Component({
    selector: 'vue-example-1',
    template: '<div id="vue"></div>',
})
export class VueExample1 {
    constructor() {
        setTimeout(() => {
            createApp({
                template: '<input v-model="value" v-maskito="options" />',
                directives: {maskito},
                data: () => ({
                    value: '123456',
                    options: maskitoNumberOptionsGenerator(),
                }),
            }).mount('#vue');
        });
    }
}
