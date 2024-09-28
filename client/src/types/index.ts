/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse {
    success: boolean
    message?: string
    data?: any
    error?: string
}

export interface UrlList {
    urls: [
        {
            originalUrl: string
            urlCode: string
            createdAt: Date
        }
    ]
}
