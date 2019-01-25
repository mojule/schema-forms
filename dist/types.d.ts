import { JSONSchema4 } from 'json-schema';
export declare type NamedFormElement = (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement);
export interface SchemaMetaData {
    schema: JSONSchema4;
    pointer: string;
    root: JSONSchema4;
    parentPointer?: string;
    parentKeyword?: string;
    parentSchema?: JSONSchema4;
    keyIndex?: string | number;
}
export declare type Template = (meta: SchemaMetaData) => HTMLElement;
export declare type TemplateFactory = (document: Document) => Template;
export interface FormTemplates {
    container: Template;
    editor: Template;
    constEditor: Template;
    enumEditor: Template;
    stringEditor: Template;
    numberEditor: Template;
    booleanEditor: Template;
}
export declare type ElementDecorator = (element: HTMLElement) => void;
export interface FormElementDecorators {
    fieldsetDecorator: ElementDecorator;
    labelDecorator: ElementDecorator;
    nameDecorator: ElementDecorator;
}
