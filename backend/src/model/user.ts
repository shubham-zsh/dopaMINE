import { Schema, model } from 'mongoose'

interface userI {
    email: string,
    name: string,
    timezone: string,
}

const userSchema = new Schema<userI>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        name: {
            type: String,
            required: true,
        },
        timezone: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const User = model('User', userSchema);
 

