import mongoose from "mongoose";

const DepartmentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },    
    description:{
        type:String,
    },
    courses:[{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    }],
    instructors:[{
        type:mongoose.Types.ObjectId,
        ref:"Instructor"
    }],
    students:[{
        type:mongoose.Types.ObjectId,
        ref:"Student"
    }]
    
})

export const Department =  mongoose.model("Department",DepartmentSchema);