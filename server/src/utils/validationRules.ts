import { body, param } from 'express-validator'

export const urlValidationRules = [
    body('originalUrl')
        .isURL()
        .withMessage('Invalid URL format')
        .notEmpty()
        .withMessage('URL is required')
]

// export const urlCodeValidationRules = [
//     param('urlCode').isString().withMessage('URL code must be a string')
// ]
