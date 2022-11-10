export class EventListener {
    private readonly listeners: Array<() => void> = [];

    constructor(private readonly element: HTMLElement) {}

    listen<E extends keyof HTMLElementEventMap>(
        eventType: E,
        fn: (event: HTMLElementEventMap[E]) => unknown,
        options?: AddEventListenerOptions,
    ): void {
        this.element.addEventListener<E>(eventType, fn, options);

        this.listeners.push(() => this.element.removeEventListener(eventType, fn));
    }

    destroy(): void {
        this.listeners.forEach(stopListen => stopListen());
    }
}
