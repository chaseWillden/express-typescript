# Purpose
express-typescript is an Express wrapper with typescript, annotations, and better route handling.
Let's try to help add structure to these express routes.

# Usage
First build the script
```ts

import { server, AppRouter } from 'express-typescript'

@Route()
class TestRoutes extends AppRouter {

  @Get()
  async sayHello() {
    return 'Hello World'
  }
}

server.registerRoute(TestRoutes)
server.run()

```
Then run the app and go to `localhost:3030`

# Docs
## Define a custom route and custom paths
In the `@Route(pathname)` goes the pathname that will be called. All the methods will be extensions of that path

```ts
import { AppRouter } from 'express-typescript'

@Route('api')
class TestRoutes extends AppRouter {

  @Get()
  async sayHello() {
    return 'Hello World'
  }

  @Get('test')
  async sayTest() {
    return 'Say Test'
  }
}
```
- To access the hello world method, you go to /api.
- To access the say test method, you go to /api/test

## How about a little dependency injection to make things a hair easier?
### Define the business class
```ts
import { Inject } from 'express-typescript'

@Inject
export class TestBusiness {
  getData() {
    return 'data'
  }
}
```

### Inject the business class
```ts
import { AppRouter } from 'express-typescript'
import { TestBusiness } from './business' // or whereever you put it

@Route('api')
class TestRoutes extends AppRouter {

  constructor(private business: TestBusiness) {
    super()
  }

  @Get()
  async getData() {
    return this.business.getData()
  }
}
```