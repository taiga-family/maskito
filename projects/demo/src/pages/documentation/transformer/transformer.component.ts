import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'transformer-doc-page',
    templateUrl: './transformer.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransformerDocPageComponent {
    readonly utilityInActionDemo = import('./examples/utility-in-action-demo.md?raw');
}
