export declare const document: Document, FormData: {
    new (form?: HTMLFormElement | undefined, submitter?: HTMLElement | null | undefined): FormData;
    prototype: FormData;
}, Event: {
    new (type: string, eventInitDict?: EventInit | undefined): Event;
    prototype: Event;
    readonly NONE: 0;
    readonly CAPTURING_PHASE: 1;
    readonly AT_TARGET: 2;
    readonly BUBBLING_PHASE: 3;
};
export declare const form: (attributes?: {
    [key: string]: any;
}, ...children: Node[]) => HTMLFormElement;
