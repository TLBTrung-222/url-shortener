import { NextFunction, Request, Response } from 'express'
import { ApiError, ApiResponse } from '../types'

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
