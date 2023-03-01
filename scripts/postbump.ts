import {version} from '../package.json';
import {execute} from './helpers/execute';
import {syncVersions} from './helpers/sync-versions';

(function main(): void {
    syncVersions([`./projects`, `./package-lock.json`], version);
    execute(`git add .`);
})();
