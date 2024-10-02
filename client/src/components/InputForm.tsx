import * as React from 'react'
import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
    IconButton,
    Tooltip,
    Paper,
    Container,
    InputAdornment
} from '@mui/material'
import { ContentCopy, CheckCircleOutline, Visibility, VisibilityOff } from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { shortenUrl } from '../services/UrlService'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2'
        },
        secondary: {
            main: '#4caf50'
        }
    }
})

function InputForm() {
    const [state, setState] = React.useState({
        isError: false,
        errorMessage: null as string | null,
        isSuccess: false,
        isLoading: false,
        uniqueCode: null as string | null
    })
    const [shortenedUrl, setShortenedUrl] = React.useState<string | null>(null)
    const [copied, setCopied] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const originalUrl = formData.get('url') as string
        const password = formData.get('password') ? (formData.get('password') as string) : null
        const expireAt = new Date(formData.get('expireAt') as string) || null
        const customCode = formData.get('customCode') ? (formData.get('customCode') as string) : null
        try {
            setState((prevState) => ({ ...prevState, isLoading: true }))

            const apiResponse = await shortenUrl(originalUrl, password, expireAt, customCode)

            setState({
                isError: false,
                errorMessage: null,
                isSuccess: true,
                isLoading: false,
                uniqueCode: apiResponse.data.uniqueCode
            })
            setShortenedUrl(`${import.meta.env.VITE_CLIENT_URL}/${apiResponse.data.uniqueCode}`)
        } catch (error: any) {
            setState({
                isError: true,
                errorMessage: error.message || 'Error occurred',
                isSuccess: false,
                isLoading: false,
                uniqueCode: null
            })
        }
    }

    const handleCopyToClipboard = () => {
        if (shortenedUrl) {
            navigator.clipboard.writeText(shortenedUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        autoComplete="off"
                    >
                        <Typography variant="h5" gutterBottom>
                            Put URL here:
                        </Typography>
                        <TextField
                            sx={{ width: '100%', mb: 3 }}
                            fullWidth
                            name="url"
                            label="Paste your long url here..."
                            required
                        />
                        <Typography sx={{ fontStyle: 'italic' }} variant="body1" gutterBottom>
                            (optional) Restrict with password:
                        </Typography>
                        <TextField
                            sx={{ width: '100%', mb: 3 }}
                            fullWidth
                            name="password"
                            label="Fill in password for this url..."
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Typography sx={{ fontStyle: 'italic' }} variant="body1" gutterBottom>
                            (optional) Expire at:
                        </Typography>
                        <TextField
                            type="datetime-local"
                            sx={{ width: '100%', mb: 3 }}
                            fullWidth
                            name="expireAt"
                            inputProps={{
                                autoComplete: 'off'
                            }}
                        />
                        <Typography sx={{ fontStyle: 'italic' }} variant="body1" gutterBottom>
                            (optional) Custom shortcode:
                        </Typography>
                        <TextField
                            sx={{ width: '100%', mb: 3 }}
                            fullWidth
                            name="customCode"
                            inputProps={{
                                autoComplete: 'off'
                            }}
                        />
                        {state.isError && <Box sx={{ color: 'error.main', mt: 2, mb: 2 }}>{state.errorMessage}</Box>}
                        {state.isSuccess && shortenedUrl && (
                            <Box sx={{ color: 'success.main', mt: 2, mb: 2, width: '100%' }}>
                                URL shortened successfully! <br />
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <TextField
                                        fullWidth
                                        value={shortenedUrl}
                                        InputProps={{
                                            readOnly: true
                                        }}
                                    />
                                    <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                                        <IconButton
                                            onClick={handleCopyToClipboard}
                                            color={copied ? 'secondary' : 'default'}
                                        >
                                            {copied ? <CheckCircleOutline /> : <ContentCopy />}
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        )}
                        <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={state.isLoading}>
                            {state.isLoading ? <CircularProgress size={24} /> : 'Submit'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}

export default InputForm
