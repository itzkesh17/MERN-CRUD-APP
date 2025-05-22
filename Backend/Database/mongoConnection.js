import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const mongoConnection = async()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connnected");
        
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
    
}

export default mongoConnection;

