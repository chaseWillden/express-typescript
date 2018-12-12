import routeStore from './RouteStore'
import { GenericClassDecorator, IType } from './decorators'

/**
 * Registering a route for express
 * @param path
 */
export const Route = (path: string = ''): GenericClassDecorator<IType<any>> => {
  return (target: IType<any>) => {
    routeStore.addClass(target, path)
  }
}
