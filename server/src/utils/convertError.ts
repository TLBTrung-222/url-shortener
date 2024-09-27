import { NextFunction } from 'express'
import { ApiError } from '../types'

/**
 * 'Convert' the error to ApiError -> pass it to error middleware
 * @param error
 * @param next
 */
const handleApiError = (error: any, next: NextFunction) => {
    return next(
        error instanceof ApiError
            ? error
            : new ApiError((error as Error).message, 500)
    )
}

export default handleApiError
