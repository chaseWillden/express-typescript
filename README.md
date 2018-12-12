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