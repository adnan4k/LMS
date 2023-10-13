import mongoose from "mongoose";

const InstructorSchema = mongoose.Schema({
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
    
})

export const Instructor =  mongoose.model("Instructor",InstructorSchema);