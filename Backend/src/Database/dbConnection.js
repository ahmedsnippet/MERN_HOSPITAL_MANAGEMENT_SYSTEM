import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`, {
            dbName: "MERN_AHMED_MEDICAL_CENTER"
        })
        console.log(`CONNECTED TO MONGODB AT PORT : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`SOME ERROR OCCUR WHILE CONNECTING TO DATABASE : ${error}`)
    }
}
export default connectDB