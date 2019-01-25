import { SchemaMetaData, FormTemplates, FormElementDecorators } from '../types';
import { JSONSchema4 } from 'json-schema';
export declare const AddSchema: (parentMap: Map<JSONSchema4, HTMLElement>, fragment: DocumentFragment, templates: FormTemplates, decorators: FormElementDecorators) => (meta: SchemaMetaData) => void;
