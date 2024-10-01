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
        .withMessage('Password must be at least 6 characters long'),
    body('expireAt')
        .optional()
        .custom((expireAt) => {
            if (!expireAt) return true
            const date = new Date(expireAt)
            const now = new Date()
            return !isNaN(date.getTime()) && date.getTime() >= now.getTime() // Check if it's a valid date
        })
        .withMessage('Expire time must be a date and not in the past')
    // .isDate()
]

// export const urlCodeValidationRules = [
//     param('urlCode').isString().withMessage('URL code must be a string')
// ]
