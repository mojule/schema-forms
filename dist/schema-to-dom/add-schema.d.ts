import { SchemaMetaData, FormTemplates, FormElementDecorators } from '../types';
import { JSONSchema4 } from 'json-schema';
export declare const AddSchema: (parentMap: Map<JSONSchema4, HTMLElement>, rootElement: HTMLElement, templates: FormTemplates, decorators: FormElementDecorators) => (meta: SchemaMetaData) => void;
