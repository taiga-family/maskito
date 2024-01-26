import {isPlatformBrowser} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import {tuiRawLoad} from '@taiga-ui/addon-doc';
import {TuiLoaderModule} from '@taiga-ui/core';

import {StackblitzService} from '../../stackblitz.service';

@Component({
    standalone: true,
    selector: 'stackblitz-starter',
    imports: [TuiLoaderModule],
    template: `
        <tui-loader
            size="xxl"
            textContent="Stackblitz loading..."
            class="loader"
            [overlay]="true"
        ></tui-loader>
    `,
    styleUrls: ['./stackblitz-starter.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [StackblitzService],
})
export class StackblitzStarterComponent implements OnInit {
    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: Record<string, unknown>,
        private readonly stackblitz: StackblitzService,
    ) {}

    async ngOnInit(): Promise<void> {
        if (isPlatformBrowser(this.platformId)) {
            await this.openStackblitz();
        }
    }

    async openStackblitz(): Promise<void> {
        const [ts, css] = await Promise.all(
            [
                import('../../files/starter.ts?raw'),
                import('../../files/styles.css?raw'),
            ].map(tuiRawLoad),
        );

        return this.stackblitz.openStarter(
            {
                title: 'Maskito Starter',
                description:
                    'A starter with Maskito library\nDocumentation: https://maskito.dev',
                files: {
                    'index.html': '<input />',
                    'index.ts': ts,
                    'styles.css': css,
                },
            },
            {
                newWindow: false,
                openFile: 'index.ts',
                hideExplorer: true,
            },
        );
    }
}
