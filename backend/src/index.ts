import express, { Request, Response } from "express"
import { config } from './config.ts'
import mongoose from "mongoose";

const app = express()

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

app.get('/ping', (req: Request, res: Response): void => {
    res.send("pong")
});

app.listen(config.port, () => {
    console.log("server running")
})

app.post('/signup', async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body;

    if (!email && !password) {
        res.send("pls provide credentials")
        return;
    }

})
