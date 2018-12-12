import 'reflect-metadata'
// import EventListener from './event-listener'

/**
 * Type for what object is instances of
 */
export interface IType<T> {
  new(...args: any[]): T
}

/**
 * Generic `ClassDecorator` type
 */
export type GenericClassDecorator<T> = (target: T) => void

/**
 * Generic 'property descriptor' type
 */
export type GenericPropertyDecorator<T> = (target: T, propertyKey: string, descriptor: PropertyDescriptor) => void

/**
 * Generic 'parameter descriptor' type
 */
export type GenericParameterDecorator<T> = (target: T, propertyKey: string, index: number) => void

/**
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Inject = (target: IType<any>) => {
  // Ignore
  // EventListener.addListener(target)
}

/**
 * Is required field
 */
// export declare function Required(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void;

export function Required(target: any, propertyName: string, propertyDescriptor?: PropertyDescriptor): void {
// Ignore
}
