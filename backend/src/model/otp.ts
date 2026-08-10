import { Schema, model } from 'mongoose'

interface otpI {
    email: string,
    hashedCode: string,
    expiresAt: Date,
    used: boolean
}

const otpSchema = new Schema<otpI>(
    {
        email: {
            type: String,
            required: true,
        },
        hashedCode: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true
        },
        used: {
            type: Boolean,
            required: true,
            default: false
        }

    })

export const OTP = model('OTP', otpSchema)
