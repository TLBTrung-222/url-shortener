import { body } from 'express-validator'

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
        .withMessage('Password must be at least 6 characters long')
]

// export const urlCodeValidationRules = [
//     param('urlCode').isString().withMessage('URL code must be a string')
// ]
