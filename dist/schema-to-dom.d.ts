import { JSONSchema4 } from 'json-schema';
import { SchemaMetaData } from './types';
export declare const schemaToDom: (schema: JSONSchema4, document: Document, templates?: {
    booleanEditor: ({ schema }: SchemaMetaData) => HTMLInputElement;
    constEditor: ({ schema }: SchemaMetaData) => HTMLInputElement;
    container: (meta: SchemaMetaData) => HTMLDivElement;
    editor: (meta: SchemaMetaData) => HTMLDivElement;
    enumEditor: (meta: SchemaMetaData) => HTMLDivElement | HTMLSelectElement;
    numberEditor: (meta: SchemaMetaData) => HTMLInputElement;
    stringEditor: (meta: SchemaMetaData) => HTMLInputElement | HTMLTextAreaElement;
}) => DocumentFragment;
