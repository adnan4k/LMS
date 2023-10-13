import { Course } from "../models/courseModel.js";
import { Instructor } from "../models/instructorModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//signup 
export const signup = async(req,res,next) =>{

    const {name,email,password}  = req.body;

    if (!name || !password || !email) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
    try {
        const instructor= new Instructor({
    
            name:name,
            email:email,
            password:hash,
        })
        const savedInstructor = await instructor.save();
      if (!savedInstructor){
       return res.status(500).json({message: "cannot create there is some error"})
      }

     return res.status(201).json(savedInstructor);
    } catch (error) {
        console.log(error)
    }
}


export const login = async(req,res,next) =>{
  const {email,password} = req.body;
  let existingTeacher;
  
  if(!email && !password){
  return res.status(400).json({message:"enter credentials"})
  }
   
  try {
       existingTeacher = await Instructor.findOne({email})
  } catch (error) {
      console.log(error);
  }
  
  if(!existingTeacher){
      return res.status(404).json({message:"no student with this email"})
  }
  const isCorrectPassword = bcrypt.compareSync(password,existingTeacher.password);
  if(!isCorrectPassword){
      return res.status(400).json({message:"incorrect credentials"});
  }
  
  const token = jwt.sign({id:existingTeacher._id},"SECRET",{expiresIn:"1d"})
  return res.status(200).json({message:"login successfull",id:existingTeacher._id,token})
  
  
  
  }
  
export const updateProfile = async(req,res,next) =>{
    
    const {name,email,password}  = req.body;

    if (!password || !email || !name) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      try {
        const info  = await Instructor.findOneAndUpdate({
       name:name,
       email:email,
       password:password
     });
       
       if(!info){
        return res.status(400).json({message:"error while updating"})
       }
           
     return res.status(200).json({info})

      } catch (error) {
        console.log(error)
      }
}

//search courses instructor teaches
export const Mycourses = async(req,res,next) =>{
  const id = req.params.id;
  if(!id){
      return res.status(400).json({message:"enter required information"})
  }

  try {
      const courses = await Course.find({instructors:id});
      if(!courses || courses.length == 0){
          return res.status(404).json({message:"no course found"});
      }
      return res.status(200).json({courses})
  } catch (error) {
      console.log(error)
  }
}

//get schedules 
export const  getSchedules = async(req,res,next) =>{

  const  id = req.params.id;
  let instructor;
console.log(id)
  try {
     instructor = await Instructor.findById(id).populate("schedule");
    
  } catch (error) {
    console.log(error);
  }
  if(!instructor){
    return res.status(400).json({message:"can't find schedule"})
  }

  return res.status(200).json(instructor)
}

//all instructor
export const allTeacher = async(req,res) =>{
  let teachers;
  try {
      teachers = await Instructor.find()
  } catch (error) {
      return res.status(500).json({message:"server error"})
  }
  if(!teachers){
      return res.status(404).json({message:"no course"})
  }
  return res.status(200).json(teachers);
}

export const instructorProfile = async(req,res,next) =>{
  const id = req.params.id;
  let teacher;

  try {
     teacher = await Instructor.findById(id);

  } catch (error) {
    return console.log(error)
  }
  if(!teacher){
    return res.status(404).json({message:"cannot find instructor"})
  }

  return res.status(200).json(teacher)
}