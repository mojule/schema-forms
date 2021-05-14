import { JSONSchema7 } from 'json-schema';
import { SchemaTemplate } from '../../types';
export declare const TypeDecorator: (_document: Document, inputTemplate: SchemaTemplate) => (schema?: JSONSchema7, name?: string, value?: any[] | undefined, isRequired?: boolean) => HTMLElement;
