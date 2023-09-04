import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'stackblitz-edit-button',
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
