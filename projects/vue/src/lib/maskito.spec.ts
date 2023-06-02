import {maskito} from '@maskito/vue';
import {mount} from '@vue/test-utils';

describe('Maskito Vue package', () => {
    const options = {
        mask: [
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
        ],
    };
    const component = {
        template: '<input v-model="value" v-maskito="options" />',
        directives: {maskito},
        data: () => ({
            value: '1234567890123456',
            options: options,
        }),
    };

    test('formats text', () => {
        expect(mount(component).find('input').element.value).toBe(`1234 5678 9012 3456`);
    });
});
