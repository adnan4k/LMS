import mongoose from "mongoose";
import { Course } from "../models/courseModel.js";
import { Student } from "../models/studentModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Instructor } from "../models/instructorModel.js";
import { Schedule } from "../models/scheduleModel.js";
import { StudentCourse } from "../models/studentCourseModel.js";

//signup 
export const signup = async(req,res,next) =>{

    const {name,email,password}  = req.body;
     
    if ( !password || !email || !name) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
    try {
        const student = new Student({
    
             name:name,
            email:email,
            password:hash,
        })
        const savedStudent = await student.save();
      if (!savedStudent){
      return  res.status(500).json({message: "cannot create there is some error"})
      }

     return res.status(201).json({savedStudent});
    } catch (error) {
        console.log(error)
    }
}

//student login 
export const login = async(req,res,next) =>{
const {email,password} = req.body;
let existingStudent;

if(!email && !password){
return res.status(400).json({message:"enter credentials"})
}
 
try {
     existingStudent = await Student.findOne({email})
} catch (error) {
    console.log(error);
}

if(!existingStudent){
    return res.status(404).json({message:"no student with this email"})
}
const isCorrectPassword = bcrypt.compareSync(password,existingStudent.password);
if(!isCorrectPassword){
    return res.status(400).json({message:"incorrect credentials"});
}
const userId = existingStudent._id

req.session.userId = userId;
const token = jwt.sign({id:existingStudent._id},"SECRET",{expiresIn:"1d"})
return res.status(200).json({message:"login successfull",id:existingStudent._id,token})



}

//see list of courses 
export const listOfCourses = async(req,res,next) =>{
const id = req.params.id;
let courses
try {
    courses = await Course.find({students:id});
   if(!courses || courses.length == 0){
    return res.status(400).json({message:"no course found"});

   }
    
  
   return res.status(200).json({courses});
} catch (error) {
    console.log(error)
}
}



//register for course 
export const registerForCourse = async(req,res,next) =>{
    //cosnt {} = req.body;
    let course  = req.body.coursename;
   var foundCourse;
    const tempId = req.body.id;
   
  
    try {
        foundCourse = await Course.find({coursename:{$in:course}});
        if(!foundCourse){
            return res.status(404).json({message:"course not found "});
        };
        
       const  studentId =  req.session.userId;       
    
       const student = await Student.findById(tempId);
       
       student
       if(!student || student.length > 0){
        return res.status(404).json({message:"no student found"});
       }
      
       const studentCourse = await StudentCourse({student:student._id})
     const savedStudentCourse =   await studentCourse.save();

      student.courses =  student.courses.concat(foundCourse.map(course =>course._id));
      foundCourse.forEach(course => course.students.push(student._id));
   
       await Promise.all([student.save(), ...foundCourse.map(course => course.save())]);
       
      
       if(!course && !student){
        return res.status(400).json({message: "problem occurd while saving "})
       }

       return res.status(200).json({student,course,savedStudentCourse})
    } catch (error) {
        console.log(error)
    }
    console.log(foundCourse)
}

//view schedule 
export const viewSchedule = async(req,res,next) =>{
 
    let courses;
    let instructor;
    let time;
    let scheduleDetails = [];
    try {
        courses = await Course.find().populate("schedule"); 
        instructor = await Instructor.find();
       

        courses.forEach((course,index) =>{

            if(course.length > 0){

                const schedule = course.schedule[index];
                console.log(index);
                const scheduleInfo = {
                    schedule:schedule.time,
                    coursename:course.coursename,
                    instructorName:instructor[index].name,
                    
                }
              console.log(scheduleInfo)
                scheduleDetails.push(scheduleInfo);
            }
        })
    } catch (error) {
        console.log(error);
    }

    if(!courses && !instructor){
        return res.status(400).json({message: "something went wrong while fetching"});
    }

    return res.status(200).json({
       scheduleDetails
    })
}

export const viewProfile = async(req,res,next) =>{
    const id = req.params.id;

    let student;
    if(!id){
        return res.status(500).json({message:"provide and id "});
    }
    try {
         student = await Student.findById(id);
    } catch (error) {
        console.log(error)
    }
    if(!student){
        return res.status(404).json({message:"student with this id cannot be found"});
    }

    return res.status(200).json({student})
}

export const updateProfile = async(req,res,next) =>{
    const {name,password,email} = req.body;
    const {id} = req.params;
    if(!name || !password || !email){
        return res.status(400).json({message:"provide full information"});
    }

    try {
    const student = await Student.findByIdAndUpdate(id,{
        name:name,
        password:password,
        email:email
    })    
       const savedStudent = await student.save();
    if(!savedStudent){
     return res.status(500).json({message:"error while saving"});
    }

    return res.status(200).json(savedStudent)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}