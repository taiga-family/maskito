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
    const inputType = 'insertFromPaste';
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
        .wrap($subject, {log: false})
        .trigger('beforeinput', {
            inputType,
            data,
            log: false,
        })
        .invoke(
            'val',
            value.slice(0, selectionStart ?? 0) + data + value.slice(selectionEnd ?? 0),
        )
        .trigger('input', {
            inputType,
            data,
            log: false,
        });
}
