import app from './app'
import databaseLoader from './app/db'

const PORT = process.env.PORT || 3000

const bootstrap = async () => {
    await databaseLoader()
    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`)
    })
}

bootstrap()
