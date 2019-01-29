import { JSONSchema4 } from 'json-schema';
export declare const schemaToDom: (schema: JSONSchema4, document: Document, templates?: {
    booleanEditor: import("../types").Template;
    constEditor: import("../types").Template;
    container: import("../types").Template;
    editor: import("../types").Template;
    enumEditor: import("../types").Template;
    numberEditor: import("../types").Template;
    stringEditor: import("../types").Template;
}) => HTMLDivElement;
