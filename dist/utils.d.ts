import { SchemaMetaData } from './types';
export declare const exclusiveClosest: (el: HTMLElement, selector: string) => Element | null | undefined;
export declare const inclusiveSelect: (el: HTMLElement, selector: string) => Element | null;
export declare const isContainer: ({ schema }: SchemaMetaData) => true | import("json-schema").JSONSchema4[] | undefined;
export declare const isRequired: (meta: SchemaMetaData) => boolean;
