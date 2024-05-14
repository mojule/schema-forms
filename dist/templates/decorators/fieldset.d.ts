import { SchemaTemplate } from '../../types';
import { JSONSchema7 } from 'json-schema';
export declare const FieldsetDecorator: (document: Document, containerTemplate: SchemaTemplate, useLegend?: boolean) => (schema?: JSONSchema7, name?: string, value?: any[]) => HTMLFieldSetElement;
