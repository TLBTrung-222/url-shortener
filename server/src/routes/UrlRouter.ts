import express from 'express'
import * as UrlController from '../controllers/UrlController'
const UrlRouter = express.Router()

UrlRouter.post('/', UrlController.shortenUrl)
UrlRouter.get('/:urlCode', UrlController.redirectUrl)

export default UrlRouter
