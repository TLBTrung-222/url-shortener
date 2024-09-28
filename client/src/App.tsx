import { Box } from '@mui/material'
import InputForm from './components/InputForm'
import UrlList from './components/UrlList'

function App() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>URL Shortener</h1>
            <InputForm />
            <UrlList />
        </Box>
    )
}

export default App
