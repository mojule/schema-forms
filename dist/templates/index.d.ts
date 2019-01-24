export declare const Templates: (document: Document) => {
    booleanEditor: ({ schema }: import("../types").SchemaMetaData) => HTMLInputElement;
    constEditor: ({ schema }: import("../types").SchemaMetaData) => HTMLInputElement;
    container: (meta: import("../types").SchemaMetaData) => HTMLDivElement;
    editor: (meta: import("../types").SchemaMetaData) => HTMLDivElement;
    enumEditor: (meta: import("../types").SchemaMetaData) => HTMLDivElement | HTMLSelectElement;
    numberEditor: (meta: import("../types").SchemaMetaData) => HTMLInputElement;
    stringEditor: (meta: import("../types").SchemaMetaData) => HTMLInputElement | HTMLTextAreaElement;
};
