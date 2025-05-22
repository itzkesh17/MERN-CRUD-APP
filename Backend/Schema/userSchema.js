import mongoose,{ Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    phonenumber:{
        type: Number,
        required: true,
        unique: true
    },
    city:{
        type: String,
        required: true,
        unique: true
    }
})

const user = mongoose.model("usersData", userSchema)

export default user;