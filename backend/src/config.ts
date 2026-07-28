import dotenv from 'dotenv'
dotenv.config()

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required in .env')
}

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required in .env')
}

export const config = {

    mongoUri: process.env.MONGO_URI,
    port: process.env.PORT || 3003,
    jwtSecret: process.env.JWT_SECRET
}
