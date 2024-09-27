import express from 'express'
import databaseLoader from './db'
import expressLoader from './express'
import routesLoader from '../routes'
const app = express()

const appLoader = async () => {
    expressLoader(app)
    routesLoader(app)
    await databaseLoader()
}

export { appLoader, app }
