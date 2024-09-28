import * as React from 'react'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { shortenUrl } from '../services/UrlService'

function InputForm() {
    const [state, setState] = React.useState({
        isError: false,
        errorMessage: null as string | null,
        isSuccess: false,
        isLoading: false,
        shortUrl: null as string | null
    })

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
                shortUrl: apiResponse.data.shortUrl
            })
            /* eslint-disable @typescript-eslint/no-explicit-any */
        } catch (error: any) {
            setState({
                isError: true,
                errorMessage: error.message,
                isSuccess: false,
                isLoading: false,
                shortUrl: null
            })
        }
    }

    const handleCopyToClipboard = () => {
        if (state.shortUrl) {
            navigator.clipboard.writeText(state.shortUrl)
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
            {state.isSuccess && (
                <Box sx={{ color: 'green', mt: 2 }}>
                    URL shortened successfully! <br />
                    <a href={state.shortUrl || '/'} target="_blank" rel="noopener noreferrer">
                        {state.shortUrl}
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
