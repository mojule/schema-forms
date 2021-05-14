import { JSONSchema7 } from 'json-schema';
import { SchemaTemplate } from '../../types';
export declare const LabelDecorator: (document: Document, inputTemplate: SchemaTemplate, isSuffix?: boolean) => (schema?: JSONSchema7, name?: string, value?: any, isRequired?: boolean) => HTMLElement;
