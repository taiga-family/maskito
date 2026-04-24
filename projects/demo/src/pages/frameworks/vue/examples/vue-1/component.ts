import {afterNextRender, ChangeDetectionStrategy, Component} from '@angular/core';
import {maskitoNumber} from '@maskito/kit';
import {maskito} from '@maskito/vue';

@Component({
    selector: 'vue-example-1',
    template: '<div id="vue"></div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VueExample1 {
    protected readonly csrOnly = afterNextRender(async () =>
        import('vue').then(({createApp}) => {
            createApp({
                template: '<input v-model="value" v-maskito="options" />',
                directives: {maskito},
                data: () => ({
                    value: '123_456',
                    options: maskitoNumber({thousandSeparator: '_'}),
                }),
            }).mount('#vue');
        }),
    );
}
