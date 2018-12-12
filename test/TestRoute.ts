import { AppRouter } from '../src/AppRouter'
import { Route } from '../src/RouteDecorator'
import { TestBusiness } from './TestBusiness'
import { Get } from '../src/MethodDecorators'

@Route('test')
export default class TestRoute extends AppRouter {
  constructor(
    private testBusiness: TestBusiness
  ) { 
    super()
  }

  @Get('b')
  async getData() {
    return this.testBusiness.getData()
  }
}