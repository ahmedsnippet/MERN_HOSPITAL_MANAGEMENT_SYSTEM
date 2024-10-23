import mongoose from "mongoose";
import validator from 'validator'

const messageSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "firstName is Required"],
        },
        lastName: {
            type: String,
            required: [true, "lastName is Required"],
        },
        email: {
            type: String,
            required: [true, "Email Is Required"],
            validate: [validator.isEmail, "Please Provide a Valid Email"],
        },
        phone: {
            type: String,
            required: [true, "Phone Is Required"],
            minLength: [11, "Phone Must Contain 11 Digits"],
            maxLength: [11, "Phone Must Contain 11 Digits"],
        },
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
export const Message = mongoose.model("Message", messageSchema)