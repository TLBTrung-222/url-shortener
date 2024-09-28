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

export class ApiError extends Error {
    public statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}
