import type {TypedInputEvent} from '../../types';

export class EventListener {
    private readonly listeners: Array<() => void> = [];

    constructor(private readonly element: HTMLElement) {}

    public listen<E extends keyof HTMLElementEventMap>(
        eventType: E,
        fn: (
            event: E extends 'beforeinput' | 'input'
                ? TypedInputEvent
                : HTMLElementEventMap[E],
        ) => unknown,
        options?: AddEventListenerOptions,
    ): void {
        const untypedFn = fn as (event: HTMLElementEventMap[E]) => unknown;

        this.element.addEventListener<E>(eventType, untypedFn, options);
        this.listeners.push(() => this.element.removeEventListener(eventType, untypedFn));
    }

    public destroy(): void {
        this.listeners.forEach((stopListen) => stopListen());
    }
}
