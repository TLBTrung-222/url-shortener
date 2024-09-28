import express, { Application } from 'express'
import cors from 'cors'

const allowedOrigins = ['http://localhost:5173']

const expressLoader = (app: Application) => {
    app.use(cors())

    // parse json request body
    app.use(express.json())

    // parse urlencoded request body
    app.use(express.urlencoded())
}

export default expressLoader
