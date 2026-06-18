import type {MaskitoOptions, MaskitoPlugin} from '@maskito/core';
import {useMaskito} from '@maskito/react-native';
import {type JSX} from 'react';
import {TextInput} from 'react-native';

const brokenPlugin: MaskitoPlugin = (
    /**
     * This argument only exists for compatibility
     * with the other web-based Maskito libraries.
     * Don't rely on it in React Native!
     */
    element,
) => {
    /**
     * ❌ `addEventListener` is not available in React Native.
     * Use the `onFocus` prop instead:
     * <TextInput inputMode="numeric" onFocus={...} />
     * https://reactnative.dev/docs/textinput#onfocus
     */
    element.addEventListener('focus', () => {
        // [...];
    });

    /**
     * ❌ Set the input mode the React Native way — via a prop:
     * <TextInput inputMode="numeric" />
     * https://reactnative.dev/docs/textinput#inputmode
     */
    element.inputMode = 'numeric';
};

const options: MaskitoOptions = {
    mask: /^\d+$/,
    plugins: [brokenPlugin],
};

export const App = (): JSX.Element => {
    const mask = useMaskito({options});

    return <TextInput {...mask} />;
};
