import {defineConfig} from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    target: 'esnext',
    format: 'esm',
    bundle: true,
    clean: true,
    treeshake: true,
    minify: true,
    // Uncomment below to make `require` work
    // banner: {
    // 	js: `import { createRequire } from "module";
    // 	const require = createRequire(import.meta.url);`,
    // },
});
