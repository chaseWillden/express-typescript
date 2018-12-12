import express from 'express'
import { AppRouter } from './AppRouter'

interface IOptions {
  port: number
}

class Server {
  app: any
  
  private options: IOptions = {
    port: 3030
  }
  private optionsSet = false

  constructor() {
    this.app = express()
  }

  setOptions(options: IOptions = this.options) {
    this.options = options
    this.app.set('port', options.port)
  }

  run() {
    console.log(`Listening on port ${this.options.port}`)
    this.app.listen(this.options.port)
  }

  /**
   * Register a new express route
   * @param route 
   */
  registerRoute(route: any | any[]) {
    // Ignore on purpose, just need it imported
  }

  /**
   * Register a new route
   * @param routePath the route the path will be
   * @param route the route extended from app router
   */
  __registerRoute__(routePath: string, route: AppRouter) {
    this.app.use(routePath, route.router)
  }
}

export const server = new Server()
