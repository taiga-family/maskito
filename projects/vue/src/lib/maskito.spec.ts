import {maskitoInitialCalibrationPlugin} from '@maskito/core';
import {maskito} from '@maskito/vue';
import {mount} from '@vue/test-utils';

describe('Maskito Vue package', () => {
    const options = {
        mask: [
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
        ],
        plugins: [maskitoInitialCalibrationPlugin()],
    };
    const component = {
        template: '<input v-model="value" v-maskito="options" />',
        directives: {maskito},
        data: () => ({
            value: '1234567890123456',
            options,
        }),
    };

    it('formats text', async () => {
        const mounted = mount(component);

        await Promise.resolve();

        expect(mounted.find('input').element.value).toBe('1234 5678 9012 3456');
    });
});
