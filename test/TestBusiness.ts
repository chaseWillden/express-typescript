import { Inject } from '../src/decorators'

@Inject
export class TestBusiness {
  getData() {
    return 'data'
  }
}