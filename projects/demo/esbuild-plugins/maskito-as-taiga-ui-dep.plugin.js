const {resolve, join} = require('node:path');
const fs = require('node:fs');

/**
 * Maskito repo uses Taiga UI to build demo application.
 * Taiga UI uses Maskito packages as a dependency.
 * Maskito <=> Taiga UI circular dependency.
 * ESBuild is capable to use path aliases from tsconfig, to resolve local imports
 * (e.g. source code of @maskito/kit imports @maskito/core utility).
 * However, ESBuild ignores tsconfig paths when resolving packages inside node_modules.
 */
module.exports = {
    name: 'maskito-as-taiga-ui-dep',
    setup(build) {
        // Resolve @maskito/* imports to the dist folder or source
        build.onResolve({filter: /^@maskito/}, (args) => {
            if (!args.importer.includes('node_modules/@taiga-ui')) {
                // Ignore for local path aliases (ESBuild handles them properly)
                return;
            }

            const library = args.path // e.g., '@maskito/kit'
                .split('/')[1];
            const distPath = resolve(__dirname, '../../../dist', library);

            // Check if the package has been built
            const packageJsonPath = join(distPath, 'package.json');

            if (fs.existsSync(packageJsonPath)) {
                const entryPoint = JSON.parse(
                    fs.readFileSync(packageJsonPath, 'utf-8'),
                ).module;
                const resolvedPath = join(distPath, entryPoint);

                if (fs.existsSync(resolvedPath)) {
                    return {
                        path: resolvedPath,
                    };
                }
            }

            return null;
        });
    },
};
