import express from 'express'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fileupload from 'express-fileupload'
import userRouter from './Routes/userRoute.js'
import messageRoute from './Routes/messageRoute.js'
import appointmentRoute from './Routes/appointmentRoute.js'
import { errorHandler } from './Middlewares/errorMiddlerware.js'

const app = express()
config({
    path: "./.env"
})

app.use(cors({
    origin: [process.env.FRONT_END],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/message", messageRoute)
app.use("/api/v1/appointment", appointmentRoute)

app.use(errorHandler)
export default app