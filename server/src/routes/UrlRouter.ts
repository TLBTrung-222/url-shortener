import express from 'express'
import * as UrlController from '../controllers/UrlController'
import {
    shortenUrlValidationRules,
    urlCodeValidationRules
} from '../utils/validationRules'
import { handleValidatationErrors } from '../app/middleware'
const UrlRouter = express.Router()

UrlRouter.get('/', UrlController.getUrls)
UrlRouter.post(
    '/',
    shortenUrlValidationRules,
    handleValidatationErrors,
    UrlController.shortenUrl
)
UrlRouter.delete('/', UrlController.deleteUrls) // delete all urls
UrlRouter.post(
    '/:urlCode/password',
    urlCodeValidationRules,
    handleValidatationErrors,
    UrlController.getUrlWithPassword
)
UrlRouter.get(
    '/:urlCode',
    urlCodeValidationRules,
    handleValidatationErrors,
    UrlController.isRequirePassword
)

export default UrlRouter
