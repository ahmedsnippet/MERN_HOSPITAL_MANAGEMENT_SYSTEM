import { Message } from '../Models/messageModel.js'
import { asyncHandler } from '../Utils/asyncHandler.js'
import { apiResponse } from '../Utils/apiResponse.js'
import { apiError } from '../Middlewares/errorMiddlerware.js'


const sendMessage = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        return next(new apiError("All Field Required", 409));
    }
    const sendMessage = await Message.create({
        firstName,
        lastName,
        email,
        phone,
        message,
    });
    return res
        .status(201)
        .json(new apiResponse(200, sendMessage, "Message Sent Successfully"));
})

const getAllmessages = asyncHandler(async (req, res, next) => {
    const message = await Message.find()

    return res.status(200).json(new apiResponse(200, message))
})

export { sendMessage, getAllmessages }