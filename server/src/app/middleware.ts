import { NextFunction, Request, Response } from 'express'
import { ApiError, ApiResponse } from '../types'

export const errorMiddleware = (
    error: ApiError | Error | undefined,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('[error middleware] error: ', error)
    let status = 500
    if (error instanceof ApiError) {
        status = error.statusCode
    }
    const errorMessage = error?.message || 'Internal Server Error'
    console.log('hello error', errorMessage)
    const response: ApiResponse = { success: false, error: errorMessage }
    res.status(status).json(response)
}
