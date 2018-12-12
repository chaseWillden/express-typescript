import { server } from '../src'
import TestRoute from './TestRoute'

server.registerRoute(TestRoute)

server.run()