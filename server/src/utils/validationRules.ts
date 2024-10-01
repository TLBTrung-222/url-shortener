import { body, param } from 'express-validator'
import UrlModel from '../models/url.model'

export const shortenUrlValidationRules = [
    body('originalUrl')
        .isURL()
        .withMessage('Invalid URL format')
        .notEmpty()
        .withMessage('URL is required'),
    body('password')
        .optional()
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('expireAt')
        .optional()
        .custom((expireAt) => {
            if (!expireAt) return true
            const date = new Date(expireAt)
            const now = new Date()
            return !isNaN(date.getTime()) && date.getTime() >= now.getTime() // Check if it's a valid date
        })
        .withMessage('Expire time must be a date and not in the past'),
    body('customCode')
        .optional()
        .isString()
        .withMessage('Custom code must be a string')
        .isLength({ max: 255 })
        .withMessage('Custom code too long')
        .custom(async (customCode) => {
            const exsitCustomCode = await UrlModel.findOne({
                urlCode: customCode
            })
            if (exsitCustomCode)
                throw new Error('The custom code already been used')
        })
]

export const urlCodeValidationRules = [
    param('urlCode').isString().withMessage('urlCode must be a string').escape()
]
// export const urlCodeValidationRules = [
//     param('urlCode').isString().withMessage('URL code must be a string')
// ]
