import {Injectable} from '@angular/core';
import stackblitz, {OpenOptions, Project} from '@stackblitz/sdk';

@Injectable()
export class StackblitzService {
    private readonly baseProjectConfigs: Pick<Project, 'dependencies' | 'template'> = {
        template: `typescript`,
        dependencies: {
            '@maskito/core': '*',
            '@maskito/kit': '*',
        },
    };

    openStarter(
        {title, description, files}: Pick<Project, 'description' | 'files' | 'title'>,
        openOptions?: OpenOptions,
    ): void {
        return stackblitz.openProject(
            {
                ...this.baseProjectConfigs,
                title,
                description,
                files,
            },
            openOptions,
        );
    }
}
