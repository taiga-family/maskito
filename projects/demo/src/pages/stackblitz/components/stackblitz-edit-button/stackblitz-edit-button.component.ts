import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiButton} from '@taiga-ui/core';

@Component({
    selector: 'stackblitz-edit-button',
    imports: [TuiButton],
    template: `
        <button
            appearance="flat"
            iconStart="assets/icons/stackblitz.svg"
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
