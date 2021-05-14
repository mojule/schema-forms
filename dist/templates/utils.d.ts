import { JSONSchema7 } from 'json-schema';
import { TypedFormEntry } from '../types';
export declare const getTitle: (schema: JSONSchema7, name?: string, fallback?: string) => string;
export declare const getChildName: (name: string, key: any) => string;
export declare const H: <K extends keyof HTMLElementTagNameMap>(document: Document, name: K) => (attributes?: {
    [key: string]: any;
}, ...children: Node[]) => HTMLElementTagNameMap[K];
export declare const Form: (document: Document) => (attributes?: {
    [key: string]: any;
}, ...children: Node[]) => HTMLFormElement;
export declare const getEntries: (form: HTMLFormElement, allowEmptyValue?: boolean) => TypedFormEntry[];
export declare const keyToJsonPointer: (key: string) => string;
export declare const entriesToPointers: (entries: TypedFormEntry[]) => TypedFormEntry[];
