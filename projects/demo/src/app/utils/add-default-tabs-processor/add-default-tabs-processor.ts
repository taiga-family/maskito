import {DocExamplePrimaryTab} from '@demo/constants';
import type {TuiHandler} from '@taiga-ui/cdk';

import {ANGULAR_DEFAULT_TAB} from './default-tabs/angular-default-tab';
import {JS_DEFAULT_TAB} from './default-tabs/js-default-tab';
import {REACT_DEFAULT_TAB} from './default-tabs/react-default-tab';
import {VUE_DEFAULT_TAB} from './default-tabs/vue-default-tab';

export const addDefaultTabsProcessor: TuiHandler<
    Record<string, string>,
    Record<string, string>
> = (files) => {
    const fileNames = Object.keys(files);

    return fileNames.length === 1 && fileNames[0] === DocExamplePrimaryTab.MaskitoOptions
        ? {
              ...files,
              [DocExamplePrimaryTab.JavaScript]: JS_DEFAULT_TAB,
              [DocExamplePrimaryTab.Angular]: ANGULAR_DEFAULT_TAB,
              [DocExamplePrimaryTab.React]: REACT_DEFAULT_TAB,
              [DocExamplePrimaryTab.Vue]: VUE_DEFAULT_TAB,
          }
        : files;
};
