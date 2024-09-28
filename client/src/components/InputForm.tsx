import * as React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { shortenUrl } from '../services/UrlService'

function InputForm() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // create FormData
        const formData = new FormData(e.currentTarget)
        const originalUrl = formData.get('url')
        console.log(originalUrl)

        // call BE API
        const data = await shortenUrl(originalUrl)
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

            <Button type="submit" variant="contained">
                Submit
            </Button>
        </Box>
    )
}

export default InputForm
