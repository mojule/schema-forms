import { Templates } from '../../types';
import { JSONSchema7 } from 'json-schema';
export declare const ArrayListApi: (document: Document, container: HTMLElement, schema: JSONSchema7, templates: Partial<Templates>) => ArrayApi;
export interface ArrayApi {
    readonly count: number;
    clear: () => void;
    add: (value?: any) => number;
    remove: (index: number) => void;
}
