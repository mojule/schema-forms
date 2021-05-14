import { SchemaTemplate } from '../../types';
import { JSONSchema7 } from 'json-schema';
export declare const ConstDecorator: (_document: Document, stringOrNumberTemplate: SchemaTemplate) => (schema?: JSONSchema7, name?: string, value?: string | number | undefined, isRequired?: boolean) => HTMLElement;
