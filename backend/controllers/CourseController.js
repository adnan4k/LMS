//all course

import { Course } from "../models/courseModel.js";
export const allCourse = async(req,res) =>{
    let courses;
    try {
        courses = await Course.find()
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
    if(!courses){
        return res.status(404).json({message:"no course"})
    }
    return res.status(200).json(courses);
}