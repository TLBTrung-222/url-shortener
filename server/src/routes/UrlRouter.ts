import express from 'express'
import * as UrlController from '../controllers/UrlController'
const UrlRouter = express.Router()

UrlRouter.get('/', UrlController.getUrls)
UrlRouter.post('/', UrlController.shortenUrl)
UrlRouter.delete('/', UrlController.deleteUrls)
UrlRouter.get('/:urlCode', UrlController.redirectUrl)

export default UrlRouter
