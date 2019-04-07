import { JSONSchema4 } from 'json-schema';
import { Templates } from './types';
export * from './templates/api/array-list';
export * from './templates/decorators/fieldset';
export * from './templates/decorators/format';
export * from './templates/decorators/label';
export * from './templates/decorators/mutable-array-list';
export * from './templates/types/array';
export * from './templates/types/boolean';
export * from './templates/types/number';
export * from './templates/types/object';
export * from './templates/types/string';
export * from './templates/types/array/array-item';
export * from './templates/types/array/array-list';
export * from './templates/types/array/tuple';
export * from './templates/types';
export * from './templates/utils';
export * from './templates';
export declare const SchemaToFormElements: (templates: Partial<Templates>) => (schema: JSONSchema4, name?: string, value?: any) => HTMLElement;
