import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {type ComponentFixture, TestBed} from '@angular/core/testing';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import {MaskitoDirective} from '@maskito/angular';
import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    type MaskitoElementPredicate,
    type MaskitoOptions,
} from '@maskito/core';

const DIGIT_ONLY: MaskitoOptions = {mask: /^\d*$/};

describe('MaskitoDirective — initEffect', () => {
    @Component({
        imports: [MaskitoDirective],
        template: `
            <input
                [maskito]="options()"
                [maskitoElement]="predicate()"
            />
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestHostComponent {
        public readonly options = signal<MaskitoOptions | null>(null);
        public readonly predicate = signal(MASKITO_DEFAULT_ELEMENT_PREDICATE);
    }

    let fixture: ComponentFixture<TestHostComponent>;
    let destroySpy: ReturnType<typeof jest.spyOn>;

    function getDirective(): MaskitoDirective {
        return fixture.debugElement.children[0]!.injector.get(MaskitoDirective);
    }

    function getMaskedElement(): Maskito | null {
        return (getDirective() as unknown as {maskedElement: Maskito | null})
            .maskedElement;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [TestHostComponent]});
        destroySpy = jest.spyOn(Maskito.prototype, 'destroy');
        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('when options is null', () => {
        it('does not create a Maskito instance', async () => {
            await fixture.whenStable();

            expect(getMaskedElement()).toBeNull();
        });
    });

    describe('when options are provided', () => {
        beforeEach(async () => {
            fixture.componentInstance.options.set(DIGIT_ONLY);
            fixture.detectChanges();
            await fixture.whenStable();
        });

        it('creates a Maskito instance', () => {
            expect(getMaskedElement()).toBeInstanceOf(Maskito);
        });

        it('destroys the old instance and creates a new one when options change', async () => {
            fixture.componentInstance.options.set({mask: /^[a-z]*$/});
            fixture.detectChanges();
            await fixture.whenStable();

            expect(destroySpy).toHaveBeenCalledTimes(1);
            expect(getMaskedElement()).toBeInstanceOf(Maskito);
        });

        it('destroys the instance when options become null', async () => {
            fixture.componentInstance.options.set(null);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(destroySpy).toHaveBeenCalledTimes(1);
            expect(getMaskedElement()).toBeNull();
        });

        it('destroys the instance when the directive is destroyed', () => {
            const directive = getDirective() as unknown as {
                maskedElement: Maskito | null;
            };

            fixture.destroy();

            expect(destroySpy).toHaveBeenCalledTimes(1);
            expect(directive.maskedElement).toBeNull();
        });
    });

    describe('stale async predicate', () => {
        function makeControlledPredicate(): {
            predicate: MaskitoElementPredicate;
            resolveCall: (index: number) => void;
        } {
            const resolvers: Array<() => void> = [];

            const predicate: MaskitoElementPredicate = async (el) =>
                new Promise<HTMLInputElement>((resolve) => {
                    resolvers.push(() => resolve(el as HTMLInputElement));
                });

            return {predicate, resolveCall: (i) => resolvers[i]!()};
        }

        it('ignores the result when elementPredicate changes before it resolves', async () => {
            const {predicate: slowPredicate, resolveCall} = makeControlledPredicate();

            fixture.componentInstance.options.set(DIGIT_ONLY);
            fixture.componentInstance.predicate.set(slowPredicate);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(getMaskedElement()).toBeNull();

            fixture.componentInstance.predicate.set(MASKITO_DEFAULT_ELEMENT_PREDICATE);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(getMaskedElement()).toBeInstanceOf(Maskito);
            expect(destroySpy).not.toHaveBeenCalled();

            resolveCall(0);
            await fixture.whenStable();

            expect(destroySpy).not.toHaveBeenCalled();
            expect(getMaskedElement()).toBeInstanceOf(Maskito);
        });

        it('ignores the result when options change before the predicate resolves', async () => {
            const {predicate: slowPredicate, resolveCall} = makeControlledPredicate();

            fixture.componentInstance.options.set(DIGIT_ONLY);
            fixture.componentInstance.predicate.set(slowPredicate);
            fixture.detectChanges();
            await fixture.whenStable();

            expect(getMaskedElement()).toBeNull();

            fixture.componentInstance.options.set({mask: /^[a-z]*$/});
            fixture.detectChanges();
            await fixture.whenStable();

            resolveCall(0);
            await fixture.whenStable();

            expect(destroySpy).not.toHaveBeenCalled();
            expect(getMaskedElement()).toBeNull();
        });
    });
});
