/**
 * Cypress does not have built-in support for pasting from clipboard.
 * This utility is VERY approximate alternative for it.
 *
 * @see https://github.com/cypress-io/cypress/issues/28861
 */
export function paste<T extends Cypress.PrevSubjectMap['element']>(
    $subject: T,
    data: string,
): ReturnType<Cypress.CommandFn<'paste'>> {
    const element = Cypress.dom.unwrap($subject)[0] as
        | HTMLInputElement
        | HTMLTextAreaElement;
    const {value, selectionStart, selectionEnd} = element;

    Cypress.log({
        displayName: 'paste',
        message: data,
        consoleProps() {
            return {
                value,
                selectionStart,
                selectionEnd,
            };
        },
    });

    return cy
        .document()
        .invoke('addEventListener', 'beforeinput', cy.stub().as('beforeinput'), {
            once: true,
        })
        .wrap($subject, {log: false})
        .should('be.focused')
        .trigger('beforeinput', {
            inputType: 'insertFromPaste',
            data,
            log: false,
        })
        .document({log: false})
        .get('@beforeinput')
        .its('lastCall.lastArg.defaultPrevented')
        .then((prevented) => (prevented ? null : cy.document()))
        .then((doc) => doc?.execCommand('insertText', false, data))
        .wrap($subject, {log: false});
}
