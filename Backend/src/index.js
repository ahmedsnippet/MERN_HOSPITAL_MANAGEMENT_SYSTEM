import app from './app.js'
import connectDB from './Database/dbConnection.js'
import { v2 as cloudinary } from "cloudinary"

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`SERVER IS LISTENING AT PORT : ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })


// CLOUDINARY CONFIGURATION
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})