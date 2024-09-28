import { Box } from '@mui/material'
import InputForm from './components/InputForm'

function App() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>URL Shortener</h1>
            <InputForm />
        </Box>
    )
}

export default App
