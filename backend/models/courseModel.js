import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
    coursename:{
        type:String,
        required:true
    },
    c_code:{
        type:String,
        required:true
    },
    credithour:{
        type:String,
        required:true
    },
instructors:[{
    type:mongoose.Types.ObjectId,
    ref:"Instructor"
}],
students:[{
    type:mongoose.Types.ObjectId,
    ref:"Student"
}],
exams:[{
    type:mongoose.Types.ObjectId,
    ref:"Exam"
}],
department:[{
    type:mongoose.Types.ObjectId,
    ref:"Department"
}],
schedule:[{
    type:mongoose. Types.ObjectId,
    ref:"Schedule"
}]
})
export const Course =  mongoose.model("Course",CourseSchema);