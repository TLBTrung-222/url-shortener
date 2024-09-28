import * as React from 'react'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { shortenUrl } from '../services/UrlService'

function InputForm() {
    const [state, setState] = React.useState({
        isError: false,
        errorMessage: null as string | null,
        isSuccess: false,
        isLoading: false,
        uniqueCode: null as string | null
    })
    const [shortenedUrl, setShortenedUrl] = React.useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // create FormData
        const formData = new FormData(e.currentTarget)
        const originalUrl = formData.get('url')

        // call BE API
        try {
            setState((prevState) => ({ ...prevState, isLoading: true }))

            const apiResponse = await shortenUrl(originalUrl as string)

            console.log('data from response body: ', apiResponse.data)
            setState({
                isError: false,
                errorMessage: null,
                isSuccess: true,
                isLoading: false,
                uniqueCode: apiResponse.data.uniqueCode
            })
            setShortenedUrl(`${import.meta.env.VITE_CLIENT_URL}/${apiResponse.data.uniqueCode}`)
            /* eslint-disable @typescript-eslint/no-explicit-any */
        } catch (error: any) {
            setState({
                isError: true,
                errorMessage: error.message,
                isSuccess: false,
                isLoading: false,
                uniqueCode: null
            })
        }
    }

    const handleCopyToClipboard = () => {
        if (shortenedUrl) {
            navigator.clipboard.writeText(shortenedUrl)
            alert('Short URL copied to clipboard!')
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
            <TextField
                sx={{ width: 500, maxWidth: '100%', m: 2 }}
                fullWidth
                name="url"
                label="Paste your long url here..."
            />

            {state.isError && <Box sx={{ color: 'red', mt: 2 }}>{state.errorMessage}</Box>}
            {state.isSuccess && shortenedUrl && (
                <Box sx={{ color: 'green', mt: 2 }}>
                    URL shortened successfully! <br />
                    <a href={shortenedUrl || '/'} target="_blank" rel="noopener noreferrer">
                        {shortenedUrl}
                    </a>
                    <Button onClick={handleCopyToClipboard} sx={{ ml: 2 }}>
                        Copy to Clipboard
                    </Button>
                </Box>
            )}
            <Button type="submit" variant="contained" sx={{ m: 2 }} disabled={state.isLoading}>
                {state.isLoading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
        </Box>
    )
}

export default InputForm
