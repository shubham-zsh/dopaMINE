import express, { NextFunction, Request, Response } from "express";
import { OTP } from "../model/otp.ts";
import bcrypt from 'bcrypt';

const router = express.Router();


router.post('/otp/request', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { email } = req.body;

        if (!email) {
            return res.send("please your email")
        }

        const code: number = Math.floor(Math.random() * 900000) + 100000;
        console.log(code)

        const hashed = await bcrypt.hash(String(code), 10)

        const otpCreated = await OTP.create({
            email: email,
            hashedCode: hashed,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            used: false
        })

        if (!otpCreated) {
            return res.send("something went wrong")
        }

        return res.send({ msg: "otp generated succesfully", code })

    } catch (err) {
        next(err)
    }
})

router.post('/otp/verify', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { otp, email } = req.body;

        if (!otp || !email) {
            return res.send("invalid credentials")
        }

        const getOtp = await OTP.findOne({ email, used: false })

        if (!getOtp) {
            return res.send("failed to fetch")
        }

        if (new Date > getOtp.expiresAt) {
            return res.send("Otp is expired")
        }

        const isOtpTrue = await bcrypt.compare(otp, getOtp.hashedCode)

        if (!isOtpTrue) {
            return res.send("invalid otp")
        }

        getOtp.used = true;
        await getOtp.save();

        return res.send("logged in successfully")

    } catch (err) {
        next(err)
    }
})

export default router
