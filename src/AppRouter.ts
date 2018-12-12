import { Router, Request, Response as ExpressResponse, NextFunction } from 'express'
import asyncMiddleware from './AsyncMiddleware'
import { KeyValuePair } from './Types'
import ResponseError from './ResponseError'

export class AppRouter {
  router: Router

  routes = {
    GET: {},
    POST: {},
    PATCH: {},
    PUT: {},
    DELETE: {}
  }

  constructor() {
    this.router = new Router()
  }

  /**
   * Process the route
   * @param req 
   * @param res 
   * @param next 
   */
  async processRoute(req: Request, res: ExpressResponse, next: NextFunction) {
    const { params, query, body } = req
    const method = req.method.toUpperCase()
    const route = req.route.path
    const callbackMethod = this.routes[method]

    if (!callbackMethod[route]) {
      throw new Error(`${route} not found`)
    }

    try {
      const callback = callbackMethod[route]
      const results = await callback(params, query, body, { req, res })
      res.status(200).send(results)
    } catch (ex) {
      if (ex instanceof ResponseError) {
        res.status(ex.status).send(ex.data)
      } else {
        res.status(500).send(ex.message)
      }
    }
  }

  /**
   * Perform a get request
   * @param path
   * @param callback
   */
  getRequest(path: string, callback: (params: KeyValuePair, query: KeyValuePair, body: any) => void) {
    this.routes.GET[path] = callback
    this.router.get(path, asyncMiddleware(this.processRoute.bind(this)))
  }

  /**
   * Perform a post request
   * @param path 
   * @param callback 
   */
  postRequest(path: string, callback: (params: KeyValuePair, query: KeyValuePair, body: any) => void) {
    this.routes.POST[path] = callback
    this.router.post(path, asyncMiddleware(this.processRoute.bind(this)))
  }

  /**
   * Perform a delete request
   * @param path 
   * @param callback 
   */
  deleteRequest(path: string, callback: (params: KeyValuePair, query: KeyValuePair, body: any) => void) {
    this.router.DELETE[path] = callback
    this.router.delete(path, asyncMiddleware(this.processRoute.bind(this)))
  }

  /**
   * Perform a put request
   * @param path 
   * @param callback 
   */
  putRequest(path: string, callback: (params: KeyValuePair, query: KeyValuePair, body: any) => void) {
    this.router.PUT[path] = callback
    this.router.put(path, asyncMiddleware(this.processRoute.bind(this)))
  }

  /**
   * Perform a patch request
   * @param path 
   * @param callback 
   */
  patchRequest(path: string, callback: (params: KeyValuePair, query: KeyValuePair, body: any) => void) {
    this.router.PATCH[path] = callback
    this.router.patch(path, asyncMiddleware(this.processRoute.bind(this)))
  }  
}
