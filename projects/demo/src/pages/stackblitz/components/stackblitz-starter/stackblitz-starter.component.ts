import {isPlatformBrowser} from '@angular/common';
import type {OnInit} from '@angular/core';
import {ChangeDetectionStrategy, Component, inject, PLATFORM_ID} from '@angular/core';
import {tuiRawLoad, tuiTryParseMarkdownCodeBlock} from '@taiga-ui/addon-doc';
import {TuiLoader} from '@taiga-ui/core';

import {StackblitzService} from '../../stackblitz.service';

@Component({
    selector: 'stackblitz-starter',
    imports: [TuiLoader],
    template: `
        <tui-loader
            size="xxl"
            textContent="Stackblitz loading..."
            class="loader"
            [overlay]="true"
        />
    `,
    styleUrl: './stackblitz-starter.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [StackblitzService],
})
export class StackblitzStarterComponent implements OnInit {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly stackblitz = inject(StackblitzService);

    public ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            void this.openStackblitz();
        }
    }

    protected async openStackblitz(): Promise<void> {
        const [ts = '', css = ''] = await Promise.all(
            [import('../../files/starter.ts.md'), import('../../files/styles.css')].map(
                tuiRawLoad,
            ),
        );

        return this.stackblitz.openStarter(
            {
                title: 'Maskito Starter',
                description:
                    'A starter with Maskito library\nDocumentation: https://maskito.dev',
                files: {
                    'index.html': '<input />',
                    'index.ts': tuiTryParseMarkdownCodeBlock(ts)[0]!,
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
