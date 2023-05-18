import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'processors-doc-page',
    templateUrl: './processors.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessorsDocPageComponent {
    readonly preprocessorFirstArgDemo = import(
        './examples/preprocessor-first-arg-demo.md?raw'
    );

    readonly preprocessorsSecondArgDemo = import(
        './examples/processor-second-arg-demo.md?raw'
    );

    readonly preprocessorInActionDemo = import(
        './examples/preprocessor-in-action-demo.md?raw'
    );

    readonly postprocessorInActionDemo = import(
        './examples/postprocessor-in-action.md?raw'
    );

    readonly maskitoPipeDemo = import('./examples/maskito-pipe-demo.md?raw');
}
