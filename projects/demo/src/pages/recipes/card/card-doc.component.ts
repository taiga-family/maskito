import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'card-doc',
    templateUrl: './card-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDocComponent {
    readonly cardExample1: TuiDocExample = {
        TypeScript: import('./examples/1-basic/component.ts?raw'),
    };
}
