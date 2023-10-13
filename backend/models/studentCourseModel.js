import mongoose from "mongoose";

const StudentCourseSchema = mongoose.Schema({
    student:{
        type:mongoose.Types.ObjectId,
        ref:"Student"
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    },
    instructor:{
        type:mongoose.Types.ObjectId,
        ref:"Instructor"
    },
    
})

export const StudentCourse =  mongoose.model("StudentCourse",StudentCourseSchema);