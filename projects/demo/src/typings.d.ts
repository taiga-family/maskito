/* Import file's content as string.
To understand how it works, see `projects/demo/webpack.config.ts`.
*/
declare module '*?raw' {
    const result: string;

    export default result;
}
