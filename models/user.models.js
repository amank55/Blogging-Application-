import { Schema } from "mongoose";

const userschema = new Schema({
    fullname: {
        type: String,
        required : true
    }, 
    email: {
        type: String,
        required : true,
        unique: true
    },
    salt : {
        type: String,
        required : true,
    },
    password : {
        type: String,
        required : true,
    },
    profileImage: {
        type: String,
        default: "/images/download.png"
    }

}, {timestamps: true})