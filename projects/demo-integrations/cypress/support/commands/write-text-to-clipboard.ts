export function writeTextToClipboard(
    $subject: Cypress.PrevSubjectMap<void>[Cypress.PrevSubject],
    text: string,
): Cypress.Chainable<JQuery<HTMLElement> | Document | Window | void> {
    cy.window({log: false})
        .its('navigator.permissions', {log: false})
        .then(permissions => permissions.query({name: 'clipboard-read'}))
        .its('state', {log: false})
        /**
         * By default, it is "prompt" which shows a popup asking the user if the site can have access to the clipboard.
         * If the user allows, then next time it will be "granted"
         * If the user denies access to the clipboard, on the next run the state will be "denied".
         * ___
         * But not for Electron browser where the clipboard permission is granted when Cypress starts it!
         * @see https://docs.cypress.io/examples/examples/recipes#Testing-the-DOM Clipboard
         * @see https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/testing-dom__clipboard
         *
         */
        .should('equal', 'granted', {log: false});

    cy.window({log: false})
        .its('navigator.clipboard', {log: false})
        .then(clip => clip.writeText(text));

    Cypress.log({
        name: 'writeTextToClipboard',
        displayName: 'writeTextToClipboard',
        message: `Write text "${text}" to clipboard`,
        consoleProps: () => {
            return {
                text,
            };
        },
    });

    return cy.wrap($subject, {log: false});
}
