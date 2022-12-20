export function pasteFromClipboard(
    $subject: Cypress.PrevSubjectMap<void>['element'],
): Cypress.Chainable<JQuery<HTMLElement>> {
    cy.wrap($subject, {log: false}).focus({log: false});

    cy.window({log: false})
        .its('document', {log: false})
        .then(doc => doc.execCommand('paste'));

    Cypress.log({
        name: 'pasteFromClipboard',
        displayName: 'pasteFromClipboard',
        message: `Paste text from clipboard`,
        consoleProps: () => {
            return {
                element: $subject,
                elementValue: Cypress.dom.unwrap($subject)?.[0]?.value,
            };
        },
    });

    return cy.wrap($subject, {log: false});
}
