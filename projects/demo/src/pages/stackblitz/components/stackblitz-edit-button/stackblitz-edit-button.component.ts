import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButtonModule} from '@taiga-ui/core';

@Component({
    standalone: true,
    selector: 'stackblitz-edit-button',
    imports: [TuiButtonModule],
    template: `
        <button
            appearance="flat"
            icon="assets/icons/stackblitz.svg"
            size="s"
            title="Edit on StackBlitz"
            tuiButton
            type="button"
        >
            Edit
        </button>
    `,
    styleUrls: ['./stackblitz-edit-button.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackblitzEditButtonComponent {}
