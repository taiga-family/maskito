export function smartTick(
    $subject: Cypress.PrevSubjectMap<void>[Cypress.PrevSubject],
    durationMs: number, // ms
    frequencyMs = 100, // ms
): Cypress.Chainable<unknown> {
    const iterations = Math.ceil(durationMs / frequencyMs);
    const lastIterationMs = durationMs % frequencyMs || frequencyMs;

    for (let i = 1; i <= iterations; i++) {
        cy.tick(i === iterations ? lastIterationMs : frequencyMs, {log: false});
        cy.wait(0, {log: false}); // allow React hooks to process
    }

    return cy.wrap($subject, {log: false});
}
