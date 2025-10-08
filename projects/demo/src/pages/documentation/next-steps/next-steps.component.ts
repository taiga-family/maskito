import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiLink} from '@taiga-ui/core';

@Component({
    selector: 'next-steps',
    imports: [RouterLink, RouterLinkActive, TuiLink],
    templateUrl: './next-steps.template.html',
    styles: ['._hidden { display: none }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextStepsComponent {
    protected readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    protected readonly processorsDocPage = `/${DemoPath.Processors}`;
    protected readonly pluginsDocPage = `/${DemoPath.Plugins}`;
    protected readonly overwriteModeDocPage = `/${DemoPath.OverwriteMode}`;
}
