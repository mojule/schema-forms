import { JSONSchema7 } from 'json-schema';
import { Templates, SchemaTemplate } from '../../types';
export declare const MutableArrayListDecorator: (document: Document, Event: any, arrayList: SchemaTemplate, templates: Partial<Templates>) => (schema?: JSONSchema7, name?: string, value?: any[]) => HTMLElement;
export declare const MutableArrayItemDecorator: (document: Document, arrayItem: SchemaTemplate) => (schema?: JSONSchema7, name?: string, value?: any) => HTMLElement;
