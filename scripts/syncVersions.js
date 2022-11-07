const fs = require('fs');
const glob = require('glob');
const JSON_INDENTATION_LEVEL = 4;
const {version} = require('../package.json');

// Sync libraries package.json versions with main package.json
syncVersions('projects');

function syncVersions(root) {
    glob(root + '/**/package.json', (_, files) => {
        files.forEach(file => {
            const packageJson = JSON.parse(fs.readFileSync(file));

            fs.writeFileSync(
                file,
                JSON.stringify(
                    {
                        ...packageJson,
                        version,
                    },
                    null,
                    JSON_INDENTATION_LEVEL,
                ),
            );
        });
    });
}
