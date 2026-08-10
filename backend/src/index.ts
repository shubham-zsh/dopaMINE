import express, { Request, Response } from "express"

const app = express()

const port: number = 3000;

app.get('/ping', (req: Request, res: Response): void => {
    res.send("pong")
});

app.listen(port, () => {
    console.log("server running")
})

app.post('/otp', )
