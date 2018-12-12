import 'reflect-metadata'
import { IType } from './Decorators'

/**
 * The Injector stores services and resolves requested instances.
 */
export class Injector {
  /**
   * Resolves instances by injecting required services
   * @param {IType<any>} target
   * @returns {T}
   */
  static resolve<T>(target: IType<any>): T {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    const tokens = Reflect.getMetadata('design:paramtypes', target) || []
    const injections = tokens.map(token => Injector.resolve<any>(token))

    return new target(...injections)
  }
}
