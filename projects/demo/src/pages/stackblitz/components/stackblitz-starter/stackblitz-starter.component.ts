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
        ></tui-loader>
    `,
    styleUrl: './stackblitz-starter.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [StackblitzService],
})
export class StackblitzStarterComponent implements OnInit {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly stackblitz = inject(StackblitzService);

    public async ngOnInit(): Promise<void> {
        if (isPlatformBrowser(this.platformId)) {
            await this.openStackblitz();
        }
    }

    protected async openStackblitz(): Promise<void> {
        const [ts = '', css = ''] = await Promise.all(
            [import('../../files/starter.ts.md'), import('../../files/styles.css')]
                // TODO: remove the first `.map` after release https://github.com/taiga-family/taiga-ui/pull/12270
                .map(async (x) => Promise.resolve(x))
                .map(tuiRawLoad),
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
