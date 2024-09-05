import {ChangeDetectionStrategy, Component} from '@angular/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {maskito} from '@maskito/vue';
import {createApp} from 'vue';

@Component({
    standalone: true,
    selector: 'vue-example-1',
    template: '<div id="vue"></div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
