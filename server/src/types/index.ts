import { NextFunction, Request, Response } from 'express'

export type Controller = (
    req: Request,
    res: Response,
    next: NextFunction
) => any

export interface ApiResponse {
    success: boolean

    // use for error
    error?: string

    // use for success
    message?: string
    data?: any
}
