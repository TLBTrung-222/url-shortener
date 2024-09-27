import express from 'express'
import databaseLoader from './db'
import expressLoader from './express'
const app = express()

const appLoader = async () => {
    expressLoader(app)
    await databaseLoader()
}

export { appLoader, app }
