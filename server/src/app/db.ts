import mongoose from 'mongoose'
import 'dotenv/config'
const MONGO_URL = process.env.MONGO_URL as string

async function databaseLoader() {
    await mongoose.connect(MONGO_URL)
    console.log('[server] Connect to database succesfully...')
}

export default databaseLoader
