import express, { Application } from 'express'
import { errorMiddleware } from './middleware'

const expressLoader = (app: Application) => {
    // parse json request body
    app.use(express.json({ limit: '50mb' }))

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true, limit: '50mb' }))
}

export default expressLoader
