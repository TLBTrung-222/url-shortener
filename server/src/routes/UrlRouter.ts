import express from 'express'
import * as UrlController from '../controllers/UrlController'
import { shortenUrlValidationRules } from '../utils/validationRules'
import { handleValidatationErrors } from '../app/middleware'
const UrlRouter = express.Router()

UrlRouter.get('/', UrlController.getUrls)
UrlRouter.post(
    '/',
    shortenUrlValidationRules,
    handleValidatationErrors,
    UrlController.shortenUrl
)
UrlRouter.delete('/', UrlController.deleteUrls)
UrlRouter.post('/:urlCode/password', UrlController.getUrlWithPassword)
UrlRouter.get('/:urlCode', UrlController.isRequirePassword)

export default UrlRouter
