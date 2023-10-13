import mongoose, { Types } from "mongoose";

const adminSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    departmentId:{
        type:mongoose.Types.ObjectId,
        ref:"Department"
    },
    password:{
        type:String,
        required:true
    }
})

export const Admin =  mongoose.model("Admin",adminSchema);