import { AppRouter } from './AppRouter'
import { IType } from './decorators'
import { Injector } from './Injector'
import asyncMiddleware from './AsyncMiddleware'
import { server } from './Server'

interface IStoreItem {
  path: string
  propertyName: string
  method: string
}

class RouteStore {
  route: {[key: string]: IStoreItem[]} = {}
  registered: {[key: string]: boolean} = {}

  /**
   * Add a class to express
   * @param target
   * @param path
   */
  addClass(target: IType<AppRouter>, path: string) {
    if (this.registered[path]) {
      console.warn(path + ' already registered')
      return
    }

    const instance = Injector.resolve(target) as any

    const className = target.name
    const items = this.route[className]

    if (!items) {
      console.warn('No routes registered with ' + className)
      return
    } else {
      for (const item of items) {
        const method = instance[item.propertyName] as () => void

        if (!method) {
          continue
        }

        const instanceRouter = instance as AppRouter
        instanceRouter.routes[item.method]['/' + item.path] = method.bind(instance)
        instanceRouter.router[item.method.toLowerCase()](
          '/' + item.path,
          asyncMiddleware(instanceRouter.processRoute.bind(instanceRouter)))
      }
    }

    server.__registerRoute__(this.cleanUpRoutePath(path), instance as AppRouter)
    this.registered[path] = true
  }

  /**
   * Add a route to express
   * @param className
   * @param path
   * @param propertyName
   */
  addRoute(className: string, path: string, propertyName: string, method: string) {
    if (!this.route[className]) {
      this.route[className] = []
    }

    this.route[className].push({
      path,
      propertyName,
      method,
    })
  }

  /**
   * Cleanup route path
   * @param path 
   */
  private cleanUpRoutePath(path: string) {
    if (path && path[0] === '/') {
      return path
    }

    return '/' + path
  }
}

const routeStore = new RouteStore()

export default routeStore
