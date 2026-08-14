import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config.ts'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization

        if (!header) {
            return res.send("access denied: no token provided")
        }
        if (!header.startsWith('Bearer ')) {
            return res.send("Invalid format")
        }

        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, config.jwtSecret)

        if (!decoded) {
            return res.send("incorrect token")
        }
        console.log(decoded)
        next()

    } catch (err) {
        next(err)
    }
}
