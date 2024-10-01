import { ApiResponse } from '../types'

export const shortenUrl = async (originalUrl: string, password: string | null, expireAt: Date | null) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/urls`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ originalUrl, password, expireAt })
    })

    return handleApiResponse(response)
}

export const getUrls = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/urls`, { method: 'GET' })

    return handleApiResponse(response)
}

export const checkPasswordRequired = async (urlCode: string) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/urls/${urlCode}`, { method: 'GET' })

    return handleApiResponse(response)
}

export const submitPassword = async (urlCode: string, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/urls/${urlCode}/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    })
    return handleApiResponse(response)
}

// Helper function to handle API response
const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
    const responseBody: ApiResponse = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.error || 'Unknown error occurred while fetching data')
    }
    return responseBody
}
