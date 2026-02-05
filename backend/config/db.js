import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

export const conectdb = async () => {
    try{
       const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch (error){
        console.log(error)
        process.exit(1)

    }
}