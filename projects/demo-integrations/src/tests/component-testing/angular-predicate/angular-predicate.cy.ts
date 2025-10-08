import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import type {ComponentFixture} from '@angular/core/testing';
import {MaskitoDirective} from '@maskito/angular';
import type {
    MaskitoElement,
    MaskitoElementPredicate,
    MaskitoOptions,
} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

import {TestInput} from '../utils';
import {MultiTestInputComponent} from './multi-test.component';

describe('@maskito/angular | Predicate', () => {
    it('can detect run-time changes', () => {
        cy.mount(MultiTestInputComponent);
        cy.get('input').should('be.visible').first().as('card');
        cy.get('input').should('be.visible').eq(1).as('name');

        cy.get('@card')
            .focus()
            .type('12341234abcd12341234')
            .should('have.value', '1234 1234 1234 1234');

        cy.get('@name').focus().type('12341234abcd12341234').should('have.value', 'ABCD');
    });

    it('supports asynchronous predicate', () => {
        const cardMask: MaskitoOptions = {
            mask: [
                ...new Array(4).fill(/\d/),
                ' ',
                ...new Array(4).fill(/\d/),
                ' ',
                ...new Array(4).fill(/\d/),
                ' ',
                ...new Array(4).fill(/\d/),
            ],
        };

        cy.mount(TestInput, {
            componentProperties: {
                maskitoOptions: cardMask,
                maskitoElementPredicate: async (element: HTMLElement) =>
                    Promise.resolve(element as MaskitoElement),
            },
        });
        cy.get('input').as('card');
        cy.get('@card')
            .focus()
            .type('12341234abcd12341234')
            .should('have.value', '1234 1234 1234 1234');
    });

    describe('ignores the previous predicate if it resolves after the switching to new one (race condition check)', () => {
        let fixture!: ComponentFixture<unknown>;

        beforeEach(() => {
            const delay = async (ms: number): Promise<void> =>
                new Promise((resolve) => {
                    setTimeout(resolve, ms);
                });

            const invalidPredicate: MaskitoElementPredicate = async (element) =>
                delay(1_000).then(() => element.querySelectorAll('input')[0]!);
            const validPredicate: MaskitoElementPredicate = async (element) =>
                delay(1_000).then(() => element.querySelectorAll('input')[1]!);

            @Component({
                imports: [AsyncPipe, MaskitoDirective],
                template: `
                    <div
                        class="wrapper"
                        [maskito]="maskitoOptions"
                        [maskitoElement]="elementPredicate()"
                    >
                        <input class="hidden-input" />
                        <input class="real-input" />
                    </div>
                `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            })
            class ComplexTextfield {
                protected maskitoOptions = maskitoNumberOptionsGenerator();
                protected elementPredicate = signal(invalidPredicate);

                constructor() {
                    setTimeout(() => this.elementPredicate.set(validPredicate), 500);
                }
            }

            cy.clock();
            cy.mount(ComplexTextfield).then((res) => {
                fixture = res.fixture;
            });

            cy.get('input').first().as('hidden');
            cy.get('input').last().as('real');
        });

        it('allows to enter letters in both textfield (before any predicate is resolved)', () => {
            cy.get('@hidden').focus().type('12abc3').should('have.value', '12abc3');
            cy.get('@real').focus().type('12abc3').should('have.value', '12abc3');
        });

        it('allows to enter letters in both textfield (active predicate is changed; both are still resolving)', () => {
            cy.smartTick(520, {fixture});

            cy.get('@hidden').focus().type('12abc3').should('have.value', '12abc3');
            cy.get('@real').focus().type('12abc3').should('have.value', '12abc3');
        });

        it('allows to enter letters in both textfield (invalid predicate was resolved AND SKIPPED; valid is still resolving)', () => {
            cy.smartTick(520, {fixture});
            cy.smartTick(500); // invalid predicate was resolved

            cy.get('@hidden').focus().type('12abc3').should('have.value', '12abc3');
            cy.get('@real').focus().type('12abc3').should('have.value', '12abc3');
        });

        it('forbids to enter letters only in real textfield (valid and invalid predicates were resolved)', () => {
            cy.smartTick(520, {fixture});
            cy.smartTick(500); // invalid predicate was resolved
            cy.smartTick(500); // valid predicate was resolved

            cy.get('@hidden').focus().type('12abc3').should('have.value', '12abc3');
            cy.get('@real').focus().type('12abc3').should('have.value', '123');
        });
    });

    describe('[maskitoOptions] are changed before long element predicate is resolved', () => {
        let fixture!: ComponentFixture<unknown>;
        const SWITCH_OPTIONS_TIME = 1_000;
        const PREDICATE_RESOLVING_TIME = 2_000;

        beforeEach(() => {
            @Component({
                imports: [MaskitoDirective],
                template: `
                    <input
                        [maskito]="options()"
                        [maskitoElement]="elementPredicate"
                    />
                `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            })
            class TestComponent {
                private readonly numberOptions = {mask: /^\d+$/};
                private readonly engLettersOptions = {mask: /^[a-z]+$/i};
                protected options = signal(this.numberOptions);

                constructor() {
                    setTimeout(() => {
                        this.options.set(this.engLettersOptions);
                    }, SWITCH_OPTIONS_TIME);
                }

                protected readonly elementPredicate: MaskitoElementPredicate = async (
                    element,
                ) =>
                    new Promise((resolve) => {
                        setTimeout(
                            () => resolve(element as HTMLInputElement),
                            PREDICATE_RESOLVING_TIME,
                        );
                    });
            }

            cy.clock();
            cy.mount(TestComponent).then((res) => {
                fixture = res.fixture;
            });
        });

        it('can enter any value before no predicate is resolved', () => {
            cy.get('input').focus().type('12abc3').should('have.value', '12abc3');
        });

        it('enabling of the first mask should be skipped if [maskitoOptions] were changed during resolving of element predicate', () => {
            cy.smartTick(PREDICATE_RESOLVING_TIME, {fixture}); // predicate is resolved only once for digit cases
            cy.get('input').focus().type('12abc3').should('have.value', '12abc3');
        });

        it('only the last mask should be applied if [maskitoOptions] were changed during resolving of element predicates', () => {
            cy.smartTick(SWITCH_OPTIONS_TIME + PREDICATE_RESOLVING_TIME, {fixture}); // enough time to resolve element predicated for both cases
            cy.get('input').focus().type('12abc3').should('have.value', 'abc');
        });
    });
});
