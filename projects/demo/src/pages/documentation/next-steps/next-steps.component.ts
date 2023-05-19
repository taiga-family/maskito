import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/constants';

@Component({
    selector: 'next-steps',
    templateUrl: './next-steps.template.html',
    styles: ['._hidden { display: none }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextStepsComponent {
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly processorsDocPage = `/${DemoPath.Processors}`;
    readonly pluginsDocPage = `/${DemoPath.Plugins}`;
    readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;
}
