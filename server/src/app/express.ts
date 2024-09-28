import express, { Application } from 'express'
import cors from 'cors'

const allowedOrigins = ['http://localhost:5173']

const expressLoader = (app: Application) => {
    app.use(
        cors({
            origin: function (origin: any, callback: any) {
                console.log('Origin:', origin) // Log the origin of each request
                // Allow requests with no origin (like mobile apps or curl requests)
                if (!origin) return callback(null, true)
                if (allowedOrigins.indexOf(origin) === -1) {
                    var msg =
                        'The CORS policy for this site does not allow access from the specified Origin.'
                    return callback(new Error(msg), false)
                }
                return callback(null, true)
            }
        })
    )

    // parse json request body
    app.use(express.json({ limit: '50mb' }))

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true, limit: '50mb' }))
}

export default expressLoader
