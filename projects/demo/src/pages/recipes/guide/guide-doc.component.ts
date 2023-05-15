import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'guide-doc',
    templateUrl: './guide-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideDocComponent {
    readonly coreConceptsDocPage = `/${DemoPath.CoreConceptsOverview}`;
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;
    readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;
    readonly prefixDocPage = `/${DemoPath.Prefix}`;

    readonly cvcExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-cvc-code/mask.ts?raw'
        ),
    };

    readonly phoneExample2: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-phone/mask.ts?raw'),
        [DocExamplePrimaryTab.Angular]: import('./examples/2-phone/component.ts?raw'),
    };

    readonly dateExample3: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/3-date/mask.ts?raw'),
        [DocExamplePrimaryTab.Angular]: import('./examples/3-date/component.ts?raw'),
    };
}
