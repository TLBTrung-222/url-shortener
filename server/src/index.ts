import { app, appLoader } from './app'

const PORT = process.env.PORT || 3000

const bootstrap = async () => {
    await appLoader()
    app.listen(PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${PORT}`)
    })
}

bootstrap()
