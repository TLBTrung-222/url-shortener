import { NextFunction, Request, Response } from 'express'
import { ApiError, ApiResponse } from '../types'
import { validationResult } from 'express-validator'

export const errorMiddleware = (
    error: ApiError | Error | undefined,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let status = 500
    if (error instanceof ApiError) {
        status = error.statusCode
    }
    const errorMessage = error?.message || 'Internal Server Error'
    const response: ApiResponse = { success: false, error: errorMessage }
    res.status(status).json(response)
}

export const handleValidatationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors: string[] = []
    errors.array().map((err) => extractedErrors.push(err.msg))

    throw new ApiError(extractedErrors.join(', '), 422)
}
