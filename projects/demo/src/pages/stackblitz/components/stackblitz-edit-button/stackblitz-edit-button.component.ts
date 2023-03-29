import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'stackblitz-edit-button',
    template: `
        <button
            tuiButton
            size="s"
            type="button"
            appearance="flat"
            icon="assets/icons/stackblitz.svg"
            title="Edit on StackBlitz"
        >
            Edit
        </button>
    `,
    styleUrls: ['./stackblitz-edit-button.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackblitzEditButtonComponent {}
