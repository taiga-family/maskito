import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {maskito} from '@maskito/vue';
import {mount} from '@vue/test-utils';

describe('Maskito Vue package', () => {
    const component = {
        template: '<input v-model="value" v-maskito="options" />',
        directives: {maskito},
        data: () => ({
            value: '1234567',
            options: maskitoNumberOptionsGenerator(),
        }),
    };

    test('formats text', () => {
        expect(mount(component).find('input').element.value).toBe(`1\u00A0234\u00A0567`);
    });
});
