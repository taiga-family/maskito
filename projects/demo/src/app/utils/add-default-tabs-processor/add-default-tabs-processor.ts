import {TUI_DOC_EXAMPLE_CONTENT_PROCESSOR} from '@taiga-ui/addon-doc';
import {TuiInjectionTokenType} from '@taiga-ui/cdk';

import {DocExamplePrimaryTab} from '../../constants';
import angular from './default-tabs/angular-default-tab.md?raw';
import js from './default-tabs/js-default-tab.md?raw';
import react from './default-tabs/react-default-tab.md?raw';

export const addDefaultTabsProcessor: TuiInjectionTokenType<
    typeof TUI_DOC_EXAMPLE_CONTENT_PROCESSOR
> = files => {
    const fileNames = Object.keys(files);

    return fileNames.length === 1 && fileNames[0] === DocExamplePrimaryTab.MaskitoOptions
        ? {
              ...files,
              [DocExamplePrimaryTab.JavaScript]: js,
              [DocExamplePrimaryTab.Angular]: angular,
              [DocExamplePrimaryTab.React]: react,
          }
        : files;
};
