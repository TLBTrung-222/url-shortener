import express from 'express'
import expressLoader from './express'
import routesLoader from '../routes'
import { errorMiddleware } from './middleware'
const app = express()

const appLoader = () => {
    expressLoader(app)
    routesLoader(app)
    app.use(errorMiddleware)
}

appLoader()

export default app
