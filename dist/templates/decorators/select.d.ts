import { SchemaTemplate } from '../../types';
import { JSONSchema7 } from 'json-schema';
export declare const SelectDecorator: (document: Document, stringTemplate: SchemaTemplate, predicate?: (_schema: JSONSchema7) => boolean) => (schema?: JSONSchema7, name?: string, value?: string | undefined, isRequired?: boolean) => HTMLElement;
