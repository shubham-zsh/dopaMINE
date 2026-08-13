import express, { Request, Response } from "express";
import authRouter from './auth/auth.route.ts';
import mongoose from "mongoose";
import { config } from "./config.ts";

const app = express()
const port: number = 3004;

app.use(express.json())

async function start() {
    try {
        const connection = await mongoose.connect(config.mongoUri)
        console.log("connection Successfull...")

    } catch (err) {
        console.error("connection failed...")
        process.exit(1)
    }
}
start()

app.use('/auth', authRouter)

app.get('/ping', (req: Request, res: Response): void => {
    res.send("pong")
});

app.listen(port, () => {
    console.log("server running")
})

