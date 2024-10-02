import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import { submitPassword } from '../services/UrlService'

function Password() {
    const { urlCode } = useParams()
    const [state, setState] = React.useState({
        isLoading: false,
        isSuccess: false,
        error: null as string | null,
        isError: false
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const password = formData.get('password') as string

        try {
            setState((prev) => ({ ...prev, isError: false, isLoading: true }))
            const apiResonse = await submitPassword(urlCode as string, password)
            setState((prev) => ({ ...prev, isLoading: false, isSuccess: true }))
            if (apiResonse.success) {
                window.location.href = apiResonse.data.originalUrl
            } else {
                setState((prev) => ({ ...prev, isError: true, error: apiResonse.error as string }))
            }
        } catch (error) {
            setState((prev) => ({ ...prev, isLoading: false, isError: true, error: 'Error when fetching' }))
        }
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: '#ffffff',
                marginTop: 4
            }}
        >
            <Typography variant="h4" gutterBottom>
                Password
            </Typography>
            <TextField sx={{ width: '300px', mb: 2 }} label="Fill in password" variant="outlined" name="password" />
            <Button type="submit" variant="contained" sx={{ mb: 2 }}>
                Submit
            </Button>
            {state.isLoading && <CircularProgress />}
            {state.isError && (
                <Alert variant="filled" severity="error" sx={{ mt: 2 }}>
                    Password mismatch
                </Alert>
            )}
        </Box>
    )
}

export default Password
