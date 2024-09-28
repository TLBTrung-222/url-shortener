import express from 'express'
import * as UrlController from '../controllers/UrlController'
import { urlValidationRules } from '../utils/validationRules'
import { handleValidatationErrors } from '../app/middleware'
const UrlRouter = express.Router()

UrlRouter.get('/', UrlController.getUrls)
UrlRouter.post(
    '/',
    urlValidationRules,
    handleValidatationErrors,
    UrlController.shortenUrl
)
UrlRouter.delete('/', UrlController.deleteUrls)
UrlRouter.get('/:urlCode', UrlController.redirectUrl)

export default UrlRouter
