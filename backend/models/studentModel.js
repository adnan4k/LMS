import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    schedule:[{
        type:mongoose.Types.ObjectId,
        ref:"Schedule"
    }],
    courses:[{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    }],
    
})

export const Student =  mongoose.model("Student",StudentSchema);