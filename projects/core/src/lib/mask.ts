export class Mask {
    constructor(private readonly elementRef: HTMLInputElement | HTMLTextAreaElement) {
        this.elementRef.value = this.elementRef.nodeName;
    }
}
