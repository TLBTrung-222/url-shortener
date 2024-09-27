import { Application } from 'express'
import UrlRouter from './UrlRouter'

export default function routesLoader(app: Application) {
    app.use('/urls', UrlRouter)
}
