export function smartTick<T extends Cypress.PrevSubjectMap<void>[Cypress.PrevSubject]>(
    $subject: T,
    durationMs: number, // ms
    frequencyMs = 100, // ms
): Cypress.Chainable<T> {
    const iterations = Math.ceil(durationMs / frequencyMs);
    const lastIterationMs = durationMs % frequencyMs || frequencyMs;

    for (let i = 1; i <= iterations; i++) {
        cy.tick(i === iterations ? lastIterationMs : frequencyMs, {log: false});
        cy.wait(0, {log: false}); // allow React hooks to process
    }

    Cypress.log({
        displayName: 'smartTick',
        message: `${durationMs}ms`,
        consoleProps() {
            return {
                durationMs,
                frequencyMs,
            };
        },
    });

    return cy.wrap($subject, {log: false});
}
