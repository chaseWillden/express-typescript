import { GenericPropertyDecorator } from './decorators'
import routeStore from './RouteStore'

/**
 * Registering a route for express
 * @param path
 */
export const Get = (path: string = ''): GenericPropertyDecorator<any> => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    routeStore.addRoute(target.constructor.name, path, propertyKey, 'GET')
  }
}

/**
 * Registering a route for express
 * @param path
 */
export const Post = (path: string = ''): GenericPropertyDecorator<any> => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    routeStore.addRoute(target.constructor.name, path, propertyKey, 'POST')
  }
}

/**
 * Registering a route for express
 * @param path
 */
export const Delete = (path: string = ''): GenericPropertyDecorator<any> => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    routeStore.addRoute(target.constructor.name, path, propertyKey, 'DELETE')
  }
}

/**
 * Registering a route for express
 * @param path
 */
export const Patch = (path: string = ''): GenericPropertyDecorator<any> => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    routeStore.addRoute(target.constructor.name, path, propertyKey, 'PATCH')
  }
}
