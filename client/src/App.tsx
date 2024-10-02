import { Container, Typography } from '@mui/material'
import InputForm from './components/InputForm'
import UrlList from './components/UrlList'

function App() {
    return (
        <Container
            maxWidth="lg"
            sx={{ mt: 4, textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: 2, padding: 4 }}
        >
            <Typography variant="h2" gutterBottom>
                URL Shortener
            </Typography>
            <InputForm />
            <UrlList />
        </Container>
    )
}

export default App
