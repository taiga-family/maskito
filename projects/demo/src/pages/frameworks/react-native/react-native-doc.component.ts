import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification, TuiTitle} from '@taiga-ui/core';
import {TuiList} from '@taiga-ui/layout';

@Component({
    selector: 'react-native-doc-page',
    imports: [RouterLink, TuiAddonDoc, TuiLink, TuiList, TuiNotification, TuiTitle],
    templateUrl: './react-native-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReactNativeDocPageComponent {
    protected readonly coreConceptsOverviewDocPage = `/${DemoPath.CoreConceptsOverview}`;
    protected readonly pluginsDocPage = `/${DemoPath.Plugins}`;

    protected readonly useMaskitoBasicUsage = import(
        './examples/useMaskitoBasicUsage.tsx?raw',
        {with: {loader: 'text'}}
    );

    protected readonly kitCompatible = import('./examples/kitCompatible.tsx?raw', {
        with: {loader: 'text'},
    });

    protected readonly controlledInput = import('./examples/controlledInput.tsx?raw', {
        with: {loader: 'text'},
    });

    protected readonly poorPluginSupport = import(
        './examples/poorPluginSupport.tsx?raw',
        {with: {loader: 'text'}}
    );
}
