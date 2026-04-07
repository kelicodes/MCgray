import mongoose from "mongoose";
import dotenv from "dotenv"

const DB= async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log("DB connected")
    } catch (error) {
        console.log("Error in DB cobbection",error)
        process.exit(1)
    }
}

export default DB